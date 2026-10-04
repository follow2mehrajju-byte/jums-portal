







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
                    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onClick="changepassword()">Change Password</a>
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
                                        B.E. <%= student.dept %>
                                    </td>
                                </tr>
                                


                            </table>
                        </td>
                        <td width="40%">
                            <table border="0">
                                <tr>
                                    <td><b>Class Roll No: </b></td>
                                    <td>
                                        <%= student.roll_no %>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td><b>Year: </b></td>
                                    <td>
                                        Third Year
                                    </td>
                                </tr>
                                

                                
                                <tr>
                                    <td><b>Semester: </b></td>
                                    <td>
                                        Second Semester
                                    </td>
                                </tr>
                                    
                                <tr>
                                    <td><b>Mobile: </b></td>
                                    <td>
                                        
                                        <%= student.mobile_no %>
                                    </td>
                                </tr>

                            </table>
                        </td>
                        <td width="20%">
                            
                            <img src="/jums_exam/student_photos/<%= student.roll_no %>.jpg" width="80px" height="80px">
                        </td>
                    </tr>       
                </table>
                <hr><br>
                &nbsp;&nbsp;&nbsp;&nbsp;<a href="/jums_exam/student/home.jsp" class="easyui-linkbutton" iconCls="icon-back">Back</a> 
               
               
                <center>
                
