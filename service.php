<?php

try {
    $db = new PDO('mysql:host=localhost;dbname=hfjq_race_info;charset=utf8', 'runner_db_user', 'runner_db_password');
    echo "Connected <br>";

    $stmt = $db->query("SELECT first_name, last_name, gender, finish_time FROM runners ORDER BY finish_time ASC");
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo $row['first_name'];
        echo " ";
        echo $row['last_name'];
        echo " ";
        echo $row['gender'];
        echo " ";
        echo $row['finish_time'];
        echo "<br>";
    }
}

catch (PDOException $ex) {
  echo "An error occurred: $ex";
}

?>
