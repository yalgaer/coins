function updateCollections(activeColId) {
    $.get("get-collections.php", function (data) {
        var html = "";
        var prevType = null;
        var prevRegion = null;
        var prevCountry = null;
        for (var i = 0; i < data.length; i++) {
            var collection = data[i];

            /* if (collection.type !== prevType) {
                 if (prevType !== null) {
                     html += "</div>";
                 }
             }*/
            if (collection.region !== prevRegion) {
                if (prevRegion !== null) {
                    html += "</div>";
                }
            }
            if (collection.country !== prevCountry) {
                if (prevCountry !== null) {
                    html += "</div>";
                }
            }

            /* if (collection.type !== prevType) {
                 html += "<div class='col-type'>";
                 html += '<div>';
                 html += "<div class='col-type-name expanded-type' onclick='onTypeClicked(this)'>";
                 html += tr(collection.type);
                 html += "</div>";
                 html += "</div>";
             }*/

            if (collection.region !== prevRegion) {
                html += "<div class='col-region'>";
                html += "<div class='col-region-name collapsed-region' onclick='onRegionClicked(this)'>";
                html += tr(collection.region);
                html += "</div>";
            }

            if (collection.country !== prevCountry) {
                html += "<div class='col-country' style='display: none;`'>";
                html += "<div class='col-country-name collapsed-country' onclick='onCountryClicked(this)'>";
                html += tr(collection.country);
                html += "</div>";
            }
            html += '<div id="col-id-' + collection.col_id + '" class="col-name" style="display: none" onclick="onCollectionsClicked(\'' + collection.col_id + '\')">';
            html += collection.name + "<em> (" + collection.my_coins_count + "/" + collection.coins_count + ")</em>";
            html += "</div>";
            prevType = collection.type;
            prevRegion = collection.region;
            prevCountry = collection.country;
        }
        if (prevCountry !== null) {
            html += "</div>";
        }
        if (prevRegion !== null) {
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

function onCollectionsClicked(colId) {
    localStorage.setItem("currentCol", colId);
    setActiveCollection(colId);
}

function onTypeClicked(typeEl) {
    var $type = $(typeEl);

    var $allRegions = $type.parents(".col-type").find(".col-region");
    $allRegions.toggle();

    if ($allRegions.is(":visible")) {
        $type.addClass("expanded-type");
        $type.removeClass("collapsed-type");
    } else {
        $type.addClass("collapsed-type");
        $type.removeClass("expanded-type");
    }
}


$(document).on("input", function (ev) {
    console.log($(ev.target).val());
});


$(document).ready(function () {
    $('#searchf').on('keyup input', function () {
        var $allRegions = $('.col-region');
        var $allCountries = $('.col-country');
        var $allCollections = $('.col-name');
        var lcValue = this.value.toLowerCase();
        if (lcValue === '') {
            $allRegions.show();
            $allCountries.hide();
            $allCollections.hide();
            return;
        }
        $allRegions.hide();
        $allCountries.hide();
        $allCollections.hide();

        var filterFn = function (idx, element) {
            return element.textContent.toLowerCase().indexOf(lcValue) >= 0;
        };

        // 1
        var $regionsToShow = $allRegions.find('.col-region-name').filter(filterFn).parents('.col-region');
        $regionsToShow.show();
        $regionsToShow.find('.col-country').show();

        // 2
        var $countriesToShow = $allCountries.find('.col-country-name').filter(filterFn).parents('.col-country');
        $countriesToShow.show();
        $countriesToShow.parents(".col-region").show();
        $countriesToShow.find('.col-name').show();

        // 3
        var $collectionsToShow = $allCollections.filter(filterFn);
        $collectionsToShow.show();
        $collectionsToShow.parents(".col-country").show();
        $collectionsToShow.parents(".col-region").show();

    });
});

function onImageClick(img) {	// Событие клика на маленькое изображение
    var $img = $(img);	// Получаем изображение, на которое кликнули
    var src = $img.attr('src'); // Достаем из этого изображения путь до картинки
    $("body").append("<div class='popup'>" + //Добавляем в тело документа разметку всплывающего окна
        "<div class='popup_bg'></div>" + // Блок, который будет служить фоном затемненным
        "<img src='" + src + "' class='popup_img' />" + // Само увеличенное фото
        "</div>");
    $(".popup").fadeIn(300); // Медленно выводим изображение
    $(".popup_bg").click(function () {	// Событие клика на затемненный фон
        $(".popup").fadeOut(300);	// Медленно убираем всплывающее окно
        setTimeout(function () {	// Выставляем таймер
            $(".popup").remove(); // Удаляем разметку всплывающего окна
        }, 400);
    });
}

function onRegionClicked(regionEl) {
    var $region = $(regionEl);

    var $allCountries = $(regionEl).parents(".col-region").find(".col-country");
    $allCountries.toggle();

    if ($allCountries.is(":visible")) {
        $region.addClass("expanded-region");
        $region.removeClass("collapsed-region");
    } else {
        $region.addClass("collapsed-region");
        $region.removeClass("expanded-region");
    }

}

function onCountryClicked(countryEl) {
    var $country = $(countryEl);

    var $allCollections = $(countryEl).parents(".col-country").find(".col-name");
    $allCollections.toggle();

    if ($allCollections.is(":visible")) {
        $country.addClass("expanded-country");
        $country.removeClass("collapsed-country");
    } else {
        $country.addClass("collapsed-country");
        $country.removeClass("expanded-country");
    }

}


function updateCoinsCount(coinId, value) {
    $.post("save-coins.php", {id: coinId, count: value});
    var numberClass = value <= 0 ? "coins-number coins-number-0" : "coins-number";
    $("#coin-card-" + coinId + " .card-input input").attr("class", numberClass);

}

function setActiveCollection(colId) {
    $.get("get-coins.php?id=" + colId, function (data) {

        $(".col-name").removeClass("current-col");
        $("#col-id-" + colId).addClass("current-col");

        var html = "";
        html += "<div>";
        for (var i = 0; i < data.length; i++) {
            var coin = data[i];
            var cardTypeClass = coin.type === "bons" ? "bons-card" : "coins-card";
            var numberClass = coin.number === "0" ? "coins-number coins-number-0" : "coins-number";
            html += "<div id='coin-card-" + coin.id + "' class='card " + cardTypeClass + "'>";
            html += "<div><img class='image' src='" + coin.img + "' onclick='onImageClick(this)'/></div>";
            html += "<div class='card-year'>" + coin.year + "</div>";
            html += "<div class='card-mint'>" + coin.mint + "</div>";
            html += "<div class='card-name'>" + coin.name + "</div>";
            html += '<div class="card-input"><input class="' + numberClass + '"  onClick="this.select()" onchange="updateCoinsCount(' + coin.id + ', this.value); this.blur()" ' +
                'value="' + coin.number + '"></div>';
            html += "<span style='font-weight: 700;\n'>" + "шт." + "</span>";
            html += "</div>";
        }
        html = html + "</div>";
        $("#coins").html(html);
        // alert("Data: " + data + "\nStatus: " + status);
    });
}

