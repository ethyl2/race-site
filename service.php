<?php

try {
    $db = new PDO('mysql:host=localhost;dbname=hfjq_race_info;charset=utf8', 'runner_db_user', 'runner_db_password');
    "Connected <br>";
}

catch (PDOException $ex) {
      echo "An error occurred: $ex";
}

if($_POST){
  if ($_POST['action'] == 'addRunner') {
    // Data sanitation
    $fname = htmlspecialchars($_POST["txtFirstName"]);
    $lname = htmlspecialchars($_POST["txtLastName"]);
    $gender = htmlspecialchars($_POST["ddlGender"]);
    $minutes = htmlspecialchars($_POST["txtMinutes"]);
    $seconds = htmlspecialchars($_POST["txtSeconds"]);

    // Data validation
    if(preg_match('/[^\w\s]/i', $fname) || preg_match('/[^\w\s]/i', $lname)) {
			fail('Invalid name provided.');
		}

    if( empty($fname) || empty($lname) ) {
			fail('Please enter a first and last name.');
		}
		if( empty($gender) ) {
			fail('Please select a gender.');
		}
		if( empty($minutes) || empty($seconds) ) {
			fail('Please enter minutes and seconds.');
		}

    $time = $minutes.":".$seconds;
    $query = "INSERT INTO runners SET first_name='$fname', last_name='$lname', gender='$gender', finish_time='$time'";

    $result = $db->exec($query);


    if ($result) {
      $msg = "Runner: ".$fname." ".$lname." added successfully";
      success($msg);
    } else {
      fail("Insert failed.");
    }
    exit;

  }
}

if($_GET){
  if ($_GET['action'] == "getRunners") {
    $stmt = $db->query("SELECT first_name, last_name, gender, finish_time FROM runners ORDER BY finish_time ASC");

    $runners = array();
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
      array_push($runners, array('fname' => $row['first_name'], 'lname' => $row['last_name'], 'gender' => $row['gender'], 'time' => $row['finish_time']));
    }

    echo json_encode(array("runners" => $runners));
    exit;
  }
}

function fail($message) {
  die(json_encode(array('status' => 'fail', 'message' => $message)));
}
function success($message) {
  die(json_encode(array('status' => 'success', 'message' => $message)));
}

?>
