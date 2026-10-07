const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

// Set EJS as the template engine for .jsp files
app.engine('jsp', require('ejs').renderFile);
app.set('view engine', 'jsp');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('jums_secret_cookie_key'));
app.use(express.static(path.join(__dirname, 'public')));

// Helper: Read users from JSON
function readUsers() {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'users.json'), 'utf8');
        return JSON.parse(data);
    } catch (e) {
        return {};
    }
}

// Helper: Write users to JSON
function writeUsers(users) {
    fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 2), 'utf8');
}

// Helper: Format Date matching JUMS Jsp style (e.g. Tue 16 Jun 2026 02:16:46 PM)
function getFormattedDate() {
    const date = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const dayName = days[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0');
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();
    
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedHours = String(hours).padStart(2, '0');
    
    return `${dayName} ${day} ${monthName} ${year} ${formattedHours}:${minutes}:${seconds} ${ampm}`;
}

// Routes

// 1. Home / Root redirects
app.get('/', (req, res) => {
    res.redirect('/jums_exam/signout.do');
});

app.get('/jums_exam/', (req, res) => {
    res.redirect('/jums_exam/signout.do');
});

// 2. Main Login Pages
const handleMainPage = (req, res, errorMsg = null, successMsg = null) => {
    res.render('index.jsp', {
        currentTime: getFormattedDate(),
        error: errorMsg,
        success: successMsg
    });
};

app.get('/jums_exam/signout.do', (req, res) => {
    // Clear user session cookie
    res.clearCookie('user_roll');
    const signedOut = req.query.logged_out === 'true';
    const successMsg = signedOut ? "Logged out successfully" : null;
    handleMainPage(req, res, null, successMsg);
});

app.get('/jums_exam/index.jsp', (req, res) => {
    handleMainPage(req, res);
});

// 3. Login POST handler
app.post('/jums_exam/checklogindetails.do', (req, res) => {
    const { uname, pass } = req.body;
    const users = readUsers();
    
    if (uname && pass && users[uname] && users[uname].password === pass) {
        // Set cookie and redirect to dashboard home.jsp
        res.cookie('user_roll', uname, { maxAge: 1000 * 60 * 30 }); // 30 minutes
        res.redirect('/jums_exam/student/home.jsp');
    } else {
        // Render index directly with error message, matching standard jums checklogindetails.do output URL
        res.render('index.jsp', {
            currentTime: getFormattedDate(),
            error: "Incorrect Password",
            success: null
        });
    }
});

// 4. Register GET
app.get('/jums_exam/register.jsp', (req, res) => {
    res.render('register.jsp', { error: null });
});

// 5. Register POST check
app.post('/jums_exam/checkregistrationdetails.do', (req, res) => {
    const { uname } = req.body;
    
    if (!uname || uname.trim().length !== 12 || isNaN(uname)) {
        res.render('register.jsp', { error: "User does not exists in Database" });
        return;
    }
    
    const users = readUsers();
    if (users[uname] && users[uname].password) {
        res.render('register.jsp', { error: "User already registered! Please login." });
        return;
    }
    
    // Valid for registration, show details setup form
    res.render('register_details.jsp', { roll_no: uname });
});

// 6. Complete Registration POST
app.post('/jums_exam/completeregistration.do', (req, res) => {
    const { roll_no, password, mobile_no, name, dept, sem } = req.body;
    const users = readUsers();
    
    users[roll_no] = {
        roll_no: roll_no,
        password: password,
        mobile_no: mobile_no,
        name: name || "NEW STUDENT",
        dept: dept || "Computer Science & Engineering",
        sem: sem || "1st Semester"
    };
    
    writeUsers(users);
    
    res.render('index.jsp', {
        currentTime: getFormattedDate(),
        error: null,
        success: "Registration successful! You can now log in."
    });
});

// 7. Reset Password GET
app.get('/jums_exam/reset_password/index.jsp', (req, res) => {
    res.render('reset_password_index.jsp', { error: null });
});

// 8. Reset Password POST check
app.post('/jums_exam/restpassword.do', (req, res) => {
    const { roll_no, mobile_no } = req.body;
    const users = readUsers();
    
    if (roll_no && mobile_no && users[roll_no] && users[roll_no].mobile_no === mobile_no) {
        res.render('reset_password_new.jsp', { roll_no: roll_no });
    } else {
        // Render reset form directly with error, matching restpassword.do endpoint
        res.render('reset_password_index.jsp', { error: "Incorrect Roll No. / Primary Mobile No." });
    }
});

// 9. Update Password POST
app.post('/jums_exam/updatepassword.do', (req, res) => {
    const { roll_no, new_password } = req.body;
    const users = readUsers();
    
    if (users[roll_no]) {
        users[roll_no].password = new_password;
        writeUsers(users);
        res.render('index.jsp', {
            currentTime: getFormattedDate(),
            error: null,
            success: "Password reset successfully! You can now log in."
        });
    } else {
        res.redirect('/jums_exam/reset_password/index.jsp');
    }
});

// 10. Dashboard GET
app.get('/jums_exam/student/home.jsp', (req, res) => {
    const roll_no = req.cookies.user_roll;
    if (!roll_no) {
        res.redirect('/jums_exam/signout.do');
        return;
    }
    
    const users = readUsers();
    const student = users[roll_no];
    
    if (!student) {
        res.redirect('/jums_exam/signout.do');
        return;
    }
    
    res.render('dashboard.jsp', { student: student });
});

// Additional Dashboard mapping redirects to the primary home.jsp
app.get('/jums_exam/dashboard.jsp', (req, res) => {
    res.redirect('/jums_exam/student/home.jsp');
});
app.get('/jums_exam/student/dashboard.jsp', (req, res) => {
    res.redirect('/jums_exam/student/home.jsp');
});

// 11. Semester and academic data mapping
const semesterData = {
    "student_odd_2023": {
        "yearText": "First Year",
        "semText": "First Semester",
        "semName": "Odd",
        "sessionYear": "2022-2023",
        "examYear": "2023",
        "issueYear": "2023",
        "tableSemText": "1st Semester (Odd 2022-23)",
        "reviewAction": "Review",
        "examRoll": "CHE231035",
        "serialNo": "UG ENGG / CBCS / 22 / 03178",
        "hasGradeCard": true,
        "sgpa": "6.15",
        "remarks": "P",
        "evsStatus": "Due",
        "issueDate": "01-08-2023",
        "heldIn": "DECEMBER, 2022",
        "generatedBy": "110002",
        "processedFrom": "JUMS",
        "submissionTime": "11-Feb-2023 10:29:27",
        "mobileNoLabel": "Mobile No For Examination Related Communication:",
        "emailIdLabel": "Email Id For Examination Related Communication:",
        "ipLabel": "IP:",
        "ipValue": "152.59.162.200",
        "printDate": "Fri Jun 19 12:01:38 IST 2026",
        "signatureText": "Issued by: Controller of Examinations(offg.)",
        "signatureImage": "abul.jpg",
        "asterisks": [
            "**Candidates must sign on the printed copy of the provisional admit card and sign on photograph before entering in to the examination hall. With out sign the provisional admit card will not be accepted.",
            "***GRADE CARD will be issued from counter only against the printed copy of online provisional admit card duly signed by the invigilators during examination for all the subjects he/she is appearing.",
            "Collection of Grade Card is mandatory for registering for the Next Semester Examination. Student must collect it as per date and schedule to be notified after publication of result.",
            "****Students must carry a photo identity card/University I-card to the examination hall. Invigilators are requested not to allow any student without admit card.",
            "*****This admit card is issued provisionally. Publication of result is subject to fulfillment of other eligible criteria of admission etc."
        ],
        "subjects": [
            {
                "code": "BS/MTH/T111",
                "name": "MATHEMATICS I",
                "credit": 4,
                "date": "09/03/2023",
                "time": "11:00 - 2:00 PM",
                "grade": "D"
            },
            {
                "code": "BS/CH/T103",
                "name": "CHEMISTRY",
                "credit": 4,
                "date": "13/03/2023",
                "time": "11:00 - 2:00 PM",
                "grade": "D"
            },
            {
                "code": "BS/PH/T104",
                "name": "PHYSICS",
                "credit": 4,
                "date": "20/03/2023",
                "time": "11:00 - 2:00 PM",
                "grade": "D"
            },
            {
                "code": "HSMC/HS/T101",
                "name": "HUMANITES & SOCIOLOGY",
                "credit": 3,
                "date": "15/03/2023",
                "time": "11:00 - 2:00 PM",
                "grade": "C"
            },
            {
                "code": "ES/EM/T103B",
                "name": "ENGINEERING MECHNICS",
                "credit": 4,
                "date": "02/03/2023",
                "time": "11:00 - 2:00 PM",
                "grade": "D"
            },
            {
                "code": "ES/WS/P107A",
                "name": "WORKSHOP",
                "credit": 1.5,
                "date": "",
                "time": "",
                "grade": "D"
            },
            {
                "code": "MC/TS/P101",
                "name": "TECHNICAL COMMUNICATIVE ENGLISH & SOFT SKILL",
                "credit": 0,
                "date": "",
                "time": "",
                "grade": "A"
            }
        ]
    },
    "student_even_2023": {
        "yearText": "First Year",
        "semText": "Second Semester",
        "semName": "Even",
        "sessionYear": "2022-2023",
        "examYear": "2023",
        "issueYear": "2023",
        "tableSemText": "2nd Semester (Even 2022-23)",
        "reviewAction": "Review",
        "examRoll": "CHE232041",
        "serialNo": "UG ENGG / CBCS / 23 / 06260",
        "hasGradeCard": true,
        "sgpa": "6.28",
        "remarks": "P",
        "annualRemarks": "Promoted",
        "evsStatus": "Due",
        "issueDate": "18-12-2023",
        "heldIn": "APRIL - MAY, 2023",
        "generatedBy": "110002",
        "processedFrom": "JUMS",
        "submissionTime": "16-Jun-2023 14:10:27",
        "mobileNoLabel": "Mobile No For Examination Related Communication:",
        "emailIdLabel": "Email Id For Examination Related Communication: :",
        "ipLabel": "IP:",
        "ipValue": "152.58.163.73",
        "printDate": "Fri Jun 19 11:42:10 IST 2026",
        "signatureText": "Issued by: Asst. Controller of Examinations",
        "signatureImage": "abul.jpg",
        "asterisks": [
            "**Candidates must sign on the printed copy of the provisional admit card and sign on photograph before entering in to the examination hall. With out sign the provisional admit card will not be accepted.",
            "***GRADE CARD will be issued from counter only against the printed copy of online provisional admit card for all the subjects he/she is appearing.",
            "Collection of Grade Card is mandatory for registering for the Next Semester Examination. Student must collect it as per date and schedule to be notified after publication of result.",
            "****Students must carry a photo identity card/University I-card to the examination hall. Invigilators are requested not to allow any student without admit card.",
            "*****This admit card is issued provisionally. Publication of result is subject to fulfillment of other eligible criteria of admission etc."
        ],
        "subjects": [
            {
                "code": "BS/MTH/T122",
                "name": "MATHEMATICS II",
                "credit": 4,
                "date": "10/07/2023",
                "time": "02:30 - 5:30 PM",
                "grade": "C"
            },
            {
                "code": "ES/CM/T104A",
                "name": "COMPUTER PROGRAMMING & NUMERICAL METHODS",
                "credit": 5.5,
                "date": "14/07/2023",
                "time": "02:30 - 5:30 PM",
                "grade": "D"
            },
            {
                "code": "ES/BE/T102A",
                "name": "BASICS ELECTRONICS",
                "credit": 4,
                "date": "26/06/2023",
                "time": "02:30 - 5:30 PM",
                "grade": "E"
            },
            {
                "code": "ES/BE/T101A",
                "name": "BASIC ELECTRICAL ENGINEERING",
                "credit": 4,
                "date": "03/07/2023",
                "time": "02:30 - 5:30 PM",
                "grade": "E"
            },
            {
                "code": "ES/EL/P105A",
                "name": "ELECTRICAL & ELECTRONICS LABORATORY",
                "credit": 1.5,
                "date": "",
                "time": "",
                "grade": "S"
            },
            {
                "code": "ES/ED/P106A",
                "name": "ENGINEERING DRAWING",
                "credit": 2,
                "date": "",
                "time": "",
                "grade": "B"
            }
        ]
    },
    "student_odd_2024": {
        "yearText": "Second Year",
        "semText": "First Semester",
        "semName": "Odd",
        "sessionYear": "2023-2024",
        "examYear": "2024",
        "issueYear": "2024",
        "tableSemText": "3rd Semester (Odd 2023-24)",
        "reviewAction": "Review",
        "examRoll": "CHE243002",
        "serialNo": "UG ENGG / CBCS / 23 / 09201",
        "hasGradeCard": true,
        "sgpa": "7.11",
        "remarks": "P",
        "evsStatus": "Due",
        "issueDate": "15-08-2024",
        "heldIn": "DECEMBER , 2023",
        "generatedBy": "110002",
        "processedFrom": "JUMS",
        "submissionTime": "30-Nov-2023 21:17:50",
        "mobileNoLabel": "Mobile No For Examination Related Communication:",
        "emailIdLabel": "Email Id For Examination Related Communication:",
        "ipLabel": "IP:",
        "ipValue": "152.58.163.73",
        "printDate": "Fri Jun 19 11:38:23 IST 2026",
        "signatureText": "Issued by: Controller of Examinations",
        "signatureImage": "coe_sign.jpg",
        "asterisks": [
            "**Candidates must sign on the printed copy of the provisional admit card and sign on photograph before entering in to the examination hall. With out sign the provisional admit card will not be accepted.",
            "***GRADE CARD will be issued from counter only against the printed copy of online provisional admit card duly signed by the invigilators during examination for all the subjects he/she is appearing.",
            "Collection of Grade Card is mandatory for registering for the Next Semester Examination. Student must collect it as per date and schedule to be notified after publication of result.",
            "****Students must carry a photo identity card/University I-card to the examination hall. Invigilators are requested not to allow any student without admit card.",
            "*****This admit card is issued provisionally. Publication of result is subject to fulfillment of other eligible criteria of admission etc.",
            "****** Compulsory EVS subject exam 2021-2022 is mandetory for engineering faculty students of 2nd year 1st semester excluding lateral entry students."
        ],
        "subjects": [
            {
                "code": "FTE/BS/B/MATH/T/211",
                "name": "MATHEMATICS III",
                "credit": 3,
                "date": "11/12/2023",
                "time": "02:30 - 5:30 PM",
                "grade": "B"
            },
            {
                "code": "CHE/ES/B/MECH/T/212",
                "name": "ENGINEERING THERMODYNAMICS",
                "credit": 3,
                "date": "08/12/2023",
                "time": "02:30 - 5:30 PM",
                "grade": "B"
            },
            {
                "code": "CHE/PC/B/T/213",
                "name": "MECHANICS OF FLUID",
                "credit": 3,
                "date": "05/12/2023",
                "time": "02:30 - 5:30 PM",
                "grade": "D"
            },
            {
                "code": "CHE/BS/B/CHEM/T/214",
                "name": "PHYSICAL CHEMISTRY",
                "credit": 3,
                "date": "13/12/2023",
                "time": "02:30 - 5:30 PM",
                "grade": "B"
            },
            {
                "code": "CHE/ES/B/MECH/T/215",
                "name": "STRENGTH OF MATERIAL",
                "credit": 3,
                "date": "16/12/2023",
                "time": "02:30 - 5:30 PM",
                "grade": "D"
            },
            {
                "code": "CHE/PC/B/T/216",
                "name": "CHEMICAL PROCESS PRINCIPLES",
                "credit": 3,
                "date": "19/12/2023",
                "time": "02:30 - 5:30 PM",
                "grade": "B"
            },
            {
                "code": "CHE/BS/B/CHEM/S/211",
                "name": "PHYSICAL CHEMISTRY LABORATORY",
                "credit": 2,
                "date": "",
                "time": "",
                "grade": "C"
            },
            {
                "code": "CHE/ES/B/MECH/S/212",
                "name": "WORKSHOP PRACTICE – XII",
                "credit": 2,
                "date": "",
                "time": "",
                "grade": "D"
            },
            {
                "code": "CHE/PC/B/T/216",
                "name": "COMPUTER AIDED DRAFTING",
                "credit": 1.5,
                "date": "",
                "time": "",
                "grade": "D"
            }
        ]
    },
    "student_even_2024": {
        "yearText": "Second Year",
        "semText": "Second Semester",
        "semName": "Even",
        "sessionYear": "2023-2024",
        "examYear": "2024",
        "issueYear": "2024",
        "tableSemText": "4th Semester (Even 2023-24)",
        "reviewAction": "Review",
        "examRoll": "CHE244080",
        "serialNo": "UG ENGG / CBCS / 24 / 05128",
        "hasGradeCard": true,
        "sgpa": "7.27",
        "remarks": "P",
        "annualRemarks": "Promoted",
        "evsStatus": "Passed",
        "issueDate": "25-08-2024",
        "heldIn": "APRIL - MAY , 2024",
        "generatedBy": "110002",
        "processedFrom": "JUMS",
        "submissionTime": "24-Apr-2024 14:16:02",
        "mobileNoLabel": "Mobile No For Examination Related Communication:",
        "emailIdLabel": "Email Id For Examination Related Communication: :",
        "ipLabel": "IP:",
        "ipValue": "152.58.163.73",
        "printDate": "Fri Jun 19 11:39:58 IST 2026",
        "signatureText": "Issued by: Controller of Examinations",
        "signatureImage": "coe_sign.jpg",
        "asterisks": [
            "**Candidates must sign on the printed copy of the provisional admit card and sign on photograph before entering in to the examination hall. With out sign the provisional admit card will not be accepted.",
            "***GRADE CARD will be issued from counter only against the printed copy of online provisional admit card for all the subjects he/she is appearing.",
            "Collection of Grade Card is mandatory for registering for the Next Semester Examination. Student must collect it as per date and schedule to be notified after publication of result.",
            "****Students must carry a photo identity card/University I-card to the examination hall. Invigilators are requested not to allow any student without admit card.",
            "*****This admit card is issued provisionally. Publication of result is subject to fulfillment of other eligible criteria of admission etc."
        ],
        "subjects": [
            {
                "code": "CHE/PC/B/T/221",
                "name": "NUMERICAL ANALYSIS FOR CHEMICAL ENGINEERS",
                "credit": 3,
                "date": "29/05/2024",
                "time": "02:30 - 5:30 PM",
                "grade": "D"
            },
            {
                "code": "CHE/ES/B/MET/T/222",
                "name": "MATERIAL SCIENCE & ENGINEERING",
                "credit": 3,
                "date": "18/05/2024",
                "time": "02:30 - 5:30 PM",
                "grade": "C"
            },
            {
                "code": "CHE/PC/B/T/223",
                "name": "CHEMICAL ENGINEERING THERMODYNAMICS",
                "credit": 3,
                "date": "27/05/2024",
                "time": "02:30 - 5:30 PM",
                "grade": "D"
            },
            {
                "code": "CHE/PC/B/T/224",
                "name": "INTRODUCTION TO TRANSPORT PHENOMENA",
                "credit": 4,
                "date": "11/05/2024",
                "time": "02:30 - 5:30 PM",
                "grade": "D"
            },
            {
                "code": "CHE/PC/B/T/225",
                "name": "MECHANICAL OPERATION",
                "credit": 3,
                "date": "15/05/2024",
                "time": "02:30 - 5:30 PM",
                "grade": "B"
            },
            {
                "code": "CHE/ES/B/MECH/T/226",
                "name": "MACHINE DESIGN",
                "credit": 3,
                "date": "22/05/2024",
                "time": "02:30 - 5:30 PM",
                "grade": "A"
            },
            {
                "code": "CHE/ES/B/MECH/S/221",
                "name": "MACHINE DRAWING (COMPUTER TERMINAL MODE)",
                "credit": 2,
                "date": "",
                "time": "",
                "grade": "A"
            },
            {
                "code": "CHE/ES/B/ELEC/S/222",
                "name": "ELECTRICAL ENGINEERING LABORATORY",
                "credit": 1.5,
                "date": "",
                "time": "",
                "grade": "A"
            }
        ]
    },
    "student_odd_2025": {
        "yearText": "Third Year",
        "semText": "First Semester",
        "semName": "Odd",
        "sessionYear": "2024-2025",
        "examYear": "2025",
        "issueYear": "2025",
        "tableSemText": "5th Semester (Odd 2024-25)",
        "reviewAction": "Review",
        "examRoll": "CHE255064",
        "serialNo": "UG ENGG / CBCS / 24 / 29362",
        "hasGradeCard": true,
        "sgpa": "7.84",
        "remarks": "P",
        "evsStatus": "Passed",
        "issueDate": "19-03-2025",
        "heldIn": "DECEMBER , 2024",
        "generatedBy": "110002",
        "processedFrom": "JUMS",
        "submissionTime": "24-Nov-2024 13:56:32",
        "mobileNoLabel": "Mobile No For Examination Related Communication:",
        "emailIdLabel": "Email Id For Examination Related Communication:",
        "ipLabel": "IP:",
        "ipValue": "152.58.163.73",
        "printDate": "Fri Jun 19 11:40:25 IST 2026",
        "signatureText": "Issued by: Controller of Examinations",
        "signatureImage": "coe_sign.jpg",
        "asterisks": [
            "**Candidates must sign on the printed copy of the provisional admit card and sign on photograph before entering in to the examination hall. With out sign the provisional admit card will not be accepted.",
            "***GRADE CARD will be issued from counter only against the printed copy of online provisional admit card duly signed by the invigilators during examination for all the subjects he/she is appearing.",
            "Collection of Grade Card is mandatory for registering for the Next Semester Examination. Student must collect it as per date and schedule to be notified after publication of result.",
            "****Students must carry a photo identity card/University I-card to the examination hall. Invigilators are requested not to allow any student without admit card.",
            "*****This admit card is issued provisionally. Publication of result is subject to fulfillment of other eligible criteria of admission etc.",
            "******Student must write their correct Registration No & Examination Roll No in your answer script otherwise answer script will be cancelled."
        ],
        "subjects": [
            {
                "code": "CHE/PC/B/T/311",
                "name": "SEPERATION PROCESS - I",
                "credit": 3,
                "date": "03/12/2024",
                "time": "11:00 - 2:00 PM",
                "grade": "B"
            },
            {
                "code": "CHE/PC/B/T/312",
                "name": "CHEMICAL REACTION ENGINEERING - I",
                "credit": 4,
                "date": "17/12/2024",
                "time": "11:00 - 2:00 PM",
                "grade": "A"
            },
            {
                "code": "CHE/PC/B/T/313",
                "name": "CHEMICAL TECHNOLOGY - I",
                "credit": 3,
                "date": "07/12/2024",
                "time": "11:00 - 2:00 PM",
                "grade": "A"
            },
            {
                "code": "CHE/PC/B/T/314",
                "name": "PROCESS HEAT TRANSFER",
                "credit": 3,
                "date": "14/12/2024",
                "time": "11:00 - 2:00 PM",
                "grade": "C"
            },
            {
                "code": "FET/OE/ITE/T/109",
                "name": "FOOD ADULTERATION AND LABELING",
                "credit": 3,
                "date": "11/12/2024",
                "time": "11:00 - 2:00 PM",
                "grade": "C"
            },
            {
                "code": "CHE/PC/B/S/311",
                "name": "MOMENTUM TRANSFER & MECHANICAL OPERATION LABORATORY",
                "credit": 1.5,
                "date": "",
                "time": "",
                "grade": "B"
            },
            {
                "code": "CHE/PC/B/S/312",
                "name": "COMPUTER APPLICATION IN CHEMICAL ENGINEERING LABORATORY",
                "credit": 2,
                "date": "",
                "time": "",
                "grade": "D"
            }
        ]
    },
    "student_even_2025": {
        "yearText": "Third Year",
        "semText": "Second Semester",
        "semName": "Even",
        "sessionYear": "2024-2025",
        "examYear": "2025",
        "issueYear": "2025",
        "tableSemText": "6th Semester (Even 2024-25)",
        "reviewAction": "Review",
        "examRoll": "CHE00256034",
        "hasGradeCard": true,
        "sgpa": "7.94",
        "remarks": "P",
        "evsStatus": "Passed",
        "issueDate": "21-07-2025",
        "heldIn": "April-May 2025",
        "submissionTime": "25-Apr-2025 19:34:52",
        "mobileNoLabel": "Mobile No:",
        "emailIdLabel": "Email Id :",
        "abcApaarId": "344-171-669-937",
        "ipLabel": "IP:",
        "ipValue": "152.58.163.73",
        "printDate": "Fri Jun 19 11:40:53 IST 2026",
        "signatureText": "Issued by: Controller of Examinations",
        "signatureImage": "coe_sign.jpg",
        "asterisks": [
            "**Candidates must sign on the printed copy of the provisional admit card and sign on photograph before entering in to the examination hall. With out sign the provisional admit card will not be accepted.",
            "***GRADE CARD will be issued from counter only against the printed copy of online provisional admit card for all the subjects he/she is appearing.",
            "Collection of Grade Card is mandatory for registering for the Next Semester Examination. Student must collect it as per date and schedule to be notified after publication of result.",
            "****Students must carry a photo identity card/University I-card to the examination hall. Invigilators are requested not to allow any student without admit card.",
            "*****This admit card is issued provisionally. Publication of result is subject to fulfillment of other eligible criteria of admission etc.",
            "******Student must write their correct Registration No & Examination Roll No in your answer script otherwise answer script will be cancelled."
        ],
        "subjects": [
            {
                "code": "Che/PC/B/Elec/T/321",
                "name": "Principles of Measurements &Instrumentation (Che/PC/B/Elec/T/321)",
                "credit": 3,
                "date": "07/05/2025",
                "time": "11:00 - 2:00 PM",
                "grade": "C"
            },
            {
                "code": "Che/PC/B/T/322",
                "name": "Process Dynamics &Control (Che/PC/B/T/322)",
                "credit": 3,
                "date": "22/05/2025",
                "time": "11:00 - 2:00 PM",
                "grade": "B"
            },
            {
                "code": "Che/PC/B/T/323",
                "name": "Separation Process - II (Che/PC/B/T/323)",
                "credit": 3,
                "date": "05/05/2025",
                "time": "11:00 - 2:00 PM",
                "grade": "B"
            },
            {
                "code": "Che/PC/B/T/324",
                "name": "Chemical Technology - II (Che/PC/B/T/324)",
                "credit": 3,
                "date": "17/05/2025",
                "time": "11:00 - 2:00 PM",
                "grade": "B"
            },
            {
                "code": "Che/PC/B/T/325",
                "name": "Mathematical Modelling in Chemical Engg. (Che/PC/B/T/325)",
                "credit": 3,
                "date": "20/05/2025",
                "time": "11:00 - 2:00 PM",
                "grade": "S"
            },
            {
                "code": "Che/PC/B/T/326",
                "name": "Chemical Reaction Engineering - II (Che/PC/B/T/326)",
                "credit": 3,
                "date": "13/05/2025",
                "time": "11:00 - 2:00 PM",
                "grade": "B"
            },
            {
                "code": "Che/PC/B/P/321",
                "name": "Reaction Engineering &Thermodynamics Laboratory",
                "credit": 2,
                "date": "",
                "time": "",
                "grade": "D"
            },
            {
                "code": "Che/PC/B/P/322",
                "name": "Energy Engineering Laboratory",
                "credit": 1.5,
                "date": "",
                "time": "",
                "grade": "B"
            },
            {
                "code": "Che/PC/B/P/323",
                "name": "Chemical Engineering Project - I",
                "credit": 2,
                "date": "",
                "time": "",
                "grade": "A"
            }
        ]
    },
    "student_odd_2026": {
        "yearText": "Fourth Year",
        "semText": "First Semester",
        "semName": "Odd",
        "sessionYear": "2025-2026",
        "examYear": "2026",
        "issueYear": "2026",
        "tableSemText": "7th Semester (Odd 2025-26)",
        "reviewAction": "Review",
        "examRoll": "CHE00267086",
        "hasGradeCard": true,
        "sgpa": "8.48",
        "remarks": "P",
        "evsStatus": "Passed",
        "issueDate": "16-02-2026",
        "heldIn": "December 2025",
        "submissionTime": "24-Nov-2025 14:37:42",
        "mobileNoLabel": "Mobile No:",
        "emailIdLabel": "Email Id :",
        "abcApaarId": "344-171-669-937",
        "ipLabel": "SYSTEM IPADDRESS:",
        "ipValue": "152.58.163.73",
        "printDate": "Fri Jun 19 11:41:30 IST 2026",
        "signatureText": "Issued by: Controller of Examinations",
        "signatureImage": "coe_sign.jpg",
        "asterisks": [
            "**Candidates must sign on the printed copy of the provisional admit card and sign on photograph before entering in to the examination hall. With out sign the provisional admit card will not be accepted.",
            "***GRADE CARD will be issued from counter only against the printed copy of online provisional admit card duly signed by the invigilators during examination for all the subjects he/she is appearing.",
            "Collection of Grade Card is mandatory for registering for the Next Semester Examination. Student must collect it as per date and schedule to be notified after publication of result.",
            "****Students must carry a photo identity card/University I-card to the examination hall. Invigilators are requested not to allow any student without admit card.",
            "*****This admit card is issued provisionally. Publication of result is subject to fulfillment of other eligible criteria of admission etc.",
            "******Student must write their correct Registration No (If Issued) & Examination Roll No in your answer script otherwise answer script will be cancelled."
        ],
        "subjects": [
            {
                "code": "Che/PE/B/T/414A",
                "name": "Interfacial Science and Engineering (Che/PE/B/T/414A)",
                "credit": 3,
                "date": "16/12/2025",
                "time": "11:00 - 2:00 PM",
                "grade": "A"
            },
            {
                "code": "Che/PC/B/P/411",
                "name": "Chemical Engineering Project - II",
                "credit": 2,
                "date": "",
                "time": "",
                "grade": "A"
            },
            {
                "code": "Che/PC/B/P/412",
                "name": "Process Equipment Design &Drawing",
                "credit": 2,
                "date": "",
                "time": "",
                "grade": "A"
            },
            {
                "code": "Che/PC/B/P/413",
                "name": "Seminar - I",
                "credit": 1.5,
                "date": "",
                "time": "",
                "grade": "B"
            },
            {
                "code": "Che/PC/B/P/414",
                "name": "Process Instrumentation &Control Laboratory",
                "credit": 1.5,
                "date": "",
                "time": "",
                "grade": "S"
            },
            {
                "code": "Che/PC/B/P/415",
                "name": "Chemical Process Simulation Laboratory",
                "credit": 1.5,
                "date": "",
                "time": "",
                "grade": "B"
            }
        ]
    },
    "student_even_2026": {
        "isFinalSem": true,
        "yearText": "Fourth Year",
        "semText": "Second Semester",
        "semName": "Even",
        "sessionYear": "2025-2026",
        "examYear": "2026",
        "issueYear": "2026",
        "degreeCourseText": "4 Year 8 Semester Degree Course",
        "tableSemText": "8th Semester (Even 2025-26)",
        "reviewAction": "Review",
        "examRoll": "CHE00268083",
        "serialNo": "UG ENGG / CBCS / 26 / 04674",
        "hasGradeCard": true,
        "sgpa": "8.54",
        "cgpa": "7.80",
        "weightedAvg": "72.15",
        "remarks": "FIRST CLASS",
        "evsStatus": "Passed",
        "issueDate": "13-07-2026",
        "pubDate": "29-06-2026",
        "heldIn": "APRIL-MAY , 2026",
        "generatedBy": "110002",
        "processedFrom": "JUMS",
        "submissionTime": "29-Apr-2026 16:50:42",
        "mobileNoLabel": "Mobile No:",
        "emailIdLabel": "Email Id :",
        "ipLabel": "SYSTEM IPADDRESS:",
        "ipValue": "152.57.138.220",
        "printDate": "Thu May 14 18:26:00 IST 2026",
        "signatureText": "Issued by: Controller of Examinations",
        "signatureImage": "coe_sign.jpg",
        "sgpaList": ["6.15", "6.28", "7.11", "7.27", "7.84", "7.94", "8.48", "8.54"],
        "weightageList": ["0.1", "0.1", "0.2", "0.2", "0.35", "0.35", "0.35", "0.35"],
        "asterisks": [
            "**Candidates must sign on the printed copy of the provisional admit card and sign on photograph before entering in to the examination hall. With out sign the provisional admit card will not be accepted.",
            "***GRADE CARD will be issued from counter only against the printed copy of online provisional admit card duly signed by the invigilators during examination for all the subjects he/she is appearing.",
            "Collection of Grade Card is mandatory for registering for the Next Semester Examination. Student must collect it as per date and schedule to be notified after publication of result.",
            "****Students must carry a photo identity card/University I-card to the examination hall. Invigilators are requested not to allow any student without admit card.",
            "*****This admit card is issued provisionally. Publication of result is subject to fulfillment of other eligible criteria of admission etc.",
            "******Student must write their correct Registration No & Examination Roll No in your answer script otherwise answer script will be cancelled."
        ],
        "subjects": [
            {
                "code": "CHE/HS/B/MECH/T/423",
                "name": "INDUSTRIAL MANAGEMENT",
                "credit": 3,
                "date": "15/05/2026",
                "time": "11:00 - 2:00 PM",
                "grade": "A"
            },
            {
                "code": "CHE/PE/B/T/424D",
                "name": "BIOENGINEERING & BIOPROCESS ENGINEERING",
                "credit": 3,
                "date": "29/05/2026",
                "time": "11:00 - 2:00 PM",
                "grade": "A"
            },
            {
                "code": "CHE/PC/B/S/421",
                "name": "CHEMICAL PROCESS DESIGN & DRAWING",
                "credit": 1.5,
                "date": "",
                "time": "",
                "grade": "A"
            },
            {
                "code": "CHE/PC/B/S/422",
                "name": "HEAT & MASS TRANSFER LABORATORY",
                "credit": 2,
                "date": "",
                "time": "",
                "grade": "C"
            },
            {
                "code": "CHE/PS/B/S/423",
                "name": "SEMINAR - II",
                "credit": 2,
                "date": "",
                "time": "",
                "grade": "A"
            },
            {
                "code": "CHE/PS/B/S/424",
                "name": "GENERAL VIVA-VOCE",
                "credit": 2,
                "date": "",
                "time": "",
                "grade": "B"
            }
        ]
    }
};




function solveGrades(credits, targetSGPA) {
    const grades = ['S', 'A', 'B', 'C', 'D', 'E'];
    const points = { 'S': 10, 'A': 9, 'B': 8, 'C': 7, 'D': 6, 'E': 5 };
    
    const filteredCredits = credits.filter(c => c > 0);
    const totalCredits = filteredCredits.reduce((a, b) => a + b, 0);
    
    let bestDiff = Infinity;
    let bestCombination = null;
    
    function search(index, currentCombination, currentSum) {
        if (index === filteredCredits.length) {
            const sgpa = Math.round((currentSum / totalCredits) * 100) / 100;
            const diff = Math.abs(sgpa - targetSGPA);
            if (diff < bestDiff) {
                bestDiff = diff;
                bestCombination = [...currentCombination];
            }
            return;
        }
        
        for (const g of grades) {
            currentCombination.push(g);
            search(index + 1, currentCombination, currentSum + filteredCredits[index] * points[g]);
            currentCombination.pop();
            if (bestDiff === 0) return;
        }
    }
    
    search(0, [], 0);
    
    let combIndex = 0;
    const finalCombination = [];
    // Safety: if no solution was found (e.g. all credits were 0/undefined), default to 'B'
    if (!bestCombination || bestCombination.length === 0) {
        return credits.map(() => 'B');
    }
    for (let i = 0; i < credits.length; i++) {
        if (!credits[i] || credits[i] === 0) {
            finalCombination.push('A'); // Default grade for non-credit
        } else {
            finalCombination.push(bestCombination[combIndex++] || 'B');
        }
    }
    return finalCombination;
}

function getAdmitCardFormattedDate() {
    const date = new Date();
    const parts = date.toString().split(' ');
    // parts like: [ 'Wed', 'Jun', '17', '2026', '14:45:52', 'GMT+0530', '(India', 'Standard', 'Time)' ]
    // We want: "Wed Jun 17 14:45:52 IST 2026"
    return `${parts[0]} ${parts[1]} ${parts[2]} ${parts[4]} IST ${parts[3]}`;
}

// 12. Dynamic JUMS semester index routes
app.get('/jums_exam/:sem_dir/index.jsp', (req, res) => {
    const semDir = req.params.sem_dir;
    const roll_no = req.cookies.user_roll;
    if (!roll_no) {
        res.redirect('/jums_exam/signout.do');
        return;
    }
    
    const users = readUsers();
    const student = users[roll_no];
    if (!student) {
        res.redirect('/jums_exam/signout.do');
        return;
    }
    
    const semInfo = semesterData[semDir];
    if (!semInfo) {
        res.status(404).send("Semester directory not found");
        return;
    }
    
    res.render('semester_index.jsp', {
        student: student,
        semDir: semDir,
        semInfo: semInfo
    });
});

// 13. Dynamic JUMS result / grade card routes
app.get('/jums_exam/:sem_dir/result/view_print_result_be.jsp', (req, res) => {
    renderGradeCard(req, res, false);
});

app.get('/jums_exam/:sem_dir/result/view_print_result_be_non_final.jsp', (req, res) => {
    renderGradeCard(req, res, false);
});

app.get('/jums_exam/:sem_dir/result/view_print_result_be_final.jsp', (req, res) => {
    renderGradeCard(req, res, false);
});

app.get('/jums_exam/:sem_dir/supple/result/view_print_result.jsp', (req, res) => {
    renderGradeCard(req, res, true);
});

// 13b. Course Completion Certificate route (final semester only)
app.get('/jums_exam/:sem_dir/course_completion_certificate.jsp', (req, res) => {
    const semDir = req.params.sem_dir;
    const roll_no = req.cookies.user_roll;
    if (!roll_no) { res.redirect('/jums_exam/signout.do'); return; }
    const users = readUsers();
    const student = users[roll_no];
    if (!student) { res.redirect('/jums_exam/signout.do'); return; }
    const semInfo = semesterData[semDir];
    if (!semInfo || !semInfo.isFinalSem) {
        res.status(403).send('Course Completion Certificate is only available for the final semester.');
        return;
    }

    // Build per-semester summary table from all 8 semesters
    const semDirs = Object.keys(semesterData);
    const semLabels = [
        '1st Year 1st Semester', '1st Year 2nd Semester',
        '2nd Year 1st Semester', '2nd Year 2nd Semester',
        '3rd Year 1st Semester', '3rd Year 2nd Semester',
        '4th Year 1st Semester', '4th Year 2nd Semester'
    ];

    // Running CGPA computation
    let cumCredits = 0, cumPoints = 0;
    const allSemesters = semDirs.map((dir, idx) => {
        const sd = semesterData[dir];
        const totalCredits = sd.subjects.reduce((a, s) => a + (s.credit > 0 ? s.credit : 0), 0);
        const sgpa = parseFloat(sd.sgpa) || 0;
        cumCredits += totalCredits;
        cumPoints += sgpa * totalCredits;
        const cgpa = cumCredits > 0 ? (Math.round((cumPoints / cumCredits) * 100) / 100).toFixed(2) : '-';
        return {
            label: semLabels[idx],
            sessionYear: sd.sessionYear,
            examRoll: sd.examRoll,
            totalCredits: totalCredits.toFixed(1),
            sgpa: sd.sgpa !== 'Pending' ? parseFloat(sd.sgpa).toFixed(2) : 'Pending',
            cgpa: sd.sgpa !== 'Pending' ? cgpa : 'Pending',
            result: sd.remarks === 'P' ? 'PASS' : (sd.sgpa === 'Pending' ? 'Pending' : 'FAIL')
        };
    });

    const finalCGPA = allSemesters[allSemesters.length - 1].cgpa;

    res.render('course_completion_certificate.jsp', {
        student,
        semDir,
        semInfo,
        examRoll: semInfo.examRoll,
        allSemesters,
        cgpa: finalCGPA,
        issueDate: semInfo.issueDate !== 'Pending' ? semInfo.issueDate : 'To be announced',
        generatedBy: semInfo.generatedBy || null,
        processedFrom: semInfo.processedFrom || null
    });
});

// 13c. Provisional Pass Certificate route (final semester only)
app.get(['/jums_exam/:sem_dir/provisional_certificate.jsp', '/jums_exam/:sem_dir/provisional_pass_certificate.jsp'], (req, res) => {
    const semDir = req.params.sem_dir;
    const roll_no = req.cookies.user_roll;
    if (!roll_no) { res.redirect('/jums_exam/signout.do'); return; }
    const users = readUsers();
    const student = users[roll_no];
    if (!student) { res.redirect('/jums_exam/signout.do'); return; }
    const semInfo = semesterData[semDir];
    if (!semInfo || !semInfo.isFinalSem) {
        res.status(403).send('Provisional Pass Certificate is only available for the final semester.');
        return;
    }

    let courseName = student.dept;
    if (!courseName.startsWith("B.E.") && !courseName.startsWith("B.Tech.") && !courseName.startsWith("B.Sc.") && !courseName.toLowerCase().includes("bachelor")) {
        courseName = "Bachelor of Engineering in " + courseName;
    }

    const regSession = student.registration_session ? student.registration_session.replace(/^20/, '').replace(/-20/, '-') : '22-23';

    res.render('provisional_certificate.jsp', {
        student,
        semDir,
        semInfo,
        examRoll: semInfo.examRoll,
        degreeName: courseName,
        regSession: regSession,
        examYear: semInfo.examYear || '2026',
        heldIn: semInfo.heldIn || 'APRIL - MAY , 2026',
        remarks: semInfo.remarks || 'FIRST CLASS',
        weightedAvg: semInfo.weightedAvg || '72.15',
        convocationDate: semInfo.convocationDate || '24.12.2026',
        issueDate: semInfo.provisionalDate || '15-07-2026',
        generatedBy: semInfo.generatedBy || '110002'
    });
});


function renderGradeCard(req, res, isSupple) {
    const semDir = req.params.sem_dir;
    const roll_no = req.cookies.user_roll;
    if (!roll_no) {
        res.redirect('/jums_exam/signout.do');
        return;
    }
    
    const users = readUsers();
    const student = users[roll_no];
    if (!student) {
        res.redirect('/jums_exam/signout.do');
        return;
    }
    
    const semInfo = semesterData[semDir];
    if (!semInfo) {
        res.status(404).send("Semester data not found");
        return;
    }
    
    let examRoll = req.query.exam_roll || semInfo.examRoll;
    let subjects = [];
    let sgpa = semInfo.sgpa;
    let remarks = semInfo.remarks;
    let evsStatus = semInfo.evsStatus;
    let issueDate = semInfo.issueDate;
    
    if (isSupple && semDir === 'student_odd_2023') {
        examRoll = 'CHES231008';
        sgpa = ' ';
        remarks = 'xABDG';
        evsStatus = 'Due';
        issueDate = 'December , 2023';
        // Assign X / backlog grades for supple
        const suppleGrades = ['X', 'X', 'X', 'A', 'X', 'B', 'D'];
        subjects = semInfo.subjects.map((s, idx) => ({
            ...s,
            grade: suppleGrades[idx]
        }));
    } else {
        if (!semInfo.hasGradeCard) {
            res.render('grade_card_not_available.jsp', { isSupple });
            return;
        }
        // Use explicit grades if available, else solve dynamically
        const explicitGradesExist = semInfo.subjects.every(s => s.grade);
        if (explicitGradesExist) {
            subjects = semInfo.subjects;
        } else {
            // Default credit to 4 if not specified (safety net)
            const credits = semInfo.subjects.map(s => (typeof s.credit === 'number' ? s.credit : 4));
            const solved = solveGrades(credits, parseFloat(semInfo.sgpa));
            subjects = semInfo.subjects.map((s, idx) => ({
                ...s,
                credit: s.credit !== undefined ? s.credit : 4,
                grade: solved[idx]
            }));
        }
    }
    
    res.render('grade_card.jsp', {
        student,
        semDir,
        semInfo,
        examRoll,
        subjects,
        sgpa,
        remarks,
        evsStatus,
        issueDate,
        isSupple
    });
}

// 14. Dynamic JUMS admit card routes
app.get('/jums_exam/:sem_dir/view_print_admit_card.jsp', (req, res) => {
    renderAdmitCard(req, res, false);
});

app.get('/jums_exam/:sem_dir/view_print_admit_card_supple_non_final_yr.jsp', (req, res) => {
    renderAdmitCard(req, res, true);
});

function renderAdmitCard(req, res, isSupple) {
    const semDir = req.params.sem_dir;
    const roll_no = req.cookies.user_roll;
    if (!roll_no) {
        res.redirect('/jums_exam/signout.do');
        return;
    }
    
    const users = readUsers();
    const student = users[roll_no];
    if (!student) {
        res.redirect('/jums_exam/signout.do');
        return;
    }
    
    const semInfo = semesterData[semDir];
    if (!semInfo) {
        res.status(404).send("Semester data not found");
        return;
    }
    
    let examRoll = req.query.exam_roll || semInfo.examRoll;
    if (isSupple && semDir === 'student_odd_2023') {
        examRoll = 'CHES231008';
    }
    
    const template = 'admit_card.jsp';
    const currentTime = getAdmitCardFormattedDate();
    res.render(template, {
        student,
        semDir,
        semInfo,
        examRoll,
        subjects: semInfo.subjects,
        currentTime: currentTime,
        submissionTime: semInfo.submissionTime,
        isSupple
    });
}

// 15. JUMS mock form submissions
app.post('/jums_exam/insert_student_query_issue_:sem_dir.do', (req, res) => {
    res.send("Query submitted successfully!");
});

app.post('/jums_exam/insert_student_exam_fees_details_:sem_dir.do', (req, res) => {
    res.send("Exam fees details inserted successfully!");
});

app.get('/jums_exam/review_*_be_over.do', (req, res) => {
    res.send("Review process is over.");
});

app.post('/jums_exam/supple_odd_2023_non_final_yr.do', (req, res) => {
    res.send("Supplementary process submitted successfully!");
});

// Start Server
app.listen(PORT, () => {
    console.log(`JUMS Exam Portal server is running on http://localhost:${PORT}`);
});

