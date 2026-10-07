<!DOCTYPE html>
<html>
<head>
    <title>Provisional Certificate</title>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <style>
        body {
            font-family: 'Times New Roman', serif;
            margin: 40px 80px;
            color: #000;
            background-color: #fff;
        }

        .print-btn {
            position: absolute;
            top: 20px;
            left: 20px;
            padding: 5px 15px;
            font-size: 14px;
            cursor: pointer;
        }

        @media print {
            .print-btn {
                display: none;
            }
            body {
                margin: 20px 40px;
            }
        }
        
        .header-bengali {
            font-family: Arial, sans-serif;
            font-size: 20px;
            margin-top: 10px;
            font-weight: bold;
        }

        .header-english {
            font-size: 22px;
            font-weight: bold;
            margin-top: 5px;
            letter-spacing: 0.5px;
        }

        .header-city {
            font-size: 16px;
            font-weight: bold;
            margin-top: 2px;
        }

        .header-sub {
            font-size: 13px;
            font-weight: bold;
            color: #000;
            margin-top: 5px;
            font-family: sans-serif;
            letter-spacing: 0.2px;
        }

        .ref-date-section {
            display: flex;
            justify-content: space-between;
            margin-top: 45px;
            font-size: 18px;
            font-style: italic;
        }

        .title-section {
            text-align: center;
            margin-top: 45px;
        }

        .title-text {
            font-size: 20px;
            font-weight: bold;
            font-style: italic;
            text-decoration: underline;
        }

        .body-paragraph {
            margin-top: 45px;
            font-size: 19px;
            line-height: 1.8;
            text-align: justify;
            font-style: italic;
        }

        .body-paragraph b {
            font-weight: bold;
            font-style: italic;
        }

        .released-by {
            margin-top: 60px;
            font-size: 18px;
            font-style: italic;
        }

        .signature-section {
            text-align: right;
            margin-top: 20px;
        }

        .signature-title {
            font-size: 18px;
            font-style: italic;
            margin-top: 8px;
        }

        .footer-note {
            margin-top: 60px;
            font-size: 15px;
            font-style: italic;
        }
    </style>
</head>
<body>
    <input class="print-btn" id="printpagebutton" type="button" value="Print" onclick="window.print()">

    <div style="text-align: center;">
        <img src="/jums_exam/resources/images/julogo.png" alt="Jadavpur University Logo" style="width: 95px; height: 95px;">
        <div class="header-bengali">যাদবপুর বিশ্ববিদ্যালয়</div>
        <div class="header-english">JADAVPUR UNIVERSITY</div>
        <div class="header-city">KOLKATA - 700032</div>
        <div class="header-sub">GENERATED FROM JADAVPUR UNIVERSITY MANAGEMENT SYSTEM</div>
    </div>

    <div class="ref-date-section">
        <div>Ref.No.PROV/<%= examRoll %></div>
        <div>Date:- <%= issueDate %></div>
    </div>

    <div class="title-section">
        <span class="title-text">To whom it may concern</span>
    </div>

    <div class="body-paragraph">
        This is to certify that <b>Sri/Smt <%= student.name %></b> registration no <b><%= student.registration_no || '162135' %></b> of <b><%= regSession %></b> has provisionally passed the <b><%= degreeName %></b> Final Examination, <b><%= examYear %></b> held in <b><%= heldIn %></b> having been placed in <b><%= remarks %></b> with <b><%= weightedAvg %>%</b> marks, has duly qualified himself/herself for receiving the degree of <b><%= degreeName %></b> from <b>Jadavpur University</b> in the next Convocation to be held on <%= convocationDate %>. This Provisional certificate will be valid till the final degree is awarded on <%= convocationDate %>.
    </div>

    <div class="released-by">
        Released by: <%= generatedBy %>
    </div>

    <div class="signature-section">
        <img src="/jums_exam/resources/images/coe_sign.jpg" alt="Signature" style="height: 55px; display: block; margin-left: auto; margin-right: 0;" onerror="this.style.display='none'">
        <div class="signature-title">Controller of Examinations</div>
    </div>

    <div class="footer-note">
        NOTE: This is a digitally generated document,hence signature and stamp not required from issuing authority.
    </div>
</body>
</html>
