<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
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
<body>
    <input id="printpagebutton" type="button" value="Print" onclick="printpage()"/>
    
    <br><br><br><br><br><br>
    <center>
        <font color='red' size='3'>
        Sorry !!!<br>Grade Card not available. 
        </font>
    </center>
     
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
