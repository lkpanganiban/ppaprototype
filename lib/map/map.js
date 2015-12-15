//------------Main Map Attribute---------------//
var map = L.map('map', {
    center: [14.121, 121.5482],
    zoom: 5,
    zoomControl: false
});

//------------Main Map Attribute---------------//

//--------------Basemap layer calls--------------//
//add osm layer to the map
var OSMlayer = L.tileLayer('http://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    minZoom: 3
}).addTo(map);

//add mapquest open satellite
var MapQuestOpen_Aerial = L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.{ext}', {
    type: 'sat',
    ext: 'jpg',
    attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency',
    subdomains: '1234'
});

//add opentopo map
var OpenTopoMap = L.tileLayer('http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 16,
    attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
//--------------Basemap layer calls--------------//


//------------Basemap layergroup control-------------------//
var baseMaps = {
    "Mapquest Aerial": MapQuestOpen_Aerial,
    "Openstreet Map": OSMlayer,
    "Open Topo Map": OpenTopoMap
};
//------------Basemap layergroup control-------------------//

//adds the basemap control to the map
// var basemapcontrol = L.control.layers(baseMaps);
// basemapcontrol.addTo(map);
//------------Basemap layergroup control-------------------//


//**-------------------Navigation Controls------------------------**//

//---------------North Arrow---------------//
var north = L.control({
    position: "topleft"
});
north.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    div.innerHTML = '<img src="img/nArrow.png" style="width:50px;height:50px;">';
    return div;
}

north.addTo(map);
//---------------North Arrow---------------// 

//-------------------zoomSlider--------------------//
var zslidercontrol = L.control.zoomslider();
zslidercontrol.addTo(map);
//-------------------zoomSlider--------------------//

//-------------------zoom buttons-------------------//
var nativeButtons = L.control.zoom({
    position: 'topleft'
});
nativeButtons.addTo(map);
//-------------------zoom buttons-------------------//

//-------------------Box Zoom----------------------//
//add zoombox control plugin
var zboxcontrol = L.control.zoomBox({
    modal: true, // If false (default), it deactivates after each use.  
    // If true, zoomBox control stays active until you click on the control to deactivate.
    // position: "topleft",                  
    // className: "customClass"  // Class to use to provide icon instead of Font Awesome
});
map.addControl(zboxcontrol);
//-------------------Box Zoom----------------------//

//---------------------Full Extent----------------------------//
var fextentcontrol = L.easyButton({
  id: 'fextent',
  type: 'animate',
  states: [{
    stateName: 'full extent',
    icon: 'fa-globe FExicon',
    title: 'Full Extent',
    onClick: function(control) {
    	map.setView([14.121, 121.5482], 5);
    }
  }]
});
fextentcontrol.addTo(map);
//---------------------Full Extent----------------------------//

//---------------------Move History--------------------------//
var movecontrol= new L.HistoryControl({
	position:"topleft",
	orientation:"vertical"
});
movecontrol.addTo(map);
//---------------------Move History--------------------------//

//-------------Scale Bar------------------//
//add control scale
var scalebar = L.control.scale();
scalebar.addTo(map);
//-------------Scale Bar------------------//

//**-------------------Navigation------------------------**//

//**-------------------Sample Data-----------------**//

//load PPA sample data from geospatialapi
//get base ports data from ppa api
var baseportdata;
$.ajax({
    url: 'http://geospatialapi-lkpanganiban.rhcloud.com/ppaapi/baseports/',
    dataType: 'json',
    async: false,
    success: function(data) {
        baseportdata = data;
    }
});

//markerStyle
var geojsonInnerMarkerOptions = {
    radius: 5,
    fillColor: "#000",
    color: "#FFA726",
    weight: 10,
    opacity: 0.5,
    fillOpacity: 1,
};


//add base ports data to the map with popup information
var basepoint = L.geoJson(baseportdata, {
    onEachFeature: function(feature, layer) {
        layer.bindPopup(feature.properties.name + "<br>Latitude: " + feature.geometry.coordinates[0].toFixed(5) + "<br>Longitude:" + feature.geometry.coordinates[1].toFixed(5) + '<br><a href="' + feature.properties.name.toLowerCase() + '.html">Go to this Port</a>');
    },
    pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, geojsonInnerMarkerOptions);
    }
}).addTo(map);

//**-------------------Sample Data-----------------**//

//**-------------------Toolbar--------------------------**//

//------------Measure-------------//
//add measure control plugin
var measurecontrol = L.control.measure();
measurecontrol.addTo(map);
//------------Measure-------------//

var sidebar = L.control.sidebar('sidebar',{
    position:'right'
}).addTo(map);


//**-------------------Toolbar--------------------------**//

