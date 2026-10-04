










<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">






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

        <!------------JeasyUI Library-------------->
        <link rel="stylesheet" type="text/css" href="/jums_exam/resources/jqueryui/themes/default/easyui.css">
        <link rel="stylesheet" type="text/css" href="/jums_exam/resources/jqueryui/themes/icon.css">
        <link rel="stylesheet" type="text/css" href="/jums_exam/resources/jqueryui/demo.css">
        <script type="text/javascript" src="/jums_exam/resources/jqueryui/jquery.min.js"></script>
        <script type="text/javascript" src="/jums_exam/resources/jqueryui/jquery.easyui.min.js"></script>
        <!------------End of JeasyUI Library-------------->

        <!------------Common Library-------------->
        <link rel="stylesheet" type="text/css" href="/jums_exam/resources/css/font.css">
        <link rel="stylesheet" type="text/css" href="/jums_exam/resources/css/kmr/kmr_common_color.css">
        <link rel="stylesheet" type="text/css" href="/jums_exam/resources/css/common_table_structure.css">

        <script type="text/javascript" src="/jums_exam/resources/js/disablerightclick.js"></script>
        <script type="text/javascript" src="/jums_exam/resources/js/load_frame.js"></script>                 
        <script type="text/javascript" src="/jums_exam/resources/js/jeasy_ui_common_to_all.js"></script>
        <script type="text/javascript" src="/jums_exam/resources/js/jeasy_ui_common_formatter.js"></script>
        <!------------End of Common Library-------------->   
    </head>
    <body>
        
        <table border="0" width="100%">
            <tr>
                <td align="left" width="50%">
                    <font size="2">Logged in Name: <%= student.name %></font>
                </td>
                <td align="right" width="50%">
                    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="changepassword()">Change Password</a>
                    &nbsp;&nbsp;&nbsp;
                    <a href="/jums_exam/signout.do">Sign Out</a>
                </td>
            </tr>
        </table>
        <div class="easyui-layout" style="width:100%;height:800px;">
            <div data-options="region:'north',split:true" style="height:60px;background:#eee;">
                <div id="header"></div> 
            </div>
            <div data-options="region:'south',split:true" style="height:30px;background:#eee;">
                <div id="footer"></div> 
            </div>

            <%
            let courseName = student.dept;
            if (!courseName.startsWith("B.E.") && !courseName.startsWith("B.Tech.") && !courseName.startsWith("B.Sc.")) {
                courseName = "B.E. " + courseName;
            }
            %>

            <div data-options="region:'center',title:'Student Portal'" style="background:#dafefd;">
                <table border="0" align="center" width="100%">
                    <tr>
                        <td width="40%">
                            <table border="0">
                                <tr>
                                    <td><b>Name: </b></td>
                                    <td>
                                        <%= student.name %>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td><b>Department: </b></td>
                                    <td>
                                        <%= student.dept %>
                                    </td>
                                </tr>
                                
                                
                                <tr>
                                    <td><b>Course: </b></td>
                                    <td>
                                        <%= courseName %>
                                    </td>
                                </tr>
                                


                            </table>
                        </td>

                        <td width="20%">
                            
                            <img src="/jums_exam/student_photos/<%= student.roll_no %>.jpg" width="80px" height="80px">
                        </td>
                    </tr>       
                </table>
                <hr>
                <br><br>
<!--                <center>
                    <font size="3" color="red">
                        <b>
                            For any queries related to UG Engg Convocation, please mail us at "convocation.ug.engg.2018@gmail.com"
                        </b>
                    </font>
                </center>
                <br><br>-->
                <center>
                    
                                <a href="/jums_exam/student_odd_2023/index.jsp" class="easyui-linkbutton" data-options="iconCls:'icon-exam_48',size:'large'" id="submit_button" style="width:300px;height:70px;">
                                    <font size="5"><b>Odd Semester (2022-23)</b></font>
                                </a>   
                                
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                
                                <a href="/jums_exam/student_even_2023/index.jsp" class="easyui-linkbutton" data-options="iconCls:'icon-exam_48',size:'large'" id="submit_button" style="width:300px;height:70px;">
                                    <font size="5"><b>Even Semester (2022-23)</b></font>
                                </a>   
                                    
                                <br><br><br>
                                
                                <a href="/jums_exam/student_odd_2024/index.jsp" class="easyui-linkbutton" data-options="iconCls:'icon-exam_48',size:'large'" id="submit_button" style="width:300px;height:70px;">
                                    <font size="5"><b>Odd Semester (2023-24)</b></font>
                                </a>   
                                
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                
                                <a href="/jums_exam/student_even_2024/index.jsp" class="easyui-linkbutton" data-options="iconCls:'icon-exam_48',size:'large'" id="submit_button" style="width:300px;height:70px;">
                                    <font size="5"><b>Even Semester (2023-24)</b></font>
                                </a>   
                                    
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                
                                <a href="/jums_exam/student_odd_2025/index.jsp" class="easyui-linkbutton" data-options="iconCls:'icon-exam_48',size:'large'" id="submit_button" style="width:300px;height:70px;">
                                    <font size="5"><b>Odd Semester (2024-25)</b></font>
                                </a>   
                                
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                
                                <a href="/jums_exam/student_even_2025/index.jsp" class="easyui-linkbutton" data-options="iconCls:'icon-exam_48',size:'large'" id="submit_button" style="width:300px;height:70px;">
                                    <font size="5"><b>Even Semester (2024-25)</b></font>
                                </a>   
                                    
                                <br><br><br>
                                
                                <a href="/jums_exam/student_odd_2026/index.jsp" class="easyui-linkbutton" data-options="iconCls:'icon-exam_48',size:'large'" id="submit_button" style="width:300px;height:70px;">
                                    <font size="5"><b>Odd Semester (2025-26)</b></font>
                                </a>   
                                
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                
                                <a href="/jums_exam/student_even_2026/index.jsp" class="easyui-linkbutton" data-options="iconCls:'icon-exam_48',size:'large'" id="submit_button" style="width:300px;height:70px;">
                                    <font size="5"><b>Even Semester (2025-26)</b></font>
                                </a>   
                                    
                </center>        
            </div>
        </div>
        <div id="dlgchangepass" class="easyui-dialog" title="Change Password"  data-options="iconCls:'icon-save',closed: true,maximizable:false,cache: false,resizable:true,modal:true" style="width:85%;height:600px;padding:10px;display:none">

        </div>
        <script>


            function changepassword()
            {
                $('#dlgchangepass').dialog({
                    href: '/jums_exam/admin/changepassword.jsp'
                });
                $('#dlgchangepass').dialog('open');
            }

            $('#header').load('/jums_exam/misc/header.jsp #header');
            $('#footer').load('/jums_exam/misc/footer.jsp #footer');
        </script>      

    </body>
</html>
