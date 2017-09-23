function updateCollections(activeColId) {
    $.get("get-collections.php", function (data) {
        var html = "";
        var prevType = null;
        var prevCountry = null;
        for (var i = 0; i < data.length; i++) {
            var collection = data[i];

            if (collection.country !== prevCountry) {
                if (prevCountry !== null) {
                    html += "</div>";
                }
            }

            if (collection.type !== prevType) {
                if (prevType !== null) {
                    html += "</div>";
                }
            }

            if (collection.type !== prevType) {
                html += "<div class='col-type'>";
                html += '<div>';
                html += "<div class='col-type-name expanded-type' onclick='onTypeClicked(this)'>";
                html += tr(collection.type) +"<em> (" + collection.my_coins_count_type + "/" + collection.coins_count_type + ")</em>";
                html += "</div>";
                html += "</div>";
            }

            if (collection.country !== prevCountry) {
                html += "<div class='col-country'>";
                html += '<div>';
                html += "<div class='col-country-name collapsed-country' onclick='onCountryClicked(this)'>";
                html += tr(collection.country) + "<em> (" + collection.my_coins_count_country + "/" + collection.coins_count_country + ")</em>";
                html += "</div>";
                html += "</div>";
            }
            html += "<div>";
            html += '<div id="col-id-' + collection.col_id + '" class="col-name" style="display: none" onclick="onCollectionsClicked(\'' + collection.col_id + '\')">';
            html += collection.name + "<em> (" + collection.my_coins_count + "/" + collection.coins_count + ")</em>";
            html += "</div>";
            html += "</div>";
            prevType = collection.type;
            prevCountry = collection.country;
        }
        if (prevCountry !== null) {
            html += "</div>";
        }
        if (prevType !== null) {
            html += "</div>";
        }

        $("#collections").html(html);

        if (activeColId) {
            setActiveCollection(activeColId);
        }
    });
}
function tr(sys) {
    switch (sys){
        case "bons":
            return "Банкноты";
        case "coins":
            return "Монеты";
        case "RUS":
            return "Россия";
        case "EU":
            return "Европа";
        case "USA":
            return "Соединённые Штаты Америки";
    }
    return sys;
}

function onCollectionsClicked(colId) {
    localStorage.setItem("currentCol", colId);
    setActiveCollection(colId);
}

function onTypeClicked(catEl) {
    var $typeName = $(catEl);

    var $allCollectionNames = $(catEl).parents(".col-type").find(".col-country");
    $allCollectionNames.toggle();

    if ($allCollectionNames.is(":visible")) {
        $typeName.addClass("expanded-type");
        $typeName.removeClass("collapsed-type");
    } else {
        $typeName.addClass("collapsed-type");
        $typeName.removeClass("expanded-type");
    }
}

function onCountryClicked(catEl) {
    var $countryName = $(catEl);

    var $allCollectionNames = $(catEl).parents(".col-country").find(".col-name");
    $allCollectionNames.toggle();

    if ($allCollectionNames.is(":visible")) {
        $countryName.addClass("expanded-country");
        $countryName.removeClass("collapsed-country");
    } else {
        $countryName.addClass("collapsed-country");
        $countryName.removeClass("expanded-country");
    }

}

function updateCoinsCount(coinId, value) {
    $.post("save-coins.php", {id: coinId, count: value});
}

function setActiveCollection(colId) {
    $.get("get-coins.php?id=" + colId, function (data) {

        $(".col-name").removeClass("current-col");
        $("#col-id-" + colId).addClass("current-col");

        var html = "";
        html += "<table>";
        html += "<tr><th>№</th><th>Фото</th><th>Наименование</th><th>Год</th><th>Двор</th><th>Наличие</th></tr>";
        for (var i = 0; i < data.length; i++) {
            var coins = data[i];
            html += "<tr>";
            html += "<td class='coin-pos'>";
            html += coins.pos;
            html += "</td>";
            html += "</td>";
            html += "<td>";
            html += "<img src='" + coins.img + "'/>";
            html += "</td>";
            html += "<td class='coin-name'>";
            html += coins.name;
            html += "</td>";
            html += "<td>";
            html += coins.year;
            html += "</td>";
            html += "<td>";
            html += coins.mint;
            html += "<td class='coins-count-column'>";
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

