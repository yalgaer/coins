function updateCollections(activeColId)
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
            html += '<td id="col-id-'+collection.col_id+'" class="col-name" onclick="onCollectionsClicked(\'' + collection.col_id + '\')">';
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

        if (activeColId) {
            setActiveCollection(activeColId);
        }
    });
}
function onCollectionsClicked(colId) {
    localStorage.setItem("currentCol", colId);
    setActiveCollection(colId);
}

function updateCoinsCount(coinId, value) {
    $.post("save-coins.php", {id: coinId, count: value});
}

function setActiveCollection(colId) {
    $.get("get-coins.php?id=" + colId, function (data) {

        $(".col-name").removeClass("current-col");
        $("#col-id-"+colId).addClass("current-col");

        var html = "";
        html += "<table>";
        html += "<tr><th>№</th><th>Фото</th><th>Наименование</th><th>Год</th><th>Двор</th><th>Наличие</th></tr>";
        for(var i = 0; i < data.length; i++){
            var coins = data[i];
            html += "<tr>";
            html += "<td>";
            html += coins.pos;
            html += "</td>";
            html += "</td>";
            html += "<td>";
            html += "<img src='"+coins.img+"'/>";
            html += "</td>";
            html += "<td>";
            html += coins.name;
            html += "</td>";
            html += "<td>";
            html += coins.year;
            html += "</td>";
            html += "<td>";
            html += coins.mint;
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

