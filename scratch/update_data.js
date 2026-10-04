const fs = require('fs');
const path = 'd:\\PROJECT\\jums\\server.js';
let content = fs.readFileSync(path, 'utf8');

const startMatch = content.indexOf('const semesterData = {');
const endMatch = content.indexOf('};\n\nfunction solveGrades');

if (startMatch === -1 || endMatch === -1) {
    console.error('Could not find bounds');
    process.exit(1);
}

const before = content.substring(0, startMatch);
const after = content.substring(endMatch + 2); // after '};'

const newData = {
    "student_odd_2023": {
        "yearText": "First Year",
        "semText": "First Semester",
        "semName": "Odd",
        "sessionYear": "2022-2023",
        "examYear": "2023",
        "issueYear": "2023",
        "tableSemText": "1st Semester (Odd 2022-23)",
        "reviewAction": "Review",
        "examRoll": "CHE231099",
        "hasGradeCard": true,
        "sgpa": "7.13",
        "remarks": "P",
        "evsStatus": "Due",
        "issueDate": "01-08-2023",
        "heldIn": "December 2022",
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
            { "name": "ENGINEERING MECHANICS", "date": "02/03/2023", "time": "11:00 - 2:00 PM" },
            { "name": "PHYSICS", "date": "20/03/2023", "time": "11:00 - 2:00 PM" },
            { "name": "MATHEMATICS I", "date": "09/03/2023", "time": "11:00 - 2:00 PM" },
            { "name": "HUMANITIES &SOCIOLOGY", "date": "15/03/2023", "time": "11:00 - 2:00 PM" },
            { "name": "CHEMISTRY", "date": "13/03/2023", "time": "11:00 - 2:00 PM" }
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
        "examRoll": "CHE232058",
        "hasGradeCard": true,
        "sgpa": "7.52",
        "remarks": "P",
        "evsStatus": "Passed",
        "issueDate": "20-09-2023",
        "heldIn": "June 2023",
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
            { "name": "BASIC ELECTRONICS", "date": "26/06/2023", "time": "02:30 - 5:30 PM" },
            { "name": "MATHEMATICS II", "date": "10/07/2023", "time": "02:30 - 5:30 PM" },
            { "name": "BASIC ELECTRICAL ENGINEERING", "date": "03/07/2023", "time": "02:30 - 5:30 PM" },
            { "name": "COMPUTER PROGRAMMING & NUMERICAL METHODS", "date": "14/07/2023", "time": "02:30 - 5:30 PM" },
            { "name": "COMPUTER PROGRAMMING & NUMERICAL METHODS (PRACTICAL)", "date": "", "time": "" },
            { "name": "ELECTRICAL & ELECTRONICS LABORATORY (PRACTICAL)", "date": "", "time": "" },
            { "name": "ENGINEERING DRAWING (PRACTICAL)", "date": "", "time": "" }
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
        "examRoll": "CHE243031",
        "hasGradeCard": true,
        "sgpa": "7.88",
        "remarks": "P",
        "evsStatus": "Passed",
        "issueDate": "15-02-2024",
        "heldIn": "December 2023",
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
            { "name": "STRENGTH OF MATERIALS", "date": "16/12/2023", "time": "02:30 - 5:30 PM" },
            { "name": "MECHANICS OF FLUID", "date": "05/12/2023", "time": "02:30 - 5:30 PM" },
            { "name": "MATHEMATICS-III", "date": "11/12/2023", "time": "02:30 - 5:30 PM" },
            { "name": "CHEMICAL PROCESS PRINCIPLES", "date": "19/12/2023", "time": "02:30 - 5:30 PM" },
            { "name": "PHYSICAL CHEMISTRY", "date": "13/12/2023", "time": "02:30 - 5:30 PM" },
            { "name": "ENGINEERING THERMODYNAMICS", "date": "08/12/2023", "time": "02:30 - 5:30 PM" }
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
        "examRoll": "CHE244047",
        "hasGradeCard": true,
        "sgpa": "8.12",
        "remarks": "P",
        "evsStatus": "Passed",
        "issueDate": "22-08-2024",
        "heldIn": "June 2024",
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
            { "name": "MECHANICAL OPERATIONS", "date": "15/05/2024", "time": "02:30 - 5:30 PM" },
            { "name": "CHEMICAL ENGINEERING THERMODYNAMICS", "date": "27/05/2024", "time": "02:30 - 5:30 PM" },
            { "name": "NUMERICAL ANALYSIS FOR CHEMICAL ENGINEERS", "date": "29/05/2024", "time": "02:30 - 5:30 PM" },
            { "name": "MACHINE DESIGN", "date": "22/05/2024", "time": "02:30 - 5:30 PM" },
            { "name": "INTRODUCTION TO TRANSPORT PHENOMENA", "date": "11/05/2024", "time": "02:30 - 5:30 PM" },
            { "name": "MATERIAL SCIENCE &ENGINEERING", "date": "18/05/2024", "time": "02:30 - 5:30 PM" }
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
        "examRoll": "CHE255025",
        "hasGradeCard": true,
        "sgpa": "8.45",
        "remarks": "P",
        "evsStatus": "Passed",
        "issueDate": "10-02-2025",
        "heldIn": "December 2024",
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
            { "name": "CHEMICAL REACTION ENGINEERING-I", "date": "17/12/2024", "time": "11:00 - 2:00 PM" },
            { "name": "CHEMICAL TECHNOLOGY-I", "date": "07/12/2024", "time": "11:00 - 2:00 PM" },
            { "name": "SEPARATION PROCESSES - I", "date": "03/12/2024", "time": "11:00 - 2:00 PM" },
            { "name": "PROCESS HEAT TRANSFER", "date": "14/12/2024", "time": "11:00 - 2:00 PM" },
            { "name": "DATABASE MANAGEMENT SYSTEMS BASICS", "date": "11/12/2024", "time": "11:00 - 2:00 PM" }
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
        "sgpa": "8.65",
        "remarks": "P",
        "evsStatus": "Passed",
        "issueDate": "18-08-2025",
        "heldIn": "June 2025",
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
            { "name": "CHEMICAL TECHNOLOGY- II (Che/PC/B/T/324)", "date": "17/05/2025", "time": "11:00 - 2:00 PM" },
            { "name": "PROCESS DYNAMICS &CONTROL (Che/PC/B/T/322)", "date": "22/05/2025", "time": "11:00 - 2:00 PM" },
            { "name": "MATHEMATICAL MODELLING IN CHEMICAL ENGG. (Che/PC/B/T/325)", "date": "20/05/2025", "time": "11:00 - 2:00 PM" },
            { "name": "SEPARATION PROCESSES- II (Che/PC/B/T/323)", "date": "05/05/2025", "time": "11:00 - 2:00 PM" },
            { "name": "PRINCIPLES OF MEASUREMENTS & INSTRUMENTATION (Che/PC/B/Elec/T/321)", "date": "07/05/2025", "time": "11:00 - 2:00 PM" },
            { "name": "CHEMICAL REACTION ENGINEERING- II (Che/PC/B/T/326)", "date": "13/05/2025", "time": "11:00 - 2:00 PM" }
        ]
    },
    "student_odd_2026": {
        "yearText": "Fourth Year",
        "semText": "First Semester",
        "semName": "Odd",
        "sessionYear": "2025-2026",
        "examYear": "2026",
        "issueYear": "Pending",
        "tableSemText": "7th Semester (Odd 2025-26)",
        "reviewAction": "Review",
        "examRoll": "CHE00267086",
        "hasGradeCard": false,
        "sgpa": "Pending",
        "remarks": "Pending",
        "evsStatus": "Passed",
        "issueDate": "Pending",
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
            { "name": "INTERFACIAL SCIENCE AND ENGINEERING (Che/PE/B/T/414A)", "date": "16/12/2025", "time": "11:00 - 2:00 PM" }
        ]
    },
    "student_even_2026": {
        "isFinalSem": true,
        "yearText": "Fourth Year",
        "semText": "Second Semester",
        "semName": "Even",
        "sessionYear": "2025-2026",
        "examYear": "2026",
        "issueYear": "Pending",
        "degreeCourseText": "4 Year 8 Semester Degree Course",
        "tableSemText": "8th Semester (Even 2025-26)",
        "reviewAction": "Review",
        "examRoll": "CHE00268012",
        "hasGradeCard": false,
        "sgpa": "Pending",
        "remarks": "Pending",
        "evsStatus": "Passed",
        "issueDate": "Pending",
        "heldIn": "April-May, 2026",
        "submissionTime": "29-Apr-2026 16:50:42",
        "mobileNoLabel": "Mobile No:",
        "emailIdLabel": "Email Id :",
        "ipLabel": "SYSTEM IPADDRESS:",
        "ipValue": "152.57.138.220",
        "printDate": "Thu May 14 18:26:00 IST 2026",
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
            { "name": "INDUSTRIAL MANAGEMENT (Che/HS/B/Mech/T/423)", "date": "15/05/2026", "time": "11:00 - 2:00 PM" },
            { "name": "BIOENGINEERING & BIOPROCESS ENGINEERING (Che/PE/B/T/424D)", "date": "29/05/2026", "time": "11:00 - 2:00 PM" }
        ]
    }
};

const finalContent = before + 'const semesterData = ' + JSON.stringify(newData, null, 4) + ';\n\n' + after;
fs.writeFileSync(path, finalContent, 'utf8');
console.log('Update complete.');
