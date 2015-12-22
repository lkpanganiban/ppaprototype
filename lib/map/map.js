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
        icon: 'fa-home FExicon',
        title: 'Full Extent',
        onClick: function(control) {
            map.setView([14.121, 121.5482], 5);
        }
    }]
});
fextentcontrol.addTo(map);
//---------------------Full Extent----------------------------//

//---------------------Move History--------------------------//
var movecontrol = new L.HistoryControl({
    position: "topleft",
    orientation: "vertical"
});
movecontrol.addTo(map);
//---------------------Move History--------------------------//

//-------------Scale Bar------------------//
//add control scale
var scalebar = L.control.scale();
scalebar.addTo(map);
//-------------Scale Bar------------------//

//--------------Coords map-----------------//
var coordControl = new L.Control.Coordinates({
    useDMS: true
});
coordControl.addTo(map);

//--------------Coords map-----------------//




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

function zoomtoPort(i) {
    map.setView([baseportdata.features[i].geometry.coordinates[1], baseportdata.features[i].geometry.coordinates[0]], 14)
}


var variable = []
var i = 0;
//add base ports data to the map with popup information
var basepoint = L.geoJson(baseportdata, {
    onEachFeature: function(feature, layer) {
        variable.push(feature.properties.name.toLowerCase().replace('/', '-').replace('(', '-').replace(')', '-').replace(' ', '-'))
        layer.bindPopup(
            feature.properties.name +
            "<p class='lat'>Latitude: " +
            feature.geometry.coordinates[0].toFixed(5) +
            "</p><p class='lng'>Longitude:" +
            feature.geometry.coordinates[1].toFixed(5) +
            "</p><button id='" +
            feature.properties.name.toLowerCase().replace('/', '-').replace('(', '-').replace(')', '-').replace(' ', '-') +
            "' onClick='zoomtoPort(" + i + ")'>Go to this Port</button>");
        i++;


    },
    pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, geojsonInnerMarkerOptions);
    }
}).addTo(map);

//**-------------------Sample Data-----------------**//

//**-------------------Toolbar--------------------------**//
//------------Toolbar Container-------------//
var sidebar = L.control.sidebar('sidebar', {
    position: 'right'
}).addTo(map);
//------------Toolbar Container-------------//

//-------------Basemap Control---------------//
// $("#basemap_radio").on('change',function(){
//     console.log($("#basemap_radio").find("input").val());
// })
$('#basemapForm input').on('change', function() {
    var base_value = $('input[name="basemaps"]:checked', '#basemapForm').val();
    if (base_value === "osm") {
        if (map.hasLayer(MapQuestOpen_Aerial) === true) {
            map.removeLayer(MapQuestOpen_Aerial);
        } else {
            map.removeLayer(OpenTopoMap);
        }
        map.addLayer(OSMlayer);
    } else if (base_value === "sat") {
        if (map.hasLayer(OSMlayer) === true) {
            map.removeLayer(OSMlayer);
        } else {
            map.removeLayer(OpenTopoMap);
        }
        map.addLayer(MapQuestOpen_Aerial);
    } else {
        if (map.hasLayer(OSMlayer) === true) {
            map.removeLayer(OSMlayer);
        } else {
            map.removeLayer(MapQuestOpen_Aerial);
        }
        map.addLayer(OpenTopoMap);
    }


});
//-------------Basemap Control---------------//

//------------Measure-------------//
//add measure control plugin
var measurecontrol = L.control.measure();
//measurecontrol.addTo(map);
//------------Measure-------------//





//**-------------------Toolbar--------------------------**//

//**-------------------Batangas Data-----------------------**//
//get Batangas roads data from ppa api
var roadsdata;
$.ajax({
    url: 'http://geospatialapi-lkpanganiban.rhcloud.com/ppaapi/batangasroads/',
    dataType: 'json',
    async: false,
    success: function(data) {
        roadsdata = data;
    }
});

//add roads data to the map with popup information
var roads = L.geoJson(roadsdata, {
    onEachFeature: function(feature, layer) {
        selectFeature(feature,layer);        
        layer.bindPopup(feature.properties.name);
    },
    style: function(feature){
        return {color: "#b35806"};
    }
});

//get Batangas boundary data from ppa api
var boundarydata;
$.ajax({
    url: 'http://geospatialapi-lkpanganiban.rhcloud.com/ppaapi/batangasboundary/',
    dataType: 'json',
    async: false,
    success: function(data) {
        boundarydata = data;
    }
});

//add boundary data to the map with popup information
//change styling of phase 1 and phase 2 of batangas boundary 
var boundary = L.geoJson(boundarydata, {
    onEachFeature: function(feature, layer) {
        selectFeature(feature,layer);
        layer.bindPopup(feature.properties.name);
    },
    style: function(feature) {
        switch (feature.properties.name) {
            case 'PHASE I': return {color: "#ff0000"};
            case 'PHASE II':   return {color: "#0000ff"};
        }
    }
});

