//обновляет число монет
function updateCoinsCount()
{
    $.get("get-coins-count.php", function (data) {
        var json = JSON.parse(data);
        $("#coins-count").html(json[0])
        // alert("Data: " + data + "\nStatus: " + status);
    });
}