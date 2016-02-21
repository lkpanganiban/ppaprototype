//------------Main Map Attribute---------------//
var map = L.map('map', {
    center: [10.055402736564236, 120.60791015625],
    zoom: 5,
    zoomControl: false,
    boxZoom:false
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

// add esri topo map
var Esri_WorldTopoMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
});

// add esri imagery
var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var Thunderforest_Outdoors = L.tileLayer('http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

//--------------Basemap layer calls--------------//


//------------Basemap layergroup control-------------------//

//Layergroup variable to contain all the basemap layers declared above
var baseMaps = {
    "Mapquest Aerial": MapQuestOpen_Aerial,
    "Openstreet Map": OSMlayer,
    "Open Topo Map": OpenTopoMap,
    "Esri Topo map": Esri_WorldTopoMap,
    "Esri World Imagery": Esri_WorldImagery,
    "Thunder Forest Outdoors": Thunderforest_Outdoors,
};
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

//slider was removed from the list of the needed features
// //-------------------zoomSlider--------------------//
// var zslidercontrol = L.control.zoomslider();
// zslidercontrol.addTo(map);
// //-------------------zoomSlider--------------------//

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

//reset view function
var fullE_center={ lat: 7.100892668623654, lng: 121.6845703125 };
var fextentcontrol = L.easyButton({
    id: 'fextent',
    type: 'animate',
    states: [{
        stateName: 'full extent',
        icon: 'fa-home FExicon',
        title: 'Full Extent',
        onClick: function(control) {
            map.setView([fullE_center.lat, fullE_center.lng], 4);
            map.closePopup();
        }
    }]
});
fextentcontrol.addTo(map);
//---------------------Full Extent----------------------------//

//---------------------Move History--------------------------//

//map zoom and center history tracker
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
//displays the coordinates on the lower right of the map
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

//function to execute when "go to port" button is clicked
function zoomtoPort(i) {
    map.setView([baseportdata.features[i].geometry.coordinates[1], baseportdata.features[i].geometry.coordinates[0]], 14);
    map.closePopup();
}

//initializes the port popup
var port_popup = L.popup();


var variable = []
var i = 0;

//add base ports data to the map with popup information
var basepoint = L.geoJson(baseportdata, {
    onEachFeature: function(feature, layer) {
        variable.push(feature.properties.name.toLowerCase().replace('/', '-').replace('(', '-').replace(')', '-').replace(' ', '-'))
        layer.bindPopup(
            "<b>" + feature.properties.name +
            "</b><p class='lat'>Latitude: " +
            feature.geometry.coordinates[0].toFixed(5) +
            "</p><p class='lng'>Longitude:" +
            feature.geometry.coordinates[1].toFixed(5) +
            "</p><button class='index_popups btn' id='" +
            feature.properties.name.toLowerCase().replace('/', '-').replace('(', '-').replace(')', '-').replace(' ', '-') +
            "' onClick='zoomtoPort(" + i + ")'><b>Go to this Port</b></button>");
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
//customized basemap switcher for the created sidebar
var globalbasemap = OSMlayer;
$('#basemapForm input').on('change', function() {
    var base_value = $('input[name="basemaps"]:checked', '#basemapForm').val();
    switch(base_value){
        case "topo":
            map.removeLayer(globalbasemap);
            globalbasemap = OpenTopoMap;
            map.addLayer(globalbasemap);
            break;
        case "sat":
            map.removeLayer(globalbasemap);
            globalbasemap = MapQuestOpen_Aerial;
            map.addLayer(globalbasemap);
            break;
        case "esri-topo":
            map.removeLayer(globalbasemap);
            globalbasemap = Esri_WorldTopoMap;
            map.addLayer(globalbasemap);
            break;
        case "esri-imagery":
            map.removeLayer(globalbasemap);
            globalbasemap = Esri_WorldImagery;
            map.addLayer(globalbasemap);
            break;
        case "thunder-outdoors":
            map.removeLayer(globalbasemap);
            globalbasemap = Thunderforest_Outdoors;
            map.addLayer(globalbasemap);
            break;
        default:
            map.removeLayer(globalbasemap);
            globalbasemap = OSMlayer;
            map.addLayer(globalbasemap);
    }


});
//-------------Basemap Control---------------//

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
        layer.on({click:selectFeature});
        layer.bindPopup(feature.properties.name);
    },
    style: function(feature) {
        return {
            color: "#b35806"
        };
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
        layer.bindPopup(feature.properties.name);
    },
    style: function(feature) {
        switch (feature.properties.name) {
            case 'PHASE I':
                return {
                    color: "#ff0000"
                };
            case 'PHASE II':
                return {
                    color: "#0000ff"
                };
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
        layer.on({click:selectFeature});
        layer.bindPopup(feature.properties.name);
    },
    style: function(feature) {
        return {
            color: "#1a9850"
        };
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
        layer.on({click:selectFeature});
        layer.bindPopup(feature.properties.name_type + '<br>Status:' + feature.properties.status);
    },
    // add styling to facilities layer
    style: function(feature) {
        switch (feature.properties.name_type) {
            case 'OPEN STORAGE':
                return {
                    color: "#8c510a"
                };
            case 'WAREHOUSE':
                return {
                    color: "#bf812d"
                };
            case 'MANUFACTURING PLANT':
                return {
                    color: "#dfc27d"
                };
            case 'STORAGE TANK':
                return {
                    color: "#f6e8c3"
                };
            case 'OFFICE SPACE':
                return {
                    color: "#c7eae5"
                };
            case 'PASSENGER TERMINAL':
                return {
                    color: "#80cdc1"
                };
            case 'OFFICE':
                return {
                    color: "#c7eae5"
                };
            case 'TERMINAL COMPLEX':
                return {
                    color: "#35978f"
                };
            case 'ANNEX BLDG.':
                return {
                    color: "#01665e"
                };
            case 'CONTAINER YARD':
                return {
                    color: "#fddbc7"
                };
            case 'FABRIC HOUSE':
                return {
                    color: "#fddbc7"
                };
            case 'Other':
                return {
                    color: "#bababa"
                };
        }
    }
});

//layergroup which holds all of the batangas port data layers
var batslayergroup = L.layerGroup([roads, boundary, facilities, coastline]);

//limits the highlight feature to the following layers
var batslayergroupHighlight = L.layerGroup([roads, facilities, coastline]);

//opacity variable for both fill and stroke
var batsLayersOpacity={
    fillOpacity:0.5,
    opacity:0.5
};

//apply opacity changes to both fill and stroke
batslayergroup.eachLayer(function (layer) {
    layer.setStyle(batsLayersOpacity);
});

//**--------------- Highlight Selected Feature-------------**//
var highlightStyle = {
    color: "cyan",
    stroke: true
};

//store clicked feature into a new geojson object which will be used for turf buffer
var highlightLayer;
function selectFeature(e) {
    if (highlightLayer === undefined){
        highlightLayer = e.target;
        highlightLayer.setStyle(highlightStyle);
    }else{
        batslayergroupHighlight.eachLayer(function(layer){
            layer.resetStyle(highlightLayer);
        });
        highlightLayer = e.target;
        highlightLayer.setStyle(highlightStyle);
    }
}
//**--------------- Highlight Selected Feature-------------**//


//restricts loading of the batslayergroup to when the zoom is 12 or greater
map.on("zoomend", function() {
    var currentZoom = map.getZoom();

    if (currentZoom >= 12) {
        //-------------turn on batangas sample data----------//
        if (map.hasLayer(batslayergroup) === false) {
            map.addLayer(batslayergroup);

            //-------remove disabled on the layer form-------//
            $("#layerForm").find('input').removeAttr("disabled");
            $("#layerForm").find('input').attr("checked", "checked");
            //-------remove disabled on the layer form-------//
        }
        //-------------turn on batangas sample data--------//

    } else {
        //--------turn off batangas sample data-----------//
        if (map.hasLayer(batslayergroup) === true) {
            map.removeLayer(batslayergroup);

            //-------disable the layer form-------//
            $("#layerForm").find('input').attr("disabled", "disabled")
            $("#layerForm").find('input').removeAttr("checked", "checked");
            //-------disable the layer form-------//
        }
        //--------turn off batangas sample data-----------//
    }

});
//**-------------------Batangas Data-----------------------**//

//**----------Sample Turf-Buffer Implementation--------------**//
var resultJson;

function featurebuffer() {
    var unit = 'meters';
    var buffered = turf.buffer(clickedFeature, 100, unit);
    var result = turf.featurecollection([buffered, clickedFeature]);
    if (map.hasLayer(resultJson) == true) {
        map.removeLayer(resultJson);
    }
    resultJson = L.geoJson(result, {
        style: function(feature) {
            return {
                color: 'red'
            };
        }
    }).addTo(map).bringToBack();
}
//**----------Sample Turf-Buffer Implementation--------------**//


//**-----------Sample Export Map Implementation--------------**//
document.getElementById('snap').addEventListener('click', function() {
    leafletImage(map, doImage);
});
var snapshot = document.getElementById('snapshot');

function doImage(err, canvas) {
    var img = document.createElement('img');
    var dimensions = map.getSize();
    img.width = dimensions.x / 3;
    img.height = dimensions.y / 3;
    img.src = canvas.toDataURL();
    snapshot.innerHTML = '';
    snapshot.appendChild(img);
};
//**-----------Sample Export Map Implementation--------------**//


//**------------Measure Function-------------**//
//add measure control plugin
var measurecontrol = L.control.measure({
    activeColor: "#D20B0B",
    completedColor: "#123DF5",
    primaryLengthUnit: 'meters',
    primaryAreaUnit: 'sqmeters'
});

measurecontrol.addTo(map);

$('#measurement-dropdown').on('change', function() {
    units = $('#measurement-dropdown').val();
       switch(units){
        case "meters":
            measurecontrol.options.primaryLengthUnit = 'meters';
            measurecontrol.options.primaryAreaUnit = 'sqmeters';
            break;
        case "feet":
            measurecontrol.options.primaryLengthUnit = 'feet';
            measurecontrol.options.primaryAreaUnit = 'sqfeet';
            break;
        case "kilometers":
            measurecontrol.options.primaryLengthUnit = 'kilometers';
            measurecontrol.options.primaryAreaUnit = 'hectares';
            break;
        case "miles":
            measurecontrol.options.primaryLengthUnit = 'miles';
            measurecontrol.options.primaryAreaUnit = 'acres';
            break;
        default:
            measurecontrol.options.primaryLengthUnit = 'meters';
            measurecontrol.options.primaryAreaUnit = 'sqmeters';
    }
});


function showMeasureControl() {
    measurecontrol._startMeasure();
}
//**------------Measure Function-------------**//

//**----------------layer management----------------**//
$('#roads').on('click', function(){
	if($('#roads').is(":checked") == true){
		map.addLayer(roads);
	
	}else{
		map.removeLayer(roads);
	}
})

$('#facilities').on('click', function(){
	if($('#facilities').is(":checked") == true){
		map.addLayer(facilities);
	
	}else{
		map.removeLayer(facilities);
	}
})

$('#boundary').on('click', function(){
	if($('#boundary').is(":checked") == true){
		map.addLayer(boundary);
	
	}else{
		map.removeLayer(boundary);
	}
})

$('#coastline').on('click', function(){
	if($('#coastline').is(":checked") == true){
		map.addLayer(coastline);
	
	}else{
		map.removeLayer(coastline);
	}
})
//**----------------layer management----------------**//

//**----------------Legend Container----------------**//

//**----------------Legend Container----------------**//

//**----------------Layer Opacity Control----------------**//
function updateLayerOpacity(layerObject, rangeID, rangeLabelID, defaultOp){
    if(defaultOp === undefined){
        $("#"+rangeID).on("change",function(){
            var opacity_val = $("#"+rangeID).val();
            $("#"+rangeLabelID).text(opacity_val);

            var newOpacity = parseFloat(opacity_val);

            layerObject.setStyle({opacity:newOpacity});
        });
    }else{
            var newOpacity = parseFloat(defaultOp);
            $("#"+rangeID).val(newOpacity);
            $("#"+rangeLabelID).text(newOpacity);
            layerObject.setStyle({opacity:newOpacity});
    }

}

//run the function for all the layers
map.on('zoomend',function(){

    if(map.getZoom()>=12){
        updateLayerOpacity(roads, "roadsOp","roadsOp_lbl",undefined);
        updateLayerOpacity(boundary, "boundsOp","boundsOp_lbl",undefined);
        updateLayerOpacity(coastline, "coastOp","coastOp_lbl",undefined);
        updateLayerOpacity(facilities, "faciOp","faciOp_lbl",undefined);    
    }else{}

});

//**----------------Layer Opacity Control----------------**//


$("#resetOp").on('click',function(){
    updateLayerOpacity(roads, "roadsOp","roadsOp_lbl","0.5");
    updateLayerOpacity(boundary, "boundsOp","boundsOp_lbl","0.5");
    updateLayerOpacity(coastline, "coastOp","coastOp_lbl","0.5");
    updateLayerOpacity(facilities, "faciOp","faciOp_lbl","0.5");
});


