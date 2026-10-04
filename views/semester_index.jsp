<%
let courseName = student.dept;
if (!courseName.startsWith("B.E.") && !courseName.startsWith("B.Tech.") && !courseName.startsWith("B.Sc.")) {
    courseName = "B.E. " + courseName;
}
%>
<%- include('semester_index_' + semDir + '.jsp', { student: student, semInfo: semInfo, courseName: courseName }) %>
