//This is a Data Access Object to retrieve the student data from the database.

function getFullStudentList() {
    var studentList = new Array();
    var allStudents = module["students"];
    for (var currentStudentID in allStudents) {
        studentList.push(allStudents[currentStudentID]);
        studentList[studentList.length - 1].srn = currentStudentID;
    }
    return studentList;
}

function getStudentListByGroup (groupID) {
    var studentList = new Array();
    var allStudents = module["students"];
    for (var currentStudentID in allStudents) {
		if(allStudents[currentStudentID].allocatedGroup == groupID) {
           studentList.push(allStudents[currentStudentID]);
           studentList[studentList.length - 1].srn = currentStudentID;
        }
    }
    return studentList;
}