<?php
/**
 * Created by PhpStorm.
 * User: shuaizhang
 * Date: 4/6/18
 * Time: 6:43 PM
 */

$mid = $_POST['mid'];
$copyid = $_POST['copyid'];


$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "hw3";

class History {
    public $copyid;
    public $checkoutDate;
    public $dueDate;
    public $status;
}

function BuildCheckHistory($row)
{
    $history = new History();
    $history->copyid=$row['copyid'];
    $history->checkoutDate=$row['checkoutDate'];
    $history->dueDate=$row['dueDate'];
    $history->status=$row['status'];
    return $history;
}

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die(json_encode(array('message' => "Connection failed: " . $conn->connect_error)));
}

$today=date("Y-m-d", strtotime("today"));
$returnTime=date("Y-m-d", strtotime("+3 Months"));

$sql1 = "INSERT INTO CheckedOut VALUES ('$copyid', '$mid', '$today', '$returnTime', 'Holding')";
$result1 = $conn->query($sql1);
if (!$result1) {
    header('HTTP/1.1 500 Internal Server Booboo');
    die("Unknown member ID, Please register.");
}

$sql2 = "SELECT *
         FROM CheckedOut
         WHERE mid = '$mid' AND status != 'Returned'";
$result2 = $conn->query($sql2);
$response = array();
if ($result2->num_rows > 0) {
    while($row = $result2->fetch_assoc()) {
        $history = BuildCheckHistory($row);
        array_push($response, $history);
    }
    echo json_encode($response);
} else {
    echo "[]";
}

$conn->close();
