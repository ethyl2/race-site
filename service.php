<?php

try {
    $db = new PDO('mysql:host=localhost;dbname=hfjq_race_info;charset=utf8', 'runner_db_user', 'runner_db_password');
    //echo "Connected <br>";

    $stmt = $db->query("SELECT first_name, last_name, gender, finish_time FROM runners ORDER BY finish_time ASC");

    $runners = array();
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
      array_push($runners, array('fname' => $row['first_name'], 'lname' => $row['last_name'], 'gender' => $row['gender'], 'time' => $row['finish_time']));
    }

    echo json_encode(array("runners" =>$runners));
}

catch (PDOException $ex) {
  echo "An error occurred: $ex";
}

?>