<!--                    <div id="final_year_gate_check_div">
                        <img src="/jums_exam/resources/images/new_flashing_image.gif">
                        <a href="/jums_exam/student_even_2025/ug_final_apply_for_gate_2019.jsp" target="_blank">
                            <font size="3">
                                Click here if you have applied for GATE 2019
                            </font>    
                        </a>                        
                    </div>-->
                   
                    

                <br><div class="easyui-panel" title="Report Query / Issue - <font color=red>Related to Even Semester, 2025 Form-Fill Up only</font>" style="width: 90%;height:auto;" data-options="iconCls:'icon-tip',
                     collapsible:true, collapsed:true">
                    <br>
                    <center>
                        <form name="report_issue_form" id="report_issue_form" method="post">
                        <div id="report_issue_div">
                                <br>
                                <table border="0" width="100%" align="center">
                                    <tr align="center">
                                        <td align="center" width="50%">
                                            <b>Query / Issue Type 
                                                <br><font color="red">
                                                    (Related to Even Semester, 2025 Form-Fill Up only)</font>
                                                : </b>    
                                            <select name="query_type" id="query_type" class="easyui-combobox" data-options="required:true, panelHeight:'100px', editable:false">
                                                <option value="">---Select---</option>
                                                <option value="Problem in Subjects">Problem in Subjects</option>
                                                <option value="Problem in Back Papers">Problem in Back Papers</option>
                                                <option value="Problem in Exam Fees">Problem in Exam Fees</option>
                                                <option value="Problem in Admit Card">Problem in Admit Card</option>
                                                <option value="Others">Others</option>
                                            </select>
                                        </td>
                                        <td align="center" width="50%">
                                            <b>Mobile No.: </b>
                                            <input class="easyui-numberbox" name="query_mobile_no" id="query_mobile_no" data-options="required:true, validType:['minLength[10]','maxLength[10]']">
                                        </td>    
                                    </tr>
                                    <tr>
                                        <td colspan="2">&nbsp;</td>
                                    </tr>
                                    <tr align="center">
                                        <td colspan="2">
                                            <b>State your Problem (Optional): </b>
                                            <input class="easyui-textbox" multiline="true" name="query_report_issue" id="query_report_issue" style="width:500px;height:120px" data-options="required:true, validType:['maxLength[2000]']">
                                        </td>                                        
                                    </tr>
                                </table> 
                                <br>
                                <center>
                                    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-save" id="report_issue_submit_button" onClick="submit_report_issue()">Submit Query/Issue</a>                
                                </center>  
                                
                                
                                
                                
                        </div>
                            <input type="hidden" name="jums_student_details_final_id" value="281">
                        </form>    
                    </center>   
                    <br><br>
                </div>
                    
                    <script>
                        function submit_report_issue()
                        {
                            $('#report_issue_form').form('submit', {
                            onSubmit: function () {
                                var f = this;
                                var opts = $.data(this, 'form').options;
                                if ($(this).form('validate') == false) {
                                    return false;
                                }
                                
                                if($('#query_type').combobox('getValue')=='')
                                {
                                    $.messager.alert('Error','Please enter Query / Issue Type');
                                    return false;
                                }

                                $.messager.confirm('Confirm', 'Are you sure, you want to submit the Query / Issue?', function (r) {
                                    if (r) {
                                        $('#report_issue_submit_button').linkbutton('disable');
                                        document.report_issue_form.action = "/jums_exam/insert_student_query_issue_even_2025.do";
                                        document.report_issue_form.submit();
                                    }
                                });
                                return false;
                            }
                        });
                        }
                        function check_report_issue()
                        {   
                            document.getElementById('report_issue_div').style.display="";   
                            $('#report_issue_inner_div').panel();
                            $('#report_issue_inner_div').panel('open');
                            $("#report_issue").textbox({
                                required: true,
                                validType: 'length[10,5000]'
                              });
                        }
                    </script>    
                </center>
                <br><br>
                <form name="exam_fees" id="exam_fees" method="post">
                    
                <br>                        
                
                </form>
                
                

                
                
                
                <div class="dynamic_table">    
                    <table style="width:100%;height:auto; border-collapse: collapse;" border="1">
                        <thead>
                            <tr>
                                <th colspan="12" style="background-color: #dafefd; padding: 5px;"><b>Admit Card(s)</b></th>
                            </tr>  
                            <tr style="background-color: #dafefd; font-size: 12px;">                                       
                                <th style="text-align: center; padding: 5px;" width="4%"><b>Sl. No.</b></th>
                                <th style="text-align: center; padding: 5px;" width="10%"><b>Year - Semester</b></th>
                                <th style="text-align: center; padding: 5px;" width="8%"><b>Exam Roll No.</b></th>
                                <th style="text-align: center; padding: 5px;" width="8%"><b>View / Print Admit Card</b></th>
                                <th style="text-align: center; padding: 5px;" width="10%"><b>Course Completion Certificate</b></th>
                                <th style="text-align: center; padding: 5px;" width="10%"><b>Semester Grade Card</b></th>
                                <th style="text-align: center; padding: 5px;" width="10%"><b>Review / Provisional Pass Certificate</b></th>
                                <th style="text-align: center; padding: 5px;" width="8%"><b>Review Payment</b></th>
                                <th style="text-align: center; padding: 5px;" width="8%"><b>Supplementary Exam</b></th>
                                <th style="text-align: center; padding: 5px;" width="8%"><b>Supplementary Exam Payment</b></th>
                                <th style="text-align: center; padding: 5px;" width="8%"><b>Supplementary Admit Card</b></th>
                                <th style="text-align: center; padding: 5px;" width="8%"><b>Supplementary Grade Card</b></th>
                            </tr>
                        </thead>
                        <tbody style="background-color: white; font-size: 12px;">
                        <tr>
                            <td align="center" style="padding: 5px;">1.</td>
                            <td align="left" style="padding: 5px;">For <%= semInfo.yearText %> <%= semInfo.semText %></td>
                            <td align="left" style="padding: 5px;"><%= semInfo.examRoll %></td>
                            <td align="center" style="padding: 5px;">
                                <a target="admit_card_window" href="/jums_exam/<%= semDir %>/view_print_admit_card.jsp?exam_roll=<%= semInfo.examRoll %>">View / Print</a>
                            </td> 
                            <td align="center" style="padding: 5px;">
                                <% if (semInfo.isFinalSem) { %>
                                    <a target="_blank" href="/jums_exam/<%= semDir %>/course_completion_certificate.jsp?exam_roll=<%= semInfo.examRoll %>">View/Print Course Completion Certificate</a>
                                <% } %>
                            </td>
                            <td align="center" style="padding: 5px;">
                                <% if (semInfo.hasGradeCard) { %>
                                    <a target="result_window" href="/jums_exam/<%= semDir %>/result/view_print_result_be.jsp?exam_roll=<%= semInfo.examRoll %>">View Grade Card</a>  
                                <% } else { %>
                                    
                                <% } %>
                            </td>
                            <td align="center" style="padding: 5px;"></td>
                            <td align="center" style="padding: 5px;"></td>
                            <td align="center" style="padding: 5px;"></td>
                            <td align="center" style="padding: 5px;"></td>
                            <td align="center" style="padding: 5px;"></td>
                            <td align="center" style="padding: 5px;"></td>
                        </tr>    
                        </tbody>
                    </table>    
                </div>


  
                <br><br>
                
                

                


            </div>
        </div>
        <div id="dlgchangepass" class="easyui-dialog" title="Change Password"  data-options="iconCls:'icon-save',closed: true,maximizable:false,cache: false,resizable:true,modal:true" style="width:85%;height:600px;padding:10px;display:none">

        </div>
        <script>
            function submit_exam_fees()
            {
                var email = jQuery("#email").val();
                var mobile = jQuery("#mobile").val();
                var abcid = jQuery("#abcid").val();
                if(email == "") {
                   $.messager.alert('Warning', 'Updated Email Id must be provided.');
                   return false;
                }
                if(mobile == "") {
                   $.messager.alert('Warning', 'Updated Mobile No must be provided.');
                   return false;
                }
                if(abcid == "") {
                   $.messager.alert('Warning', 'Updated ABC ID must be provided.');
                   return false;
                }
                $('#exam_fees').form('submit', {
                    onSubmit: function () {
                        var f = this;
                        var opts = $.data(this, 'form').options;
                        if ($(this).form('validate') == false) {
                            $.messager.alert('Warning', 'Please select/enter all mandatory data in order to continue.')
                            return false;
                        }
                        var current_course_yr_sem = "BCHECBE32";
                        if (current_course_yr_sem.indexOf("MPHA") != -1 && current_course_yr_sem.indexOf("12") != -1) {
                            var counter = 0;
                            for (var itr = 0; itr < document.getElementsByName('pg_pharmacy_checked_subjects').length; itr++)
                            {
                                if (document.getElementsByName('pg_pharmacy_checked_subjects')[itr].checked == true)
                                    counter++;
                            }
                            if (counter != 4)
                            {
                                $.messager.alert('Warning', 'Please select 4 subjects.');
                                return false;
                            }
                        }


                        $.messager.confirm('Confirm', 'Are you sure?', function (r) {
                            if (r) {

                                $('#submit_button').linkbutton('disable');
                                document.exam_fees.action = "/jums_exam/insert_student_exam_fees_details_even_2025.do";
                                document.exam_fees.submit();
                            }
                        });
                        return false;
                    }
                });
            }

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
