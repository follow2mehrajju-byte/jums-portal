/**
 * FINAL comprehensive fix — uses real transcript data for all 7 completed semesters.
 * Patches solveGrades, renderGradeCard, and replaces semesterData entirely.
 */

const fs = require('fs');
const path = require('path');
const serverPath = path.join(__dirname, '..', 'server.js');

let content = fs.readFileSync(serverPath, 'utf8');

// ----------------------------------------------------------------
// 1. Patch solveGrades to never crash on null bestCombination
// ----------------------------------------------------------------
// This handles any future subjects added without credits.
const SOLVE_SAFE = `    let combIndex = 0;
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
    return finalCombination;`;

const SOLVE_UNSAFE = `    let combIndex = 0;
    const finalCombination = [];
    for (let i = 0; i < credits.length; i++) {
        if (credits[i] === 0) {
            finalCombination.push('A'); // Default grade for non-credit
        } else {
            finalCombination.push(bestCombination[combIndex++]);
        }
    }
    return finalCombination;`;

if (content.includes(SOLVE_UNSAFE)) {
    content = content.replace(SOLVE_UNSAFE, SOLVE_SAFE);
    console.log('✅ Patched solveGrades null guard');
} else if (content.includes(SOLVE_SAFE)) {
    console.log('✅ solveGrades null guard already applied');
} else {
    console.warn('⚠️  solveGrades pattern not found - manual check needed');
}

// ----------------------------------------------------------------
// 2. Patch renderGradeCard to default credits to 4 when undefined
// ----------------------------------------------------------------
const RENDER_UNSAFE = `            const credits = semInfo.subjects.map(s => s.credit);
            const solved = solveGrades(credits, parseFloat(semInfo.sgpa));
            subjects = semInfo.subjects.map((s, idx) => ({
                ...s,
                grade: solved[idx]
            }));`;

const RENDER_SAFE = `            // Default credit to 4 if not specified (safety net)
            const credits = semInfo.subjects.map(s => (typeof s.credit === 'number' ? s.credit : 4));
            const solved = solveGrades(credits, parseFloat(semInfo.sgpa));
            subjects = semInfo.subjects.map((s, idx) => ({
                ...s,
                credit: s.credit !== undefined ? s.credit : 4,
                grade: solved[idx]
            }));`;

if (content.includes(RENDER_UNSAFE)) {
    content = content.replace(RENDER_UNSAFE, RENDER_SAFE);
    console.log('✅ Patched renderGradeCard credit defaults');
} else if (content.includes(RENDER_SAFE)) {
    console.log('✅ renderGradeCard credit defaults already applied');
} else {
    console.warn('⚠️  renderGradeCard pattern not found - manual check needed');
}

// ----------------------------------------------------------------
// 3. Replace semesterData with REAL transcript data
// ----------------------------------------------------------------
const startMarker = 'const semesterData = {';
// Find the closing marker robustly
let startIdx = content.indexOf(startMarker);
if (startIdx === -1) {
    console.error('❌ Could not find semesterData start. Aborting.');
    process.exit(1);
}

// Find the end: look for '};\n\n' followed by 'function solveGrades'
let endIdx = content.indexOf('};\n\n\n\nfunction solveGrades', startIdx);
if (endIdx === -1) {
    endIdx = content.indexOf('};\n\nfunction solveGrades', startIdx);
    if (endIdx === -1) {
        endIdx = content.indexOf('\nfunction solveGrades', startIdx);
        if (endIdx === -1) {
            console.error('❌ Could not find semesterData end. Aborting.');
            process.exit(1);
        }
        // endIdx points to '\nfunction...' — we need to walk back to find '};\n'
        const preEnd = content.lastIndexOf('};', endIdx);
        const before2 = content.substring(0, preEnd + 2);
        const after2 = content.substring(endIdx);
        writeData(before2, after2);
        return;
    }
}

const before = content.substring(0, startIdx);
const after = content.substring(endIdx + 2); // skip '};\n'

writeData(before, after);

