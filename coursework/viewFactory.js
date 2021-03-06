/**
 * 
 * @param {*} groupID could be groupID or "all"
 * @returns HTML element source
 */
function createHTMLStudentTable (groupID) {
    var selectedStudents = getStudentListByGroup(groupID);
    var studentTableHTML = "";

    if(selectedStudents.length > 0) {
        studentTableHTML += "<h3>List of ";
        if(groupID == "all") {
            studentTableHTML += "all students";
        } else {
            studentTableHTML += "students from group &quot";
            studentTableHTML += getGroupName(groupID);
            studentTableHTML += "&quot";
        }
        studentTableHTML += " in the module &quot";
        studentTableHTML += moduleName;
        studentTableHTML += " (";
        studentTableHTML += moduleCode;
        studentTableHTML += ")&quot:</h3>";

        studentTableHTML += "<table> <thead> <tr>";
        studentTableHTML += "<th>First Name</th> <th>Last Name</th> <th>SRN</th> <th>Allocated Group</th>";
        studentTableHTML += "</tr> </thead> <tbody>";

        for(var i = 0; i < selectedStudents.length; i++) {
            var currentStudent = selectedStudents[i];

            var studentRowString = "<tr> <td>";
            studentRowString += currentStudent.firstName;
            studentRowString += "</td> <td>";
            studentRowString += currentStudent.lastName;
            studentRowString += "</td> <td>";
            studentRowString += currentStudent.srn;
            studentRowString += "</td>";
            if(getOldGroup(currentStudent.srn) != null) {
                if(currentToggle == "new") {
                    studentRowString += "<td class=new-group>";
                    studentRowString += getGroupName(currentStudent.allocatedGroup);
                } else {
                    studentRowString += "<td class=old-group>";
                    studentRowString += getGroupName(getOldGroup(currentStudent.srn));
                }
            } else {
                studentRowString += "<td>";
                studentRowString += getGroupName(currentStudent.allocatedGroup);
            }
            studentRowString += "</td> </tr>";
            studentTableHTML += studentRowString;
        }

        studentTableHTML += "</tbody> </table>";
    } else {
        studentTableHTML += "<h3>There are no students to display</h3>"; //Add bootstrap format here.
    }
    
    return studentTableHTML;
}

/**
 * @returns HTML element source
 */
function createGroupFilterDropdown() {
    var dropdownListHTML = "<option value=all>All students</option>";

    var groupList = getFullGroupList();

    if(groupList.length > 0) {
        for(var i = 0; i < groupList.length; i++) {
            var dropdownElement = "<option value=";
            dropdownElement += groupList[i].groupID;
            dropdownElement += ">";
            dropdownElement += groupList[i].name;
            dropdownElement += "</option>";
            dropdownListHTML += dropdownElement;
        } 
    } else {
        dropdownListHTML += "<h3>There are no groups to display in the dropdown list!</h3>"; //Add bootstrap format here.
    }
    return dropdownListHTML;
}

/**
 * @returns HTML element source
 */
function createGroupListDropdown() {
    var dropdownListHTML = "";

    var groupList = getFullGroupList();

    if(groupList.length > 0) {
        for(var i = 0; i < groupList.length; i++) {
            var dropdownElement = "<option value=";
            dropdownElement += groupList[i].groupID;
            dropdownElement += ">";
            dropdownElement += groupList[i].name;
            dropdownElement += "</option>";
            dropdownListHTML += dropdownElement;
        } 
    } else {
        dropdownListHTML += "<h3>There are no groups to display in the dropdown list!</h3>"; //Add bootstrap format here.
    }
    return dropdownListHTML;
}

/**
 * 
 * @param {*} groupID the groupID or "all"
 * @returns HTML element source
 */
function createStudentListDropdown(groupID) {
    var dropdownListHTML = "";
    var studentList;

    if(groupID == "all") {
        studentList = getFullStudentList();
    } else {
        studentList = getStudentListByGroup(groupID);
    }

    if(studentList.length > 0) {
        for(var i = 0; i < studentList.length; i++) {
            var dropdownElement = "<option value=";
            dropdownElement += studentList[i].srn;
            dropdownElement += ">";
            dropdownElement += studentList[i].srn;
            dropdownElement += "</option>";
            dropdownListHTML += dropdownElement;
        } 
    } else {
        dropdownListHTML += "<h3>There are no groups to display in the dropdown list!</h3>"; //Add bootstrap format here.
    }
    return dropdownListHTML;
}

/**
 * @returns HTML element source
 */
function createHTMLStudentTableError() {
    var studentTableHTMLError = "<h3>The module code or level is incorrect. Click <a href=studentDisplayFromService.php>here</a> to go back to the module selection.</h3>"; //Add bootstrap format here.
    return studentTableHTMLError;
}

/**
 * @returns HTML element source
 */
function createModifiedMessage() {
    var modifiedStudentsMessage = "<p><br><i>It seems like one or more students have been moved to a different group.<br>Their new group appears in <span class=new-group>green</span>. To check their original groups, click on the Toggle button and they will appear in <span class=old-group>red</span>.<br>If they go back to their original group, the changes will be reverted and they will appear in their default white background.<br><br>To check that no group is empty and upload the modified groups, click on the second button.</i></p>";
    return modifiedStudentsMessage;
}