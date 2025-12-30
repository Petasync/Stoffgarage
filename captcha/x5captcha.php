<?php
include("../res/x5engine.php");
$nameList = array("tjr","z5n","63l","44e","dep","pjs","msx","mdw","77j","488");
$charList = array("F","S","T","A","W","W","X","M","L","R");
$cpt = new X5Captcha($nameList, $charList);
//Check Captcha
if ($_GET["action"] == "check")
	echo $cpt->check($_GET["code"], $_GET["ans"]);
//Show Captcha chars
else if ($_GET["action"] == "show")
	echo $cpt->show($_GET['code']);
// End of file x5captcha.php
