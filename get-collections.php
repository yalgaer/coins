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
$result = mysqli_query($con, "SELECT
                                collections.*,
                                (SELECT COUNT(asset.id) FROM asset WHERE asset.col_id = collections.col_id) AS coins_count,
                                (SELECT COUNT(asset.id) FROM asset WHERE asset.type = collections.type) AS coins_count_type,
                                (SELECT COUNT(asset.id) FROM asset WHERE asset.country = collections.country) AS coins_count_country,
                                (SELECT COUNT(asset.id) FROM asset WHERE asset.col_id = collections.col_id AND asset.number !=0 ) AS my_coins_count,
                                (SELECT COUNT(asset.id) FROM asset WHERE asset.type = collections.type AND asset.number !=0 ) AS my_coins_count_type,
                                (SELECT COUNT(asset.id) FROM asset WHERE asset.col_id = collections.country AND asset.number !=0 ) AS my_coins_count_country
                              FROM collections ORDER BY collections.type, collections.country;");          //query


//$result = mysqli_query($con, "SELECT * FROM collections");          //query

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