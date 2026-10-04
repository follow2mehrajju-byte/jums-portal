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
</head>
<body>
    
        <div id="header">
			<div style="position: absolute; left: 2%; top: 3%;">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <img src="/jums_exam/resources/images/julogo.png" alt="no image" height="100" width="100">
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
			</div>
		
		<div style="height: 5%;"></div>
		
        <div class="container">
	<section id="content">
            <% if (error) { %>
                <font color="red" size="4"><%= error %></font>
                <br><br>
            <% } %>
            <form action="/jums_exam/restpassword.do" method="post"> 
			<h1>Reset Password</h1>
			<div>
                            <input type="text" placeholder="Roll No." required="" id="username" name="roll_no" autocomplete="off"/>
			</div>
			<div>
                            <input type="text" placeholder="Your Primary 10 digit Mobile No." required="" id="username" name="mobile_no" autocomplete="off" maxlength="10"/>
			</div>
			<div>
				<input type="submit" value="Submit" />
                                <a href="/jums_exam/index.jsp">Cancel</a> 
			</div>
		</form><!-- form -->
		<div class="button">
		<!--	<a href="#">--------</a>          -->
		</div><!-- button -->
	</section><!-- content -->
</div><!-- container -->
        
		<div style="height: 50px;"></div>
		
        <div id="footer">
            <p style="font-family: Courier; font-size: 100%; text-align: center; color: #FFFFFF;">&copy; Centre for Distributed Computing, CSE Deptt., JU</p>
        </div>
        
</body>
</html>
