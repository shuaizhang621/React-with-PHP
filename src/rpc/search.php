<?php
/**
 * Created by PhpStorm.
 * User: shuaizhang
 * Date: 4/5/18
 * Time: 3:57 PM
 */

$memberId = $_POST['memberId'];
$content = $_POST['content'];

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "hw3";

class Book{
    public $bookid;
    public $booktitle;
    public $category;
    public $author;
    public $pdate;
}

function BuildBookInfo($bookid, $copyid, $booktitle, $category, $author, $publishdate)
{
    $book = new Book();
    $book->bookid=$bookid;
    $book->copyid=$copyid;
    $book->booktitle=$booktitle;
    $book->category=$category;
    $book->author=$author;
    $book->pdate=$publishdate;
    return $book;
}

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$sql1 = "DROP VIEW IF EXISTS maxcheck";
$result1 = $conn->query($sql1);

$sql2 = "CREATE VIEW maxcheck AS SELECT copyid, MAX(checkoutDate) as lastcheck FROM CheckedOut GROUP BY copyid";
$result2 = $conn->query($sql2);

if (isset($content) && !empty($content)) {
    $sql3 = "SELECT * 
             FROM Book NATURAL JOIN BookCopy
             WHERE (bookid LIKE '%$content%' OR booktitle LIKE '%$content%' 
                  OR category LIKE '%$content%' OR author LIKE '%$content%' OR publishdate LIKE '%$content%')
                  AND copyid NOT IN (SELECT copyid
                                     FROM MaxCheck NATURAL JOIN CheckedOut
                                     WHERE lastcheck = checkoutDate AND `status` = 'Holding' OR `status` = 'Overdue')";
} else {
    $sql3 = "SELECT *
            FROM BookCopy NATURAL JOIN Book
            WHERE copyid NOT IN (SELECT copyid
            FROM MaxCheck NATURAL JOIN CheckedOut
            WHERE lastcheck = checkoutDate AND `status` = 'Holding' OR `status` = 'Overdue')";  // get all book if content is empty
}

$result3 = $conn->query($sql3);

$response = array();
if ($result3->num_rows > 0) {
    while($row = $result3->fetch_assoc()) {
        $info = BuildBookInfo($row["bookid"], $row["copyid"], $row["booktitle"], $row["category"], $row["author"], $row["publishdate"]);
        array_push($response, $info);
    }
    echo json_encode($response);
} else {
    echo "[]";
}

$conn->close();

//echo json_encode(array("memberId"=>$memberId, "content"=>$content));