function writeData(before, after) {
    // ----------------------------------------------------------------
    // REAL TRANSCRIPT DATA — Deepshikha Bhunia, B.E. Chemical Engineering
    // ----------------------------------------------------------------
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
                { "code": "BS/MTH/T111", "name": "Mathematics I",                                    "credit": 4,   "date": "09/03/2023", "time": "11:00 - 2:00 PM", "grade": "D" },
                { "code": "BS/CH/T103",  "name": "Chemistry",                                        "credit": 4,   "date": "13/03/2023", "time": "11:00 - 2:00 PM", "grade": "C" },
                { "code": "BS/PH/T102",  "name": "Physics",                                          "credit": 4,   "date": "20/03/2023", "time": "11:00 - 2:00 PM", "grade": "C" },
                { "code": "HU/SOC/T101", "name": "Humanities &Sociology",                           "credit": 3,   "date": "15/03/2023", "time": "11:00 - 2:00 PM", "grade": "S" },
                { "code": "BS/EME/T101", "name": "Engineering Mechanics",                            "credit": 4,   "date": "02/03/2023", "time": "11:00 - 2:00 PM", "grade": "D" },
                { "code": "WS/T101",     "name": "Workshop",                                         "credit": 1.5, "date": "",           "time": "",                 "grade": "B" },
                { "code": "HU/ENG/T101", "name": "Technical Communicative English &Soft Skill",    "credit": 0,   "date": "",           "time": "",                 "grade": "D" }
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
            "sgpa": "7.32",
            "remarks": "P",
            "evsStatus": "Due",
            "issueDate": "18-12-2023",
            "heldIn": "April-May 2023",
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
                { "code": "BS/MTH/T212", "name": "Mathematics II",                                    "credit": 4,   "date": "10/07/2023", "time": "02:30 - 5:30 PM", "grade": "C" },
                { "code": "ES/CS/T201",  "name": "Computer Programming &Numerical Methods",          "credit": 5.5, "date": "14/07/2023", "time": "02:30 - 5:30 PM", "grade": "B" },
                { "code": "ES/EC/T201",  "name": "Basics Electronics",                               "credit": 4,   "date": "26/06/2023", "time": "02:30 - 5:30 PM", "grade": "B" },
                { "code": "ES/EE/T201",  "name": "Basic Electrical Engineering",                     "credit": 4,   "date": "03/07/2023", "time": "02:30 - 5:30 PM", "grade": "E" },
                { "code": "ES/EE/P201",  "name": "Electrical &Electronics Laboratory",              "credit": 1.5, "date": "",           "time": "",                 "grade": "A" },
                { "code": "ES/ME/P201",  "name": "Engineering Drawing",                              "credit": 2,   "date": "",           "time": "",                 "grade": "B" }
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
            "sgpa": "7.56",
            "remarks": "P",
            "evsStatus": "Due",
            "issueDate": "15-08-2024",
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
                { "code": "BS/MTH/T313",    "name": "Mathematics III",                      "credit": 3,   "date": "11/12/2023", "time": "02:30 - 5:30 PM", "grade": "B" },
                { "code": "Che/PC/B/T/315", "name": "Engineering Thermodynamics",           "credit": 3,   "date": "08/12/2023", "time": "02:30 - 5:30 PM", "grade": "B" },
                { "code": "Che/PC/B/T/312", "name": "Mechanics of Fluid",                   "credit": 3,   "date": "05/12/2023", "time": "02:30 - 5:30 PM", "grade": "D" },
                { "code": "Che/PC/B/T/314", "name": "Physical Chemistry",                   "credit": 3,   "date": "13/12/2023", "time": "02:30 - 5:30 PM", "grade": "B" },
                { "code": "Che/PC/B/T/311", "name": "Strength of Material",                 "credit": 3,   "date": "16/12/2023", "time": "02:30 - 5:30 PM", "grade": "A" },
                { "code": "Che/PC/B/T/313", "name": "Chemical Process Principles",          "credit": 3,   "date": "19/12/2023", "time": "02:30 - 5:30 PM", "grade": "B" },
                { "code": "Che/PC/B/P/314", "name": "Physical Chemistry Laboratory",        "credit": 2,   "date": "",           "time": "",                 "grade": "C" },
                { "code": "WS/P/311",       "name": "Workshop Practice - XII",              "credit": 2,   "date": "",           "time": "",                 "grade": "D" },
                { "code": "ES/ME/P/311",    "name": "Computer Aided Drafting",              "credit": 1.5, "date": "",           "time": "",                 "grade": "C" }
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
            "sgpa": "7.44",
            "remarks": "P",
            "evsStatus": "Passed",
            "issueDate": "25-08-2024",
            "heldIn": "April-May 2024",
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
                { "code": "Che/PC/B/T/423", "name": "Numerical Analysis for Chemical Engineers",    "credit": 3,   "date": "29/05/2024", "time": "02:30 - 5:30 PM", "grade": "A" },
                { "code": "Che/PC/B/T/426", "name": "Material Science &Engineering",               "credit": 3,   "date": "18/05/2024", "time": "02:30 - 5:30 PM", "grade": "B" },
                { "code": "Che/PC/B/T/422", "name": "Chemical Engineering Thermodynamics",          "credit": 3,   "date": "27/05/2024", "time": "02:30 - 5:30 PM", "grade": "D" },
                { "code": "Che/PC/B/T/425", "name": "Introduction to Transport Phenomena",          "credit": 4,   "date": "11/05/2024", "time": "02:30 - 5:30 PM", "grade": "C" },
                { "code": "Che/PC/B/T/421", "name": "Mechanical Operation",                         "credit": 3,   "date": "15/05/2024", "time": "02:30 - 5:30 PM", "grade": "B" },
                { "code": "Che/PC/B/T/424", "name": "Machine Design",                               "credit": 3,   "date": "22/05/2024", "time": "02:30 - 5:30 PM", "grade": "E" },
                { "code": "ES/ME/P/421",    "name": "Machine Drawing (Computer Terminal Mode)",     "credit": 2,   "date": "",           "time": "",                 "grade": "A" },
                { "code": "ES/EE/P/421",    "name": "Electrical Engineering Laboratory",            "credit": 1.5, "date": "",           "time": "",                 "grade": "A" }
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
            "sgpa": "7.89",
            "remarks": "P",
            "evsStatus": "Passed",
            "issueDate": "19-03-2025",
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
                { "code": "Che/PC/B/T/513", "name": "Separation Process - I",                                               "credit": 3,   "date": "03/12/2024", "time": "11:00 - 2:00 PM", "grade": "C" },
                { "code": "Che/PC/B/T/511", "name": "Chemical Reaction Engineering - I",                                    "credit": 4,   "date": "17/12/2024", "time": "11:00 - 2:00 PM", "grade": "S" },
                { "code": "Che/PC/B/T/512", "name": "Chemical Technology - I",                                              "credit": 3,   "date": "07/12/2024", "time": "11:00 - 2:00 PM", "grade": "D" },
                { "code": "Che/PC/B/T/514", "name": "Process Heat Transfer",                                                "credit": 3,   "date": "14/12/2024", "time": "11:00 - 2:00 PM", "grade": "C" },
                { "code": "Che/BS/B/T/515", "name": "Database Management System Basics",                                   "credit": 3,   "date": "11/12/2024", "time": "11:00 - 2:00 PM", "grade": "S" },
                { "code": "Che/PC/B/P/511", "name": "Momentum Transfer &Mechanical Operation Laboratory",                 "credit": 1.5, "date": "",           "time": "",                 "grade": "B" },
                { "code": "Che/PC/B/P/512", "name": "Computer Application in Chemical Engineering Laboratory",             "credit": 2,   "date": "",           "time": "",                 "grade": "D" }
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
            "sgpa": "7.79",
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
                { "code": "Che/PC/B/Elec/T/321", "name": "Principles of Measurements &Instrumentation (Che/PC/B/Elec/T/321)", "credit": 3,   "date": "07/05/2025", "time": "11:00 - 2:00 PM", "grade": "C" },
                { "code": "Che/PC/B/T/322",       "name": "Process Dynamics &Control (Che/PC/B/T/322)",                        "credit": 3,   "date": "22/05/2025", "time": "11:00 - 2:00 PM", "grade": "B" },
                { "code": "Che/PC/B/T/323",       "name": "Separation Process - II (Che/PC/B/T/323)",                          "credit": 3,   "date": "05/05/2025", "time": "11:00 - 2:00 PM", "grade": "B" },
                { "code": "Che/PC/B/T/324",       "name": "Chemical Technology - II (Che/PC/B/T/324)",                         "credit": 3,   "date": "17/05/2025", "time": "11:00 - 2:00 PM", "grade": "B" },
                { "code": "Che/PC/B/T/325",       "name": "Mathematical Modelling in Chemical Engg. (Che/PC/B/T/325)",         "credit": 3,   "date": "20/05/2025", "time": "11:00 - 2:00 PM", "grade": "S" },
                { "code": "Che/PC/B/T/326",       "name": "Chemical Reaction Engineering - II (Che/PC/B/T/326)",               "credit": 3,   "date": "13/05/2025", "time": "11:00 - 2:00 PM", "grade": "B" },
                { "code": "Che/PC/B/P/321",       "name": "Reaction Engineering &Thermodynamics Laboratory",                   "credit": 2,   "date": "",           "time": "",                 "grade": "D" },
                { "code": "Che/PC/B/P/322",       "name": "Energy Engineering Laboratory",                                     "credit": 1.5, "date": "",           "time": "",                 "grade": "B" },
                { "code": "Che/PC/B/P/323",       "name": "Chemical Engineering Project - I",                                  "credit": 2,   "date": "",           "time": "",                 "grade": "A" }
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
            "sgpa": "8.43",
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
                { "code": "Che/PE/B/T/414A", "name": "Interfacial Science and Engineering (Che/PE/B/T/414A)", "credit": 3,   "date": "16/12/2025", "time": "11:00 - 2:00 PM", "grade": "A" },
                { "code": "Che/PC/B/P/411",  "name": "Chemical Engineering Project - II",                     "credit": 2,   "date": "",           "time": "",                 "grade": "A" },
                { "code": "Che/PC/B/P/412",  "name": "Process Equipment Design &Drawing",                    "credit": 2,   "date": "",           "time": "",                 "grade": "A" },
                { "code": "Che/PC/B/P/413",  "name": "Seminar - I",                                          "credit": 1.5, "date": "",           "time": "",                 "grade": "B" },
                { "code": "Che/PC/B/P/414",  "name": "Process Instrumentation &Control Laboratory",         "credit": 1.5, "date": "",           "time": "",                 "grade": "S" },
                { "code": "Che/PC/B/P/415",  "name": "Chemical Process Simulation Laboratory",              "credit": 1.5, "date": "",           "time": "",                 "grade": "B" }
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
                { "code": "Che/HS/B/Mech/T/423", "name": "INDUSTRIAL MANAGEMENT (Che/HS/B/Mech/T/423)",                 "credit": 4, "date": "15/05/2026", "time": "11:00 - 2:00 PM" },
                { "code": "Che/PE/B/T/424D",      "name": "BIOENGINEERING & BIOPROCESS ENGINEERING (Che/PE/B/T/424D)", "credit": 4, "date": "29/05/2026", "time": "11:00 - 2:00 PM" }
            ]
        }
    };

    // ---- Validate all grade-card semesters ----
    const GP = { 'S': 10, 'A': 9, 'B': 8, 'C': 7, 'D': 6, 'E': 5 };
    console.log('\n── SGPA Validation ──');
    for (const [key, sem] of Object.entries(semesterData)) {
        if (!sem.hasGradeCard) continue;
        const credSubs = sem.subjects.filter(s => s.credit > 0 && s.grade && GP[s.grade] !== undefined);
        const totalCred = credSubs.reduce((a, s) => a + s.credit, 0);
        const totalPts  = credSubs.reduce((a, s) => a + s.credit * GP[s.grade], 0);
        const computed  = totalCred > 0 ? (totalPts / totalCred).toFixed(4) : 'N/A';
        const target    = parseFloat(sem.sgpa);
        const diff      = Math.abs(parseFloat(computed) - target);
        const status    = diff <= 0.05 ? '✅' : (diff <= 0.15 ? '⚠️ ' : '❌');
        console.log(`${status} ${key}: computed=${computed}, target=${sem.sgpa}, diff=${diff.toFixed(4)}`);
    }

    const newContent = before + 'const semesterData = ' + JSON.stringify(semesterData, null, 4) + ';\n\n\n\n' + after;
    fs.writeFileSync(serverPath, newContent, 'utf8');
    console.log('\n✅ server.js updated with real transcript data.\n');
}
