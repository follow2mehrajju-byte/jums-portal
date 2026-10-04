<html>
    <head>
        <title>JUMS</title>
        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
        
        <!----------------Cache Control-------------->
        <meta http-equiv="cache-control" content="max-age=0" />
        <meta http-equiv="cache-control" content="no-cache" />
        <META HTTP-EQUIV="CACHE-CONTROL" CONTENT="private"/>
        <META HTTP-EQUIV="CACHE-CONTROL" CONTENT="no-store"/>
        <META HTTP-EQUIV="CACHE-CONTROL" CONTENT="must-revalidate"/>
        <META HTTP-EQUIV="CACHE-CONTROL" CONTENT="post-check=0,pre-check=0"/>
        <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
        <META HTTP-EQUIV="Expires" CONTENT="-1">
        <!------------End of Cache Control-------------->
        
        <link rel="stylesheet" type="text/css" href="/jums_exam/resources/css/styles.css" />
        <link rel="stylesheet" type="text/css" href="/jums_exam/resources/css/style01.css" />
        <script src="/jums_exam/resources/js/index.js"></script>
        <script type="text/javascript" src="/jums_exam/resources/js/disablerightclick.js"></script>
        <style>
            .flash {
                animation-name: flash;
                animation-duration: 0.5s;
                animation-timing-function: linear;
                animation-iteration-count: infinite;
                animation-direction: alternate;
                animation-play-state: running;
            }

            @keyframes flash {
                from {color: red;}
                to {color: green;}
            }
        </style>
    </head>
    <body>

        <div id="header">
            <div style="position: absolute; left: 1%; top: 0.2%;">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="/jums_exam/resources/images/julogo.png" alt="no image" height="100" width="100">
            <br><img src="/jums_exam/resources/images/ju_bengali_1.png" alt="no image" height="60" width="300">
            </div>

        </div>
        <div style="position: absolute; right: 3%; top: 0%;">
            <p class="Vlarge" style="font-family: Courier; font-weight: bolder;">Jadavpur University Management System</p>


            <div style="position: absolute; right: 1%; top: 50%;">
                <p class="large" style="font-family: Courier;">Jadavpur University</p>
            </div>

            <div style="position: absolute; right: 1%; top: 70%;">
                <p class="large" style="font-family: Courier;">Kolkata - 700 032</p>
            </div>
            <div style="position: absolute; right: 45%; top: 70%;">
                <p class="large" style="font-family: Courier;">Technology Bhavan, 2nd floor</p>
            </div>
        </div>


    <center>
        <font color='red'><b>Best viewed in Desktop/Laptop (Google Chrome or Mozilla Firefox latest version).</b></font>
        <br><br>
        <marquee behavior="alternate" direction = "LEFT"><font color='GREEN' size="+.5"><b>Contact Us: &nbsp;&nbsp;enquiry.jums@jadavpuruniversity.in and Call us: &nbsp;&nbsp;033 2457 3032 (11 AM to 5 PM ).</b></font></marquee>
        <br><br>
        <font color='red'><b><u><a href="/jums_exam/register.jsp">Not yet registered? Register here</a></u></b>
        <br><br>
        <font color='red'><b><a href="https://jadavpuruniversity.in/?jet_download=13511"><u>THE CLEARENCE FORM FOR COLLECTING THE FINAL SEMESTER GRADE CARD</u></a></b></font>

        <h5>Current Date:  <%= currentTime %> </h5>
        </font> 
    </center>
    <br><br>
    <table border="0" width="100%" style="padding:5px">
        <tr>
            <td width="65%" valign="top">
                <font color="BLUE" size='3'>
                <b><U>NOTICE BOARD: </b></U> <br>
                <div class="flash" align="justify">
                    <br><br>
             <marquee scrollamount="3.1" direction="UP" onmouseover="this.stop();"
           onmouseout="this.start();">
                    
                    1. <font size='4'><b><u>Faculty of Arts</u></b></font><br><font size='3'><ul><li> Check Your Odd 2026 2nd year 1st semester  Review result of PG Arts <b> COMPARATIVE LITERATURE</b> department.</li></ul></font>. Notice Date:  Fri 12 Jun 2026 01:56:56 PM
                    
                    <img src="/jums_exam/newicon.gif">
                    
                     <br><br>
                    
                    2. <font size='4'><b><u>Faculty of Arts</u></b></font><br><font size='3'><ul><li> Check Your Odd 2026 2nd year 1st semester  Review result of PG Arts <b> SOCIOLOGY & SCHOOL OF LANGUAGES AND LINGUISTICS</b> departments.</li></ul></font>. Notice Date:  Tue 09 Jun 2026 05:27:15 PM
                    
                     <br><br>
                    
                    3. <font size='4'><b><u>Faculty of Arts</u></b></font><br><font size='3'><ul><li> Check Your Odd 2026 2nd year 1st semester  Review result of PG Arts <b> ECONOMICS & SANSKRIT (Day)</b> departments.</li></ul></font>. Notice Date:  Mon 08 Jun 2026 04:51:32 PM
                    
                     <br><br>
                    
                    </marquee>
                    
                </div>   
                </font>
            </td>
            <td width="35%" align="right" valign="top">
                <div class="container">
                    <center>
                        <u><a href="/jums_exam/reset_password/index.jsp"><font color='red' size='3'>Forgot Password? Reset here</font></a></u>
                    </center>

                    <br>

                    <section id="content">
                        <% if (error) { %>
                            <font color="red" size="4"><%= error %></font>
                            <br><br>
                        <% } %>
                        <% if (success) { %>
                            <font color="green" size="4"><b><%= success %></b></font>
                            <br><br>
                        <% } %>
                        <form action="/jums_exam/checklogindetails.do" method="post">
                            <h1>Login Here</h1>
                            <div>
                                <input type="text" placeholder="Current 12 digit Roll No." required="" id="username" name="uname" />
                            </div>
                            <div>
                                <input type="password" placeholder="Password" required="" id="password" name="pass"/>
                            </div>
                            <div>
                                <input type="submit" value="Log in" />
                            </div>
                        </form><!-- form -->
                        <div class="button">
                            <!--    <a href="#">--------</a>          -->
                        </div><!-- button -->
                    </section><!-- content -->
                </div><!-- container -->
            </td>
        </tr>
    </table>

    <div style="height: 50px;"></div>

    <div id="footer">
        <p style="font-family: Courier; font-size: 100%; text-align: center; color: #FFFFFF;">&copy; Centre for Distributed Computing, Department of Computer Science & Engineering, Jadavpur University</p>
    </div>

</body>
</html>
