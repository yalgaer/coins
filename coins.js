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
        html += "<tr><th>№</th><th>Коллекции</th><th>Монет</th><th>В наличии</th></tr>";
        for(var i = 0; i < data.length; i++){
            var collection = data[i];
            html += "<tr>";
            html += "<td>";
            html += collection.pos;
            html += "</td>";
            html += '<td class="col-name" onclick="onCollectionsClicked(\'' + collection.col_id + '\')">';
            html += collection.name;
            html += "</td>";
            html += "<td>";
            html += collection.coins_count;
            html += "</td>";
            html += "<td>";
            html += collection.my_coins_count;
            html += "</td>";
            html += "</tr>";
        }
        html = html + "</table>";
        $("#collections").html(html);
        // alert("Data: " + data + "\nStatus: " + status);
    });
}
function onCollectionsClicked(colId) {
    localStorage.setItem("currentCol", colId);
    updateCoins(colId);
}
function updateCoins(colId)
{
    $.get("get-coins.php?id=" + colId, function (data) {
        var html = "";
        html += "<table>";
        html += "<tr><th>№</th><th>Наименование</th><th>Год</th><th>Двор</th><th>Фото</th><th>Наличие</th></tr>";
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
            html += "<td>";
            html += '<input class="coins-number" type="text" value="' + coins.number + '">';
            html += '<input type="submit" value="ОК">';
            html += "</td>";
            html += "</tr>";
        }
        html = html + "</table>";
        $("#coins").html(html);
        // alert("Data: " + data + "\nStatus: " + status);
    });
}

