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
        for(var i = 0; i < data.length; i++){
            var collection = data[i];
            html += "<div>"+collection.name+"</div> "
        }
        $("#collections").html(html);
        // alert("Data: " + data + "\nStatus: " + status);
    });
}