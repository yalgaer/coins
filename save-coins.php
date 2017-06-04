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
$coinsCount = $_GET["count"];
$id = $_GET["id"];

$result = mysqli_query($con, "UPDATE asset SET number = " . $coinsCount . " WHERE id = " . $id);          //query

?>