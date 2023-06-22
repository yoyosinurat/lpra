

var map = L.map('map', {
    center: [0.7893, 118.5213],
    zoom: 5.4,
    // attributionControl: false,
    zoomControl: false
  });


var planet = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png', {
    detectRetina: true,
    maxNativeZoom: 17
});
var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);

var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    detectRetina: true,
    maxNativeZoom: 17
});

var forestADM = L.tileLayer.wms('https://aws.simontini.id/geoserver/wms', {
        layers: '	simontini:Forest_estate_adm',
        transparent: true,
        format: 'image/png'
}).addTo(map)

var poly = L.tileLayer.wms('https://aws.simontini.id/geoserver/wms', {
    layers: 'kpa:LPRA_KPA19_JUNI_2023',
    transparent: true,
    format: 'image/png'
}).addTo(map);


var baseLayers = {
    "OpenStreetMap": osm,
    "Esri Satellite": planet,
    "Google Sattelite" : googleSat
};

var overlays = {
    "polygon desa": poly,
    "forest adm": forestADM
};

L.control.layers(baseLayers, overlays, {position: 'bottomleft'}).addTo(map);



var pruneCluster = new PruneClusterForLeaflet();

pruneCluster.BuildLeafletClusterIcon = function(cluster) {
  var e = new L.Icon.MarkerCluster();

  e.stats = cluster.stats;
  e.population = cluster.population;
  return e;
};


var colors = ['#F72C25', '#89023E', '#339989', '#0D3B66', '#F4B393'],
    pi2 = Math.PI * 2;

pruneCluster.Cluster.Size =30;
L.Icon.MarkerCluster = L.Icon.extend({
    options: {
        iconSize: new L.Point(44, 44),

    },

    createIcon: function () {
        // based on L.Icon.Canvas from shramov/leaflet-plugins (BSD licence)
        var e = document.createElement('canvas');
        this._setIconStyles(e, 'icon');
        var s = this.options.iconSize;
        e.width = s.x;
        e.height = s.y;
        this.draw(e.getContext('2d'), s.x, s.y);
        return e;
    },

    createShadow: function () {
        return null;
    },

    draw: function(canvas, width, height) {

        var lol = 0;

        var start = 0;
        for (var i = 0, l = colors.length; i < l; ++i) {

            var size = this.stats[i] / this.population;


            if (size > 0) {
                canvas.beginPath();
                canvas.moveTo(22, 22);
                canvas.fillStyle = colors[i];
                var from = start + 0.14,
                    to = start + size * pi2;

                if (to < from) {
                    from = start;
                }
                canvas.arc(22,22,22, from, to);

                start = start + size*pi2;
                canvas.lineTo(22,22);
                canvas.fill();
                canvas.closePath();
            }

        }

        canvas.beginPath();
        canvas.fillStyle = 'white';
        canvas.arc(22, 22, 18, 0, Math.PI*2);
        canvas.fill();
        canvas.closePath();

        canvas.fillStyle = '#555';
        canvas.textAlign = 'center';
        canvas.textBaseline = 'middle';
        canvas.font = 'bold 12px sans-serif';

        canvas.fillText(this.population, 22, 22, 40);
    }
});

const stylepbsaktif = `
background-color: #F72C25;
width: 1.5rem;
height: 1.5rem;
display: block;
position: relative;
top: 0.9rem;
border-radius: 3rem 3rem 0;
transform: rotate(45deg);
border: 1px solid #FFFFFF`

const stylepbnaktif = `
background-color: #89023E;
width: 1.5rem;
height: 1.5rem;
display: block;
position: relative;
top: 0.9rem;
border-radius: 3rem 3rem 0;
transform: rotate(45deg);
border: 1px solid #FFFFFF`

const stylepbnnonaktif = `
background-color: #339989;
width: 1.5rem;
height: 1.5rem;
display: block;
position: relative;
top: 0.9rem;
border-radius: 3rem 3rem 0;
transform: rotate(45deg);
border: 1px solid #FFFFFF`

const styletanahnegara = `
background-color: #0D3B66;
width: 1.5rem;
height: 1.5rem;
display: block;
position: relative;
top: 0.9rem;
border-radius: 3rem 3rem 0;
transform: rotate(45deg);
border: 1px solid #FFFFFF`

const stylepbsnonaktif = `
background-color: #F4B393;
width: 1.5rem;
height: 1.5rem;
display: block;
position: relative;
top: 0.9rem;
border-radius: 3rem 3rem 0;
transform: rotate(45deg);
border: 1px solid #FFFFFF`

