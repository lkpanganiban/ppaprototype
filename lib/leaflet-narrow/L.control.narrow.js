var north = L.control({position: "topleft"});
north.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    div.innerHTML = '<img src="img/nArrow.png" style="width:50px;height:50px;">';
    return div;
}