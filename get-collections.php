<?php

//--------------------------------------------------------------------------
// Example php script for fetching data from mysql database
//--------------------------------------------------------------------------
$host = "localhost";
$user = "root";
$pass = "12345";

$databaseName = "coins";

//--------------------------------------------------------------------------
// 1) Connect to mysql database
//--------------------------------------------------------------------------
include 'DB.php';
$con = mysqli_connect($host, $user, $pass, $databaseName);
mysqli_set_charset($con,"utf8");

//--------------------------------------------------------------------------
// 2) Query database for data
//--------------------------------------------------------------------------

$result = mysqli_query($con, "SELECT * FROM collections");          //query
//$array = mysqli_fetch_row($result);                          //fetch result

$rows = array();
while($t = mysqli_fetch_assoc($result)) {
    $rows[]= $t;
}
header('Content-Type: application/json');
echo json_encode($rows, JSON_UNESCAPED_UNICODE);

//--------------------------------------------------------------------------
// 3) echo result as json
//--------------------------------------------------------------------------
//echo json_encode($array);

?>