const iconPbsaktif = L.divIcon({
    className: "iconPbsaktif",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
     shadowSize: [41, 41],
    html: `<span style="${stylepbsaktif}" />`
})
const iconPbnaktif = L.divIcon({
    className: "iconPbnaktif",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
     shadowSize: [41, 41],
    html: `<span style="${stylepbnaktif}" />`
})
const iconPbnnonaktif = L.divIcon({
    className: "iconPbnnonaktif",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
     shadowSize: [41, 41],
    html: `<span style="${stylepbnnonaktif}" />`
})

const iconTanahnegara = L.divIcon({
    className: "iconTanahnegara",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
     shadowSize: [41, 41],
    html: `<span style="${styletanahnegara}" />`
})

const iconPbsnonaktif = L.divIcon({
    className: "iconPbsnonaktif",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
     shadowSize: [41, 41],
    html: `<span style="${stylepbsnonaktif}" />`
})

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

String.prototype.toSlug = function (separator = "-") {
    return this
        .toString()
        .normalize('NFD')                   // split an accented letter in the base letter and the acent
        .replace(/[\u0300-\u036f]/g, '')   // remove all previously split accents
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, separator)   // remove all chars not letters, numbers and spaces (to be replaced)
        .replace(/\s+/g, separator);
};

// console.log(slugify('LPRA Buwun Mas_Lombok Barat_NTB', '-'))

const popupContent = function(data){
    return  '<div class="flex flex-col text-black w-full">'+
            ' <h1 class="text-xl font-semibold capitalize">'+data.profil+'.</h1>'+
                '<div class="mt-4 flex space-x-2"><a style="color:black" class="font-semibold"> Luas garapan:</a> <a style="color:black"> '+data.luas_ha+' ha</a></div>'+
                '<div class=" flex space-x-2"><a style="color:black" class="font-semibold">Jumlah Petani:</a> <a  style="color:black">'+data.rtpp+'</a></div>'+
                '<div class="flex space-x-2">'+
                '<a style="color:black" class="font-semibold">Penggunaan:</a> <a style="color:black">'+data.penggunaan+'.</a>'+
                '</div>'+
                    '<div class="flex space-x-2">'+
                    '<a style="color:black" class="font-semibold">Tahapan: </a> <a style="color:black">'+data.tahapan+'</a>' +
                '</div>'+
                '<div class="flex space-x-2">'+
                    '<a style="color:black" class="font-semibold">Lokasi: </a> <a style="color:black">'+data.desa.toProperCase()+', '+data.kecamatan.toProperCase()+', '+data.kabupaten.toProperCase()+', '+data.provinsi.toProperCase()+'.</a>'+
                '</div>'+
                '<div class="flex space-x-2">'+
                    '<a style="color:black" class="font-semibold">Profil: </a> <a href="'+data.profil.toSlug()+'" style="color: red">Lebih detail.</a>'+
                '</div>'+
                '</div>'+
            '</div>'
}

pruneCluster.PrepareLeafletMarker = function (marker, data, category) {


    marker.on('click', function(){
        // console.log(marker._latlng)
        map.flyTo(marker._latlng,13);
    });
    marker.setIcon(data.icon)
    if (marker.getPopup()) {
        marker.setPopupContent(data.popup);
    } else {
        marker.bindPopup(data.popup);

        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
          }else{
            marker.bindTooltip(data.popup);
          }

    }
};

var markerspbsaktif = [];
var markerspbnaktif = [];
var markerspbnnonaktif = [];
var markerspbsnonaktif = [];
var markerstanahnegara = [];



