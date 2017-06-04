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

function updateCoinsCount(coinId, value) {
    $.get("save-coins.php?id=" + coinId + "&count=" + value);
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
            html += '<input class="coins-number"  onClick="this.select()" onchange="updateCoinsCount(' + coins.id + ', this.value); this.blur()" ' +
                'value="' + coins.number + '">';
            html += "</td>";
            html += "</tr>";
        }
        html = html + "</table>";
        $("#coins").html(html);
        // alert("Data: " + data + "\nStatus: " + status);
    });
}

