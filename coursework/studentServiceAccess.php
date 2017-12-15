<?php
	function get_students_from_group() {
		$levelInput = "Error";
		$codeInput = "Error"; //Throw exceptions.

		if (isset($_GET['levelInput'])) $levelInput=$_GET['levelInput'];
		if (isset($_GET['codeInput'])) $codeInput=$_GET['codeInput'];

		$url = "http://homepages.herts.ac.uk/%7Ecomqgrs/ads/moduleGroups.php?moduleCode=";
		$fullURL = $url.$levelInput."com".$codeInput; //Concatenates strings together
		$json = file_get_contents($fullURL);

		return $json;
	}
?>

<html>
<head>
    <meta charset=UTF-8>
	<title>Student groups</title>
	<link rel="stylesheet" type="text/css" href="style.css">
</head>

<body>
	<a href="studentDisplayDynamical.php">Go back!</a> <!-- Why does this not work properly? -->
	<div id="studentTableDiv"> </div> <!-- Where the list of students or result will be shown -->

	<script type="text/javascript" src="studentViewFactory.js"></script>
	<script type="text/javascript" src="studentListTransfer.js"></script>
	<script type="text/javascript" src="studentViewManager.js"></script>
	<script type="text/javascript">
		window.onload = function() {
			moduleStudentList = JSON.parse(<?php echo json_encode(get_students_from_group()) ;?>);
			origin = "service";
			setHTMLStudentTable("all");
		};
	</script>
</body>
</html>