function handleJson(data) {
    selectedArea = L.geoJson(data, {
        onEachFeature: function(feature, layer) {
            if(feature.properties.profil){
                // console.log(feature.properties)
                if(feature.properties.tahapan == 'PBS aktif'){
                    const pbsaktif = new PruneCluster.Marker(feature.properties.lat, feature.properties.long, {
                        icon: iconPbsaktif,
                        tooltip: feature.properties.tahapan,
                        popup: popupContent(feature.properties),
                    });
                        pbsaktif.category = 0;
                        markerspbsaktif.push(pbsaktif);
                        pruneCluster.RegisterMarker(pbsaktif);
                }else if(feature.properties.tahapan == 'PBN aktif'){
                    const pbnaktif = new PruneCluster.Marker(feature.properties.lat, feature.properties.long, {
                        icon: iconPbnaktif,
                        tooltip: feature.properties.tahapan,
                        popup: popupContent(feature.properties)
                    });
                        pbnaktif.category = 1;
                        markerspbnaktif.push(pbnaktif);
                        pruneCluster.RegisterMarker(pbnaktif);
                }else if(feature.properties.tahapan == 'PBN nonaktif'){
                    const pbnnonaktif = new PruneCluster.Marker(feature.properties.lat, feature.properties.long, {
                        icon: iconPbnnonaktif,
                        tooltip: feature.properties.tahapan,
                        popup: popupContent(feature.properties)
                    });
                        pbnnonaktif.category = 2;
                        markerspbnnonaktif.push(pbnnonaktif);
                        pruneCluster.RegisterMarker(pbnnonaktif);
                }else if(feature.properties.tahapan == 'Tanah Negara'){
                    const tanahnegara = new PruneCluster.Marker(feature.properties.lat, feature.properties.long, {
                        icon: iconTanahnegara,
                        tooltip: feature.properties.tahapan,
                        popup: popupContent(feature.properties)
                    });
                        tanahnegara.category = 3;
                        markerstanahnegara.push(tanahnegara);
                        pruneCluster.RegisterMarker(tanahnegara);
                }else if(feature.properties.tahapan == 'PBS nonaktif'){
                    const pbsnonaktif = new PruneCluster.Marker(feature.properties.lat, feature.properties.long, {
                        icon: iconPbsnonaktif,
                        tooltip: feature.properties.tahapan,
                        popup: popupContent(feature.properties)
                    });
                        pbsnonaktif.category = 4;
                        markerspbsnonaktif.push(pbsnonaktif);
                        pruneCluster.RegisterMarker(pbsnonaktif);
                }
            }

        }
    })
    map.addLayer(pruneCluster);
}
$(document).ready(function () {
    $.ajax('https://aws.simontini.id/geoserver/wfs',{
        type: 'GET',
        data: {
          service: 'WFS',
          version: '1.1.0',
          request: 'GetFeature',
          typename: 'kpa:KPA_point',
          srsname: 'EPSG:4326',
          outputFormat: 'text/javascript',
          },
        dataType: 'jsonp',
        jsonpCallback:'callback:handleJson',
        jsonp:'format_options'
       });

      // the ajax callback function


})




function handlePBSaktif(data) {
    selectedArea = L.geoJson(data, {
        onEachFeature: function(feature, layer) {
            if(feature.properties.profil){
                // console.log(feature.properties)
                if(feature.properties.tahapan == 'PBS aktif'){
                    const pbsaktif = new PruneCluster.Marker(feature.properties.lat, feature.properties.long, {
                        icon: iconPbsaktif,
                        tooltip: feature.properties.tahapan,
                        popup: popupContent(feature.properties)
                    });
                        pbsaktif.category = 0;
                        markerspbsaktif.push(pbsaktif);
                        pruneCluster.RegisterMarker(pbsaktif);
                }
            }

        }
    })
    pruneCluster.ProcessView();
}

function handlePBNaktif(data) {
    selectedArea = L.geoJson(data, {
        onEachFeature: function(feature, layer) {
            if(feature.properties.profil){
                // console.log(feature.properties)
                if(feature.properties.tahapan == 'PBN aktif'){
                    const pbnaktif = new PruneCluster.Marker(feature.properties.lat, feature.properties.long, {
                        icon: iconPbnaktif,
                        tooltip: feature.properties.tahapan,
                        popup: popupContent(feature.properties)
                    });
                        pbnaktif.category = 1;
                        markerspbnaktif.push(pbnaktif);
                        pruneCluster.RegisterMarker(pbnaktif);
                }
            }

        }
    })
    pruneCluster.ProcessView();
}

function handlePBNnonaktif(data) {
    selectedArea = L.geoJson(data, {
        onEachFeature: function(feature, layer) {
            if(feature.properties.profil){
                // console.log(feature.properties)
                if(feature.properties.tahapan == 'PBN nonaktif'){
                    const pbnnonaktif = new PruneCluster.Marker(feature.properties.lat, feature.properties.long, {
                        icon: iconPbnnonaktif,
                        tooltip: feature.properties.tahapan,
                        popup: popupContent(feature.properties)
                    });
                        pbnnonaktif.category = 2;
                        markerspbnnonaktif.push(pbnnonaktif);
                        pruneCluster.RegisterMarker(pbnnonaktif);
                }
            }

        }
    })
    pruneCluster.ProcessView();
}

function handlePBSnonaktif(data) {
    selectedArea = L.geoJson(data, {
        onEachFeature: function(feature, layer) {
            if(feature.properties.profil){
                 // console.log(feature.properties)
                if(feature.properties.tahapan == 'PBS nonaktif'){
                    const pbsnonaktif = new PruneCluster.Marker(feature.properties.lat, feature.properties.long, {
                        icon: iconPbsnonaktif,
                        tooltip: feature.properties.tahapan,
                        popup: popupContent(feature.properties)
                    });
                        pbsnonaktif.category = 4;
                        markerspbsnonaktif.push(pbsnonaktif);
                        pruneCluster.RegisterMarker(pbsnonaktif);
                }
            }

        }
    })
    pruneCluster.ProcessView();
}