//get Batangas coastline data from ppa api
var coastlinedata;
$.ajax({
    url: 'http://geospatialapi-lkpanganiban.rhcloud.com/ppaapi/batangascoastline/',
    dataType: 'json',
    async: false,
    success: function(data) {
        coastlinedata = data;
    }
});

//add boundary data to the map with popup information
//change styling of phase 1 and phase 2 of batangas boundary 
var coastline = L.geoJson(coastlinedata, {
    onEachFeature: function(feature, layer) {
        selectFeature(feature,layer);
        layer.bindPopup(feature.properties.name);
    },
    style: function(feature){
        return {color: "#1a9850"};
    }
});

//get Batangas facilities data from ppa api
var facilitiesdata;
$.ajax({
    url: 'http://geospatialapi-lkpanganiban.rhcloud.com/ppaapi/batangasfacilities/',
    dataType: 'json',
    async: false,
    success: function(data) {
        facilitiesdata = data;
    }
});

//add facilities data to the map with popup information
var facilities = L.geoJson(facilitiesdata, {
    onEachFeature: function(feature, layer) {
        selectFeature(feature,layer);
        layer.bindPopup(feature.properties.name_type + '<br>Status:' + feature.properties.status);
    },
    // add styling to facilities layer
    style: function(feature){
        switch (feature.properties.name_type) {
            case 'OPEN STORAGE': return {color: "#8c510a"};
            case 'WAREHOUSE':   return {color: "#bf812d"};
            case 'MANUFACTURING PLANT': return {color: "#dfc27d"};
            case 'STORAGE TANK': return{color: "#f6e8c3"};
            case 'OFFICE SPACE': return{color: "#c7eae5"};
            case 'PASSENGER TERMINAL': return{color: "#80cdc1"};
            case 'OFFICE': return{color: "#c7eae5"};
            case 'TERMINAL COMPLEX': return{color: "#35978f"};
            case 'ANNEX BLDG.': return{color: "#01665e"};
            case 'CONTAINER YARD': return{color: "#fddbc7"};
            case 'FABRIC HOUSE': return{color: "#fddbc7"};
            case 'Other': return{color: "#bababa"};
        }
    }
});

/*
Facilities Legend
    OPEN STORAGE': "#8c510a"
    'WAREHOUSE':   "#bf812d"
    'MANUFACTURING PLANT': "#dfc27d"
    'STORAGE TANK':"#f6e8c3"
    'OFFICE SPACE':"#c7eae5"
    'PASSENGER TERMINAL':"#80cdc1"
    'OFFICE':"#c7eae5"
    'TERMINAL COMPLEX':"#35978f"
    'ANNEX BLDG.':"#01665e"
    'CONTAINER YARD':"#fddbc7"
    'FABRIC HOUSE':"#fddbc7"
    'Other':"#bababa"
*/


var batslayergroup = L.layerGroup([roads, boundary, facilities, coastline]);

map.on("zoomend", function() {
    var currentZoom = map.getZoom();

    if (currentZoom >= 12) {
                $("#layerForm").find('input').removeAttr("disabled");
        $("#layerForm").find('input').attr("checked","checked");
        if (map.hasLayer(batslayergroup) === false) {
            map.addLayer(batslayergroup);
        }

    } else {
        if (map.hasLayer(batslayergroup) === true) {
            map.removeLayer(batslayergroup);
        }
    }
    $("#layerForm").find('input').attr("disabled","disabled")
    $("#layerForm").find('input').removeAttr("checked","checked");


});
//**-------------------Batangas Data-----------------------**//


//**--------------- Highlight Selected Feature-------------**//
var clickedFeature = {
    "type": "Feature",
    "properties": {},
      "geometry": {}
}
//store clicked feature into a new geojson object which will be used for turf buffer
function selectFeature(feature, layer){
    layer.on('click', function(e){
        clickedFeature.geometry = e.target.feature.geometry;
    });
}

//**----------Sample Turf-Buffer Implementation--------------**//
var resultJson;
function featurebuffer(){
    var unit = 'meters';
    var buffered = turf.buffer(clickedFeature, 100, unit);
    var result = turf.featurecollection([buffered, clickedFeature]);
    if (map.hasLayer(resultJson) == true){
        map.removeLayer(resultJson);
    }
    resultJson = L.geoJson(result).addTo(map).bringToBack();
}


//**-----------Sample Export Map Implementation--------------**//
document.getElementById('snap').addEventListener('click', function() {
    leafletImage(map, doImage);
});
var snapshot = document.getElementById('snapshot');
function doImage(err, canvas){
    var img = document.createElement('img');
    var dimensions = map.getSize();
    img.width = dimensions.x/3;
    img.height = dimensions.y/3;
    img.src = canvas.toDataURL();
    snapshot.innerHTML='';
    snapshot.appendChild(img);
}; 

