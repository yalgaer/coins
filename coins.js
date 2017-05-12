//обновляет число монет
function updateCoinsCount()
{
    $.get("get-coins-count.php", function (data) {
        var json = JSON.parse(data);
        $("#coins-count").html(json[0])
        // alert("Data: " + data + "\nStatus: " + status);
    });
}
function updateCollections()
{
    $.get("get-collections.php", function (data) {
        var html = "";
        html += "<table>";
        html += "<tr><th>Коллекции</th></tr>";
        for(var i = 0; i < data.length; i++){
            html += "<tr>";
            html += "<td>";
            var collection = data[i];
            html += collection.name;
            html += "</td>";
            html += "</tr>";
        }
        html = html + "</table>";
        $("#collections").html(html);
        // alert("Data: " + data + "\nStatus: " + status);
    });
}
function updateCoins()
{
    $.get("get-coins.php", function (data) {
        var html = "";
        html += "<table>";
        html += "<tr><th>№</th><th>Наименование</th><th>Год</th><th>Двор</th><th>Фото</th></tr>";
        for(var i = 0; i < data.length; i++){
            var coins = data[i];
            html += "<tr>";
            html += "<td>";
            html += coins.pos;
            html += "</td>";
            html += "<td>";
            html += coins.name;
            html += "</td>";
            html += "<td>";
            html += coins.year;
            html += "</td>";
            html += "<td>";
            html += coins.mint;
            html += "</td>";
            html += "<td>";
            html += "<img src='"+coins.img+"'/>";
            html += "</td>";
            html += "</tr>";
        }
        html = html + "</table>";
        $("#coins").html(html);
        // alert("Data: " + data + "\nStatus: " + status);
    });
}