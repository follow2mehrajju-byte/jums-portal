<!DOCTYPE html>
<html>
<head>
    <title>Course Completion Certificate</title>
    <style>
        body {
            font-family: 'Times New Roman', serif;
            margin: 5% 10%;
            text-align: center;
        }

        .print-btn {
            position: absolute;
            top: 20px;
            left: 20px;
        }

        @media print {
            .print-btn {
                display: none;
            }
        }
        
        .header-bengali {
            font-family: 'Arial', sans-serif;
            font-size: 16px;
            margin-top: 10px;
            font-weight: bold;
        }

        .header-english {
            font-size: 22px;
            font-weight: bold;
            margin-top: 5px;
        }

        .header-city {
            font-size: 16px;
            font-weight: bold;
            margin-top: 2px;
        }

        .header-sub {
            font-size: 10px;
            color: #333;
            margin-top: 5px;
        }

        .date-section {
            text-align: right;
            margin-top: 50px;
            font-style: italic;
            font-size: 16px;
            font-weight: bold;
        }

        .title-section {
            margin-top: 40px;
        }

        .title-main {
            font-size: 20px;
            font-weight: bold;
            text-decoration: underline;
            font-style: italic;
        }

        .title-sub {
            font-size: 18px;
            margin-top: 15px;
            text-decoration: underline;
            font-weight: bold;
            font-style: italic;
            font-family: "Monotype Corsiva", "Brush Script MT", "Lucida Handwriting", cursive;
        }

        .body-text {
            margin-top: 50px;
            font-size: 20px;
            line-height: 1.8;
            text-align: justify;
            font-family: "Monotype Corsiva", "Brush Script MT", "Lucida Handwriting", cursive;
        }
        
        .body-text b {
            font-family: 'Times New Roman', serif;
            font-weight: bold;
            font-style: italic;
        }

        .signature-section {
            margin-top: 80px;
            text-align: right;
        }

        .signature-title {
            font-weight: bold;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <input class="print-btn" id="printpagebutton" type="button" value="Print" onclick="window.print()">

    <img src="/jums_exam/resources/images/julogo.png" alt="Jadavpur University Logo" style="width:100px; height:100px;">
    
    <div class="header-bengali">যাদবপুর বিশ্ববিদ্যালয়</div>
    <div class="header-english">JADAVPUR UNIVERSITY</div>
    <div class="header-city">KOLKATA - 700032</div>
    <div class="header-sub">GENERATED FROM JADAVPUR UNIVERSITY MANAGEMENT SYSTEM</div>



    <div class="date-section">
        Date :- 16-02-2026
    </div>

    <div class="title-section">
        <div class="title-main">COURSE COMPLETION CERTIFICATE</div>
        <div class="title-sub">TO WHOM IT MAY CONCERN</div>
    </div>

    <div class="body-text">
        This is to certify that <b><%= student.name %></b> bearing University Registration No. <b><%= student.registration_no || '162135' %></b> of <b><%= student.registration_session || '2022-23' %></b> and Class Roll No. <b><%= student.roll_no %></b> has completed all the requirements related to the course of <b>B.E. CHEMICAL ENGINEERING</b> in <b>JUNE 2026</b>.
    </div>

    <div class="signature-section">
        <img src="/jums_exam/resources/images/coe_sign.jpg" alt="Signature" style="height: 50px; display: block; margin-left: auto; margin-right: 0;" onerror="this.style.display='none'">
        <div class="signature-title">Controller of Examinations</div>
    </div>
</body>
</html>
