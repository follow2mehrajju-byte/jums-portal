<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>View/Print Admit Card</title>
    <style>
        body{
            font-size: 13px;
        }
    </style>
</head>
<body class="">
    <input id="printpagebutton" type="button" value="Print" onclick="printpage()">
    
    <table border="0" width="100%" style="padding-left:10px;padding-right:10px">
        <tbody>
            <tr>
                <td align="center">
                    <b>Generated from JADAVPUR UNIVERSITY MANAGEMENT SYSTEM</b>
                    <br>
                    <img src="/jums_exam/resources/images/julogo.png" width="100" height="100">
                    <br>
                    <b>PROVISIONAL ADMIT CARD</b><br>
                    <b>JADAVPUR UNIVERSITY<br>KOLKATA - 700032<br>ADMIT CARD</b>
                </td>
            </tr>
        </tbody>
    </table>
    <br>
    <table border="0" width="100%" style="padding-left:10px;padding-right:10px">
        <tbody>
            <tr>
                <td width="50%" align="left">
                    <b>Examination Roll No.: <%= examRoll %></b><br>
                    <b><%= semInfo.mobileNoLabel || 'Mobile No:' %> <%= student.mobile_no || '8918681467' %></b><br>
                    <b><%= semInfo.emailIdLabel || 'Email Id :' %> <%= student.email || 'mehrajmullick@gmail.com' %></b><br>
                    <% if (semInfo.abcApaarId) { %>
                    <b>ABC/APAAR ID : <%= semInfo.abcApaarId %></b><br>
                    <% } %>
                </td>
                <td width="50%" align="right">
                    <img src="/jums_exam/student_photos/<%= student.roll_no %>.jpg" width="90px" height="100px">
                </td>
            </tr>
        </tbody>
    </table>       
    <p align="justify" style="padding-left:10px;padding-right:10px">
        <b>ADMIT Sri/Smt. <%= student.name %></b> having Examination Roll No. <b><%= examRoll %></b> and Registration No. <b><%= student.registration_no || '162135' %></b> of <b><%= student.registration_session || '2022-23' %></b>
        in the Examination Hall, for appearing in the following* 
        subjects of the <b>B.E. Chemical Engineering <%= semInfo.yearText %> <%= semInfo.semText %> Examination, <%= semInfo.examYear %></b>.
    </p>
    <table border="1" width="99%" align="center">
        <tbody>
            <tr>
                <td align="center" width="30%"><b>*Subjects of Examination</b></td>
                <td align="center" width="30%"><b>*Dates of Examination (dd/mm/yyyy)</b></td>
                <td align="center" width="30%"><b>*Times of Examination</b></td>
                <td align="center" width="30%"><b>*Signature of Invigilator</b></td>
            </tr>
            
            <% for (let subject of subjects) { %>
                <tr>
                    <td style="padding: 2px"><%= subject.name %></td>
                    <td style="padding: 2px"><%= subject.date %></td>
                    <td style="padding: 2px"><%= subject.time %></td>
                    <td style="padding: 2px"></td>
                </tr>
            <% } %>
        </tbody>
    </table>
    <br><br>
    
    <table border="0" width="100%" style="padding-left:10px;padding-right:10px">
        <tbody>
            <tr>
                <td width="50%" align="left">
                    <img src="/jums_exam/resources/images/<%= semInfo.signatureImage || 'abul.jpg' %>" height="40">
                    <br>
                    <b><%= semInfo.signatureText || 'Issued by: Controller of Examinations(offg.)' %> </b>
                </td>
                <td width="50%" align="right" valign="bottom">
                    <b>Signature of Candidate</b>
                </td>
            </tr>
        </tbody>
    </table>
    
    <p align="justify" style="padding-left:10px;padding-right:10px">
        <b>
            <% if (semInfo.asterisks) { %>
                <% for (let ast of semInfo.asterisks) { %>
                    <%= ast %><br><br>
                <% } %>
            <% } else { %>
                **Candidates must sign on the printed copy of the provisional admit card and sign on photograph before entering in to the examination hall. With out sign the provisional admit card will not be accepted.
                <br><br>
                ***GRADE CARD will be issued from counter only against the printed copy of online provisional admit card duly signed by the invigilators during examination for all the subjects he/she is appearing.<br>
                Collection of Grade Card is mandatory for registering for the Next Semester Examination. Student must collect it as per date and schedule to be notified after publication of result.
                <br><br>
                ****Students must carry a photo identity card/University I-card to the examination hall. Invigilators are requested not to allow any student without admit card.
                <br><br>
                *****This admit card is issued provisionally. Publication of result is subject to fulfillment of other eligible criteria of admission etc.
                <br><br>
            <% } %>
        </b>
    </p>
    <table width="100%">
        <tbody>
            <tr>
                <td width="33%"><strong>Date: <%= semInfo.printDate || currentTime %></strong></td>
                <td width="33%" align="center"><strong><%= semInfo.ipLabel || 'IP:' %> <%= semInfo.ipValue || '106.202.89.188' %></strong></td>
                <td width="33%" align="right"><font size="3" color="red"><b>Form submission date &amp; time:<br><%= semInfo.submissionTime || submissionTime %></b></font></td>
            </tr>
        </tbody>
    </table>

    <script type="text/javascript">
        function printpage() {
            var printButton = document.getElementById("printpagebutton");
            printButton.style.visibility = 'hidden';
            window.print();
            printButton.style.visibility = 'visible';
        }
    </script>
</body>
</html>