function handleTanahnegara(data) {
    selectedArea = L.geoJson(data, {
        onEachFeature: function(feature, layer) {
            if(feature.properties.profil){
                // console.log(feature.properties)
                if(feature.properties.tahapan == 'Tanah Negara'){
                    const tanahnegara = new PruneCluster.Marker(feature.properties.lat, feature.properties.long, {
                        icon: iconTanahnegara,
                        tooltip: feature.properties.tahapan,
                        popup: popupContent(feature.properties)
                    });
                        tanahnegara.category = 3;
                        markerstanahnegara.push(tanahnegara);
                        pruneCluster.RegisterMarker(tanahnegara);
                }
            }

        }
    })
    pruneCluster.ProcessView();
}



$('#pbsaktif:checkbox').on('change', function() {
    var checkbox = $(this);
    // toggle the marker

    if ($(checkbox).is(':checked')) {
        // console.log(markerspbsaktif)
        pruneCluster.RemoveMarkers(markerspbsaktif);
        $.ajax('https://aws.simontini.id/geoserver/wfs',{
        type: 'GET',
            data: {
            service: 'WFS',
            version: '1.1.0',
            request: 'GetFeature',
            typename: 'kpa:KPA_point',
            srsname: 'EPSG:4326',
            outputFormat: 'text/javascript',
            },
            dataType: 'jsonp',
            jsonpCallback:'callback:handlePBSaktif',
            jsonp:'format_options'
        });

    } else {
        console.log('remove')
        pruneCluster.RemoveMarkers(markerspbsaktif);
        pruneCluster.ProcessView();
    }
});


$('#pbnaktif:checkbox').on('change', function() {
    var checkbox = $(this);
    // toggle the marker
    if ($(checkbox).is(':checked')) {
        console.log('add')
        pruneCluster.RemoveMarkers(markerspbnaktif);
        $.ajax('https://aws.simontini.id/geoserver/wfs',{
        type: 'GET',
            data: {
            service: 'WFS',
            version: '1.1.0',
            request: 'GetFeature',
            typename: 'kpa:KPA_point',
            srsname: 'EPSG:4326',
            outputFormat: 'text/javascript',
            },
            dataType: 'jsonp',
            jsonpCallback:'callback:handlePBNaktif',
            jsonp:'format_options'
        });

    } else {
        console.log('remove')
        pruneCluster.RemoveMarkers(markerspbnaktif);
        pruneCluster.ProcessView();

    }
});

$('#pbnnonaktif:checkbox').on('change', function() {
    var checkbox = $(this);
    // toggle the marker
    if ($(checkbox).is(':checked')) {
        console.log('add')
        pruneCluster.RemoveMarkers(markerspbnnonaktif);
        $.ajax('https://aws.simontini.id/geoserver/wfs',{
        type: 'GET',
            data: {
            service: 'WFS',
            version: '1.1.0',
            request: 'GetFeature',
            typename: 'kpa:KPA_point',
            srsname: 'EPSG:4326',
            outputFormat: 'text/javascript',
            },
            dataType: 'jsonp',
            jsonpCallback:'callback:handlePBNnonaktif',
            jsonp:'format_options'
        });
    } else {
        console.log('remove')
        pruneCluster.RemoveMarkers(markerspbnnonaktif);
        pruneCluster.ProcessView();

    }
});


$('#pbsnonaktif:checkbox').on('change', function() {
    var checkbox = $(this);
    // toggle the marker
    if ($(checkbox).is(':checked')) {
        console.log('add')
        pruneCluster.RemoveMarkers(markerspbsnonaktif);
        $.ajax('https://aws.simontini.id/geoserver/wfs',{
            type: 'GET',
                data: {
                service: 'WFS',
                version: '1.1.0',
                request: 'GetFeature',
                typename: 'kpa:KPA_point',
                srsname: 'EPSG:4326',

                outputFormat: 'text/javascript',
                },
                dataType: 'jsonp',
                jsonpCallback:'callback:handlePBSnonaktif',
                jsonp:'format_options'
            });
    } else {
        console.log('remove')
        pruneCluster.RemoveMarkers(markerspbsnonaktif);
        pruneCluster.ProcessView();

    }
});

$('#tanahnegara:checkbox').on('change', function() {
    var checkbox = $(this);
    // toggle the marker
    if ($(checkbox).is(':checked')) {
        console.log('add')
        pruneCluster.RemoveMarkers(markerstanahnegara);
        $.ajax('https://aws.simontini.id/geoserver/wfs',{
            type: 'GET',
                data: {
                service: 'WFS',
                version: '1.1.0',
                request: 'GetFeature',
                typename: 'kpa:KPA_point',
                srsname: 'EPSG:4326',

                outputFormat: 'text/javascript',
                },
                dataType: 'jsonp',
                jsonpCallback:'callback:handleTanahnegara',
                jsonp:'format_options'
            });
    } else {
        console.log('remove')
        pruneCluster.RemoveMarkers(markerstanahnegara);
        pruneCluster.ProcessView();

    }
});




