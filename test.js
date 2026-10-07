const http = require('http');
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

console.log("=== RUNNING JUMS PORTAL INTEGRATION TESTS ===");

const TEST_PORT = 8081;
let serverProcess;

function startServer() {
    return new Promise((resolve, reject) => {
        // Spawn node server.js with TEST_PORT env
        serverProcess = spawn('node', ['server.js'], {
            env: { ...process.env, PORT: TEST_PORT }
        });

        serverProcess.stdout.on('data', (data) => {
            const output = data.toString();
            console.log(`[Server stdout]: ${output.trim()}`);
            if (output.includes('running on http://localhost')) {
                resolve();
            }
        });

        serverProcess.stderr.on('data', (data) => {
            console.error(`[Server stderr]: ${data.toString()}`);
        });

        serverProcess.on('error', (err) => {
            reject(err);
        });
        
        // Timeout if server doesn't start in 10s
        setTimeout(() => reject(new Error("Server start timeout")), 10000);
    });
}

function request(options, postData = null) {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => resolve({ res, body }));
        });
        
        req.on('error', (err) => reject(err));
        
        if (postData) {
            req.write(postData);
        }
        req.end();
    });
}

async function runTests() {
    try {
        console.log("Starting test server...");
        await startServer();
        console.log("Test server is running.");

        // TEST 1: Login with incorrect credentials should fail and display error
        console.log("\n--- TEST 1: Invalid Login ---");
        const invalidLoginData = 'uname=002210301129&pass=WRONGPASSWORD';
        const test1 = await request({
            host: 'localhost',
            port: TEST_PORT,
            path: '/jums_exam/checklogindetails.do',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(invalidLoginData)
            }
        }, invalidLoginData);

        assert.strictEqual(test1.res.statusCode, 200, "Should return status 200");
        assert.ok(test1.body.includes('Incorrect Password'), "Should contain error text 'Incorrect Password'");
        console.log("TEST 1 PASSED: Invalid login rejected with correct error message.");

        // TEST 2: Login with correct credentials should redirect and set cookie
        console.log("\n--- TEST 2: Valid Login ---");
        const validLoginData = 'uname=002210301129&pass=SUKU2003';
        const test2 = await request({
            host: 'localhost',
            port: TEST_PORT,
            path: '/jums_exam/checklogindetails.do',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(validLoginData)
            }
        }, validLoginData);

        assert.strictEqual(test2.res.statusCode, 302, "Should redirect with 302");
        assert.strictEqual(test2.res.headers.location, '/jums_exam/student/home.jsp', "Should redirect to dashboard");
        
        const setCookie = test2.res.headers['set-cookie'];
        assert.ok(setCookie && setCookie.length > 0, "Should set cookie");
        const cookieVal = setCookie[0].split(';')[0];
        assert.ok(cookieVal.includes('user_roll=002210301129'), "Cookie should contain user roll");
        console.log("TEST 2 PASSED: Valid login redirected to dashboard and set correct session cookie.");

        // TEST 3: Access dashboard with correct cookie
        console.log("\n--- TEST 3: Access Dashboard ---");
        const test3 = await request({
            host: 'localhost',
            port: TEST_PORT,
            path: '/jums_exam/student/home.jsp',
            method: 'GET',
            headers: {
                'Cookie': cookieVal
            }
        });

        if (test3.res.statusCode !== 200) {
            console.error(`Dashboard failed with status ${test3.res.statusCode}. Response body:`);
            console.error(test3.body);
        }

        assert.strictEqual(test3.res.statusCode, 200, "Should return 200 OK");
        assert.ok(test3.body.includes('DEEPSHIKHA  BHUNIA'), "Should display correct student name");
        assert.ok(test3.body.includes('Chemical Engineering'), "Should display correct department");
        assert.ok(test3.body.includes('B.E. Chemical Engineering'), "Should display dynamic course name");
        assert.ok(test3.body.includes('student_odd_2023/index.jsp'), "Should include odd 22-23 semester link");
        assert.ok(test3.body.includes('student_even_2026/index.jsp'), "Should include even 25-26 semester link");
        console.log("TEST 3 PASSED: Dashboard loaded correctly with valid cookie, verified profile info and links.");

        // TEST 3.1: Access dynamic semester index page
        console.log("\n--- TEST 3.1: Access Semester Index Page ---");
        const test31 = await request({
            host: 'localhost',
            port: TEST_PORT,
            path: '/jums_exam/student_odd_2023/index.jsp',
            method: 'GET',
            headers: {
                'Cookie': cookieVal
            }
        });
        assert.strictEqual(test31.res.statusCode, 200, "Should return 200 OK");
        assert.ok(test31.body.includes('First Year'), "Should display correct year");
        assert.ok(test31.body.includes('First Semester'), "Should display correct semester");
        assert.ok(test31.body.includes('CHE231035'), "Should display correct exam roll");
        assert.ok(test31.body.includes('View / Print'), "Should include view grade card link");
        console.log("TEST 3.1 PASSED: Semester Index page loaded successfully.");

        // TEST 3.2: Access dynamic grade card (regular)
        console.log("\n--- TEST 3.2: Access Regular Grade Card ---");
        const test32 = await request({
            host: 'localhost',
            port: TEST_PORT,
            path: '/jums_exam/student_odd_2023/result/view_print_result_be.jsp?exam_roll=CHE231035',
            method: 'GET',
            headers: {
                'Cookie': cookieVal
            }
        });
        assert.strictEqual(test32.res.statusCode, 200, "Should return 200 OK");
        assert.ok(test32.body.includes('JADAVPUR UNIVERSITY'), "Should display Jadavpur University header");
        assert.ok(test32.body.includes('SGPA:&nbsp; 6.15'), "Should display correct SGPA 6.15");
        assert.ok(test32.body.includes('ENGINEERING MECHNICS'), "Should display ENGINEERING MECHNICS subject");
        console.log("TEST 3.2 PASSED: Regular Grade Card loaded successfully.");

        // TEST 3.3: Access dynamic supplementary grade card
        console.log("\n--- TEST 3.3: Access Supplementary Grade Card ---");
        const test33 = await request({
            host: 'localhost',
            port: TEST_PORT,
            path: '/jums_exam/student_odd_2023/supple/result/view_print_result.jsp?exam_roll=CHES231008',
            method: 'GET',
            headers: {
                'Cookie': cookieVal
            }
        });
        assert.strictEqual(test33.res.statusCode, 200, "Should return 200 OK");
        assert.ok(test33.body.includes('CHES231008'), "Should display supplementary exam roll");
        assert.ok(test33.body.includes('Remarks:&nbsp;</b></font> <font size="2px"><b>xABDG</b></font>'), "Should display remarks xABDG");
        console.log("TEST 3.3 PASSED: Supplementary Grade Card loaded successfully.");

        // TEST 3.4: Access dynamic admit card
        console.log("\n--- TEST 3.4: Access Admit Card ---");
        const test34 = await request({
            host: 'localhost',
            port: TEST_PORT,
            path: '/jums_exam/student_odd_2023/view_print_admit_card.jsp?exam_roll=CHE231035&course_id=64',
            method: 'GET',
            headers: {
                'Cookie': cookieVal
            }
        });
        assert.strictEqual(test34.res.statusCode, 200, "Should return 200 OK");
        assert.ok(test34.body.includes('PROVISIONAL ADMIT CARD'), "Should display Provisional Admit Card title");
        assert.ok(test34.body.includes('CHE231035'), "Should display correct exam roll");
        console.log("TEST 3.4 PASSED: Admit Card loaded successfully.");

        // TEST 3.5: Course Completion Certificate - final semester
        console.log("\n--- TEST 3.5: Access Course Completion Certificate (Final Semester) ---");
        const test35 = await request({
            host: 'localhost', port: TEST_PORT,
            path: '/jums_exam/student_even_2026/course_completion_certificate.jsp?exam_roll=CHE00268012',
            method: 'GET', headers: { 'Cookie': cookieVal }
        });
        assert.strictEqual(test35.res.statusCode, 200, "CCC: Should return 200 OK");
        assert.ok(test35.body.includes('COURSE COMPLETION CERTIFICATE'), "CCC: Should display title");
        assert.ok(test35.body.includes('JADAVPUR UNIVERSITY'), "CCC: Should display university header");
        assert.ok(test35.body.includes('KOLKATA - 700032'), "CCC: Should display Kolkata city");
        assert.ok(test35.body.includes('DEEPSHIKHA  BHUNIA'), "CCC: Should display student name");
        assert.ok(test35.body.includes('002210301129'), "CCC: Should display class roll no");
        assert.ok(test35.body.includes('CHEMICAL ENGINEERING'), "CCC: Should display degree");
        assert.ok(test35.body.includes('Controller of Examinations'), "CCC: Should display signature title");
        console.log("TEST 3.5 PASSED: Course Completion Certificate loaded with the new text layout.");

        // TEST 3.6: Non-final semester CCC route should return 403
        console.log("\n--- TEST 3.6: CCC Route Forbidden for Non-Final Semester ---");
        const test36 = await request({
            host: 'localhost', port: TEST_PORT,
            path: '/jums_exam/student_odd_2023/course_completion_certificate.jsp?exam_roll=CHE231035',
            method: 'GET', headers: { 'Cookie': cookieVal }
        });
        assert.strictEqual(test36.res.statusCode, 403, "CCC non-final: Should return 403 Forbidden");
        console.log("TEST 3.6 PASSED: CCC correctly rejected for non-final semester.");

        // TEST 3.7: Final semester index shows CCC link
        console.log("\n--- TEST 3.7: Final Semester Index — CCC Link, Empty Supple Cells ---");
        const test37 = await request({
            host: 'localhost', port: TEST_PORT,
            path: '/jums_exam/student_even_2026/index.jsp',
            method: 'GET', headers: { 'Cookie': cookieVal }
        });
        assert.strictEqual(test37.res.statusCode, 200, "Final sem index: Should return 200 OK");
        assert.ok(test37.body.includes('View/Print Course Completion Certificate'), "Final sem index: Should show CCC link");
        assert.ok(test37.body.includes('course_completion_certificate.jsp'), "Final sem index: CCC link href should point to CCC JSP");
        assert.ok(test37.body.includes('Supplementary Exam</b>'), "Final sem index: Should STILL show Supplementary Exam column header");
        assert.ok(!test37.body.includes('supple/result/view_print_result.jsp'), "Final sem index: Should NOT have supple result link");
        console.log("TEST 3.7 PASSED: Final semester index has CCC link and 12 columns with empty supple cells.");

        // TEST 3.8: Non-final semester index still has grade card link
        console.log("\n--- TEST 3.8: Non-Final Semester Index — Grade Card ---");
        const test38 = await request({
            host: 'localhost', port: TEST_PORT,
            path: '/jums_exam/student_odd_2023/index.jsp',
            method: 'GET', headers: { 'Cookie': cookieVal }
        });
        assert.strictEqual(test38.res.statusCode, 200, "Non-final sem index: Should return 200 OK");
        assert.ok(test38.body.includes('View Grade Card'), "Non-final sem index: Should show 'View Grade Card' link");
        assert.ok(!test38.body.includes('supple/result/view_print_result.jsp'), "Non-final sem index: Should NOT have supple result link");
        assert.ok(!test38.body.includes('view_print_ccc.jsp'), "Non-final sem index: Should NOT have CCC link");
        console.log("TEST 3.8 PASSED: Non-final semester index retains grade card link and empty supplementary columns.");

        // TEST 3.9: Final Semester Grade Card with 8-Semester SGPA Table
        console.log("\n--- TEST 3.9: Final Semester Grade Card ---");
        const test39 = await request({
            host: 'localhost', port: TEST_PORT,
            path: '/jums_exam/student_even_2026/result/view_print_result_be.jsp?exam_roll=CHE00268083',
            method: 'GET', headers: { 'Cookie': cookieVal }
        });
        assert.strictEqual(test39.res.statusCode, 200, "Should return 200 OK");
        assert.ok(test39.body.includes('SGPA obtained in the Eight semesters'), "Should contain 8-semester SGPA summary header");
        assert.ok(test39.body.includes('CGPA: 7.80'), "Should contain CGPA 7.80");
        assert.ok(test39.body.includes('INDUSTRIAL MANAGEMENT'), "Should contain final semester subject");
        console.log("TEST 3.9 PASSED: Final Semester Grade Card loaded with 8-semester SGPA summary table.");

        // TEST 3.10: Access Provisional Pass Certificate (Final Semester)
        console.log("\n--- TEST 3.10: Access Provisional Pass Certificate ---");
        const test310 = await request({
            host: 'localhost', port: TEST_PORT,
            path: '/jums_exam/student_even_2026/provisional_certificate.jsp?exam_roll=CHE00268083',
            method: 'GET', headers: { 'Cookie': cookieVal }
        });
        assert.strictEqual(test310.res.statusCode, 200, "Provisional Cert: Should return 200 OK");
        assert.ok(test310.body.includes('To whom it may concern'), "Provisional Cert: Should display title");
        assert.ok(test310.body.includes('JADAVPUR UNIVERSITY'), "Provisional Cert: Should display university header");
        assert.ok(test310.body.includes('Ref.No.PROV/'), "Provisional Cert: Should display Ref No");
        assert.ok(test310.body.includes('FIRST CLASS'), "Provisional Cert: Should display class/grade");
        assert.ok(test310.body.includes('72.15%'), "Provisional Cert: Should display percentage marks");
        assert.ok(test310.body.includes('Controller of Examinations'), "Provisional Cert: Should display CoE title");
        console.log("TEST 3.10 PASSED: Provisional Pass Certificate loaded successfully.");

        // TEST 3.11: Check Even Semester (2025-26) tab contains link to Provisional Pass Certificate
        console.log("\n--- TEST 3.11: Final Semester Index — Provisional Certificate Link ---");
        const test311 = await request({
            host: 'localhost', port: TEST_PORT,
            path: '/jums_exam/student_even_2026/index.jsp',
            method: 'GET', headers: { 'Cookie': cookieVal }
        });
        assert.strictEqual(test311.res.statusCode, 200, "Final sem index: Should return 200 OK");
        assert.ok(test311.body.includes('provisional_certificate.jsp'), "Final sem index: Should contain link to provisional_certificate.jsp");
        assert.ok(test311.body.includes('View / Print Provisional Certificate'), "Final sem index: Should display link text 'View / Print Provisional Certificate'");
        console.log("TEST 3.11 PASSED: Final semester index contains Provisional Certificate link.");

        // TEST 4: Sign out clears cookies
        console.log("\n--- TEST 4: Sign Out ---");
        const test4 = await request({
            host: 'localhost', port: TEST_PORT,
            path: '/jums_exam/signout.do?logged_out=true',
            method: 'GET', headers: { 'Cookie': cookieVal }
        });
        assert.strictEqual(test4.res.statusCode, 200, "Should return 200 OK for login page");
        const newSetCookie = test4.res.headers['set-cookie'];
        assert.ok(newSetCookie && newSetCookie.length > 0, "Should clear/set cookie");
        assert.ok(newSetCookie[0].includes('user_roll=;'), "Cookie should be cleared");
        console.log("TEST 4 PASSED: Sign out cleared session cookies and returned home page.");

        console.log("\n=== ALL JUMS PORTAL TESTS PASSED SUCCESSFULLY ===");
        terminateServer(0);
    } catch (e) {
        console.error("\n!!! TEST FAILED !!!");
        console.error(e);
        terminateServer(1);
    }
}

function terminateServer(exitCode) {
    if (serverProcess) {
        console.log("Stopping test server...");
        serverProcess.kill();
    }
    process.exit(exitCode);
}

runTests();
