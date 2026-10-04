<!DOCTYPE html>
<html>
<head>
    <title>Grade Card</title>
    <style>
        html *{
            font-family: verdana;
        }
        tr{
            height: 16px;
        }  

        body{
            margin-right: 5%;
            margin-left: 5%;
            margin-top: 1%;
            margin-bottom: 1%;
        }       

        html:after {
            content: "Generated from JUMS"; 
            font-size: 250%;        
            color: rgba(0, 0, 0, .2);

            z-index: 9999;
            cursor: default;
            display: block;
            position: fixed;
            top: 42%;
            right: 0;
            bottom: 0;
            left: 40%;
            font-family: sans-serif;
            font-weight: bold;
            font-style: italic;
            text-align: center;
            line-height: 100%;

            -webkit-pointer-events: none;
            -moz-pointer-events: none;
            -ms-pointer-events: none;
            -o-pointer-events: none;
            pointer-events: none;

            -webkit-transform: rotate(-45deg);
            -moz-transform: rotate(-45deg);
            -ms-transform: rotate(-45deg);
            -o-transform: rotate(-45deg);
            transform: rotate(-45deg);

            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            -o-user-select: none;
            user-select: none;
        }
    </style>
</head>
<body class="">
    <input id="printpagebutton" type="button" value="Print" onclick="printpage()">
    
    <table width="100%">
        <tbody>
            <tr>
                <td width="20%"></td>
                <td width="60%" style="text-align: center">
                    <img src="/jums_exam/resources/images/julogo.png" alt="no-image" style="width:80px;height:80px;">
                    <br>
                    <font size="4px"><b><u>JADAVPUR UNIVERSITY</u></b></font>
                    <br>
                    <font size="2px"><b>KOLKATA-700032</b></font>
                    <br>
                    <font size="2px"><b>GRADE CARD</b></font>
                    <% if (isSupple) { %>
                        <br>
                        <font size="1px"><b>(SUPPLEMENTARY)</b></font>
                    <% } else if (semInfo.degreeCourseText) { %>
                        <br>
                        <font size="1px"><b>(<%= semInfo.degreeCourseText %>)</b></font>
                    <% } else { %>
                        <br>
                        <font size="1px"><b>( 4 Year 8 Semester Degree Course )</b></font>
                    <% } %>
                </td>
                <td width="20%" valign="top" style="text-align: right;">
                    <% if (semInfo.serialNo) { %>
                        <font size="2px"><b><%= semInfo.serialNo %></b></font>
                    <% } %>
                </td>
            </tr>
        </tbody>
    </table> 
    <br>

    <table width="100%" style="border-left: solid;border-right: solid;border-bottom: solid;border-top: solid ;border-width: 2px;">
        <tbody>
            <tr>
                <td width="25%">
                    <table width="100%">
                        <tbody>
                            <tr style="border-width: 1px; vertical-align: text-top">
                                <td>
                                    <font size="1px">Result of the</font>
                                </td>
                            </tr>
                            <tr style="border-width: 1px">
                                <td style="border-bottom: solid; border-width: 1px">
                                    <font size="1px"><b>&emsp;<%- semInfo.yearText.replace('First', '1<sup>st</sup>').replace('Second', '2<sup>nd</sup>').replace('Third', '3<sup>rd</sup>').replace('Fourth', '4<sup>th</sup>') %> <%- semInfo.semText.replace('First', '1<sup>st</sup>').replace('Second', '2<sup>nd</sup>') %>&emsp;</b></font>
                                </td>
                            </tr>
                            <tr style="border-width: 1px">
                                <td>
                                    <font size="1px">for</font>
                                </td>
                            </tr>
                            <tr style="border-width: 1px">
                                <td>
                                    <font size="1px">the Department of</font>
                                </td>
                            </tr>
                            <tr style="border-width: 1px">
                                <td>
                                    <font size="1px">bearing Class Roll No.</font>
                                </td>
                            </tr>
                            <tr style="border-width: 1px">
                                <td>
                                    <font size="1px">Registration No.</font>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
                
                <td width="75%">
                    <table width="100%">
                        <tbody>
                            <tr>
                                <td style="border-bottom: solid; text-align: center;border-width: 1px;" colspan="3">
                                    <font size="1px"><b>BACHELOR OF ENGINEERING IN CHEMICAL ENGINEERING</b></font>
                                </td>
                            </tr>
                            <tr>
                                <td width="50%" style="text-align: center" colspan="2">
                                    <font size="1px">Examination for the session</font>   
                                </td>
                                <td width="50%" style="border-bottom: solid;text-align: center; border-width: 1px;">    
                                    <font size="1px"><b><%= semInfo.sessionYear %></b></font>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style="border-bottom: solid; text-align: center; border-width: 1px;">
                                    <font size="1px"><b><%= student.name %></b></font>
                                </td>
                                <td style="text-align: center">
                                    <font size="1px">studying in</font>  
                                </td>
                            </tr>
                            <tr>
                                <td colspan="3" style="border-bottom: solid;text-align: center; border-width: 1px;">
                                    <font size="1px"><b><%= student.dept ? student.dept.toUpperCase() : 'CHEMICAL ENGINEERING' %></b></font>
                                </td>
                            </tr>
                            <tr>
                                <td style="border-bottom: solid; text-align: center; border-width: 1px;" width="40%">
                                    <font size="1px"><b><%= student.roll_no %></b></font>
                                </td>
                                <td width="35%" align="center">
                                    <font size="1px">and Examination Roll No.</font>                                   
                                </td>
                                <td style="border-bottom: solid; text-align: center; border-width: 1px;" width="25%">
                                    <font size="1px"><b><%= examRoll %></b></font>
                                </td>
                            </tr>
                            <tr>
                                <td style="border-bottom: solid ;text-align: center; border-width: 1px;" width="40%">
                                    <font size="1px"><b><%= student.registration_no || '162135' %></b></font>
                                </td>
                                <td width="35%" align="center">
                                    <font size="1px">of</font>                                
                                </td>
                                <td style="border-bottom: solid; text-align: center; border-width: 1px;" width="25%">
                                    <font size="1px"><b><%= student.registration_session || '2022-23' %></b></font>
                                </td>                        
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
    <br>
    <font size="2px"><b>Examination held in</b></font>  
    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
    <font size="2px"><b><%= semInfo.heldIn %></b></font>
    <br><br>

    <table width="100%" border="1" style="border-collapse: collapse;border: solid;">
        <tbody>
            <tr>
                <td width="15%" style="border-collapse: collapse;border: solid;text-align: center;height: 40px;">
                    <font size="2px"><b>Code</b></font>
                </td>
                <td width="60%" style="border-collapse: collapse;border: solid;text-align: center;height: 40px">
                    <font size="2px"><b>Subject</b></font>
                </td>
                <td width="10%" style="border-collapse: collapse;border: solid;text-align: center;height: 40px">
                    <font size="2px"><b>Assigned<br>Credit(C)</b></font>
                </td>
                <td width="15%" style="border-collapse: collapse;border: solid;text-align: center;height: 40px">
                    <font size="2px"><b>Grade</b></font>
                </td>
            </tr>

            <!-- Render subject rows (up to 12) -->
            <% 
            for (let i = 0; i < 12; i++) { 
                let subject = subjects[i];
            %>
                <tr>
                    <td width="20%" style="border-collapse: collapse;border: solid 0.5px; height: 19.5px;">
                        <font size="1px"><%= subject ? subject.code : "" %></font>
                    </td>
                    <td width="40%" style="border-collapse: collapse;border: solid 0.5px; height: 19.5px;">
                        <font size="1px"><%= subject ? subject.name : "" %></font>
                    </td>
                    <td width="30%" style="border-collapse: collapse;border: solid 0.5px;text-align: center; height: 19.5px;">
                        <font size="1px"><%= subject ? subject.credit : "" %></font>
                    </td>
                    <td width="10%" style="border-collapse: collapse;border: solid 0.5px;text-align: center; height: 19.5px;">
                        <font size="1px"><%= subject ? subject.grade : "" %></font>
                    </td>
                </tr>
            <% } %>
        </tbody>
    </table>
    
    <table width="100%">
        <tbody>
            <tr>
                <td style="width: 20%" valign="top">
                    <font size="2px"><b>SGPA:&nbsp; <%= sgpa %> </b></font>
                </td>
                <td>
                    <font size="2px">&nbsp;</font>
                </td>
                <td></td>
                <td style="text-align: center;">
                    <font size="2px"><b>
                        Compulsory EVS Status: <%= evsStatus %>
                    </b></font>
                </td>
                <td>
                    <font size="2px">&nbsp;</font>
                </td>
                <td></td>
                <td>
                    <font size="2px">&nbsp;</font>
                </td>
                <td style="text-align: right;width: 20%" valign="top">
                    <font size="2px"><b>Remarks:&nbsp;</b></font> <font size="2px"><b><%= remarks %></b></font>
                </td>
            </tr>
        </tbody>
    </table>  

    <table width="100%">
        <tbody>
            <tr>
                <td width="60%">
                    <font size="0.5px" style="text-align: justify">
                        This online grade card, processed by JUMS, and published on the JU website is for immediate information to the examinee <b>valid for 3 months</b> only. For
                        any discrepancies, please contact Office of the Controller of Examinations <b>within 10 days</b> from the date of result publication. The online grade card is 
                        not valid for any purpose of <b>scholarship and all other rest official works..</b>
                        <br><b>Regarding Hons. Paper ( if applicable ):</b> Marks Of Hons. Paper Is Not Included in SGPA &amp; Final Percentage Of Marks Calculation.
                    </font>                
                </td>  
                <td width="40%" style="text-align: right;">
                    <img src="/jums_exam/resources/images/coe_sign.jpg" alt="no image" style="width:200px;height:40px;">
                    <br>
                    <font size="2px"><b>Controller of Examinations</b></font>
                </td>  
            </tr>
            <tr>
                <td colspan="2" style="text-align: left;"><font size="0.5px">
                    <b><%= isSupple ? "Month of issue:" : "Date of Issue:" %></b> <%= issueDate %> &nbsp;&nbsp;<%= isSupple ? "(Supplementary)" : "" %>
                    <% if (semInfo.generatedBy) { %>
                        <br><b>Generated by:</b> <%= semInfo.generatedBy %>
                    <% } %>
                    <% if (semInfo.processedFrom) { %>
                        <br><b>Processed from:</b> <%= semInfo.processedFrom %>
                    <% } %>
                    <% if (semInfo.reviewStart && semInfo.reviewEnd) { %>
                    <% } %>
                </font></td>
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
