// The name of this file is map.js
// The function of this file is to display the map in index.html and the relevant details on the map in index.html
// Written by Tan Jin Chun
// Last Modified : 5/3/2021

"use strict"

// The access token for mapbox
mapboxgl.accessToken = "pk.eyJ1IjoibmlnZWx0YW4iLCJhIjoiY2tvM283ZXloMGF1MzJwczJrenNvYmNmcyJ9.csNssJZ0RWGyAOrIBSRM4Q";

// Creating a new map
let map = new mapboxgl.Map(
    {
        container: "map",
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [101.7117611, 3.1579911], // Coordinates of KL
        zoom: 16
    });

// Add geolocate control to the map (Locate the user's current position)
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    })
);

// Map control (Full Screen and Zooming in and out function)
map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
map.addControl(new mapboxgl.FullscreenControl(), 'bottom-right');

// The directions of the location functions
let directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: 'metric',
    profile: 'mapbox/driving',
});

map.addControl(directions, 'top-left');

// Geocoding (Using mapbox geocoding)
let geocoder = new MapboxGeocoder({
    // Initialize the geocoder
    accessToken: mapboxgl.accessToken, // Set the access token
    mapboxgl: mapboxgl, // Set the mapbox-gl instance
    marker: false, // Do not use the default marker style
    placeholder: '      Search for places in Malaysia \uD83C\uDDF2\uD83C\uDDFE', // Placeholder text for the search bar
    bbox: [100.085756871, 0.773131415201, 119.181903925, 6.92805288332], // Boundary for Malaysia
    proximity: {
        longitude: 101.7117611,
        latitude: 3.1579911
    } // Coordinates for Kuala Lumpur 
});

// Add the geocoder to the map
map.addControl(geocoder);

// After the map style has loaded on the page, add a source layer and default styling for a single point
map.on('load', function () {
    map.addSource('single-point', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': []
        }
    });

    map.addLayer({
        'id': 'point',
        'source': 'single-point',
        'type': 'circle',
        'paint': {
            'circle-radius': 10,
            'circle-color': '#448ee4'
        }
    });

    // Listen for the `result` event from the Geocoder // `result` event is triggered when a user makes a selection
    //  Add a marker at the result's coordinates
    geocoder.on('result', function (e) {
        map.getSource('single-point').setData(e.result.geometry);
    });
});

// Adding a popup to show the user the current location in coordinates
map.on('style.load', function () {
    map.on('click', function (e) {
        var coordinates = e.lngLat;
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML('Your Coordinates Here :  <br/>' + coordinates)
            .addTo(map);
    });
});

// Displaying the current coordinates that is clicked in the textbox
geocoder.on('result', function (r) {
    console.log(r);
    document.getElementById("addLocation").innerHTML = r.result.center;
})

// Adding a new marker
let marker = new mapboxgl.Marker({
    draggable: true
})
    .setLngLat([101.7117611, 3.1579911])
    .addTo(map);

// The relevant functions for the required features

// The name of this function is panToKL()
// The purpose of this function is to redirect the user back to Kuala Lumpur
// The parameter involved is none
// The output involved is none
function panToKL() {
    let KL = [101.7117611, 3.1579911];
    map.panTo(KL);
}

// The name of this function is onDragEnd()
// This purpose of this function is to create a marker that can be moved around
// The parameters involved is none
// The output involved is the markers at the selected position
function onDragEnd() {
    let lngLat = marker.getLngLat();
    // Storing the coordinates in local storage
    updateStorage()
    coordinates.style.display = 'block';
    coordinates.innerHTML =
        'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
}

// Allowing the marker to be dragged
marker.on('dragend', onDragEnd);

// The name of this function is addLines()
// The purpose of this function is to add polylines on the map
// The parameter involved is none
// The output involved is none

function addLines() {
    let object =
    {
        type: "geojson",
        data:
        {
            type: "Feature",
            properties: {},
            geometry:
            {
                type: "MultiLineString",
                coordinates: coordinatesList,
            }
        }
    };
    map.addLayer
        ({
            id: "polyline",
            type: "line",
            source: object,
            layout: { "line-join": "round", "line-cap": "round" },
            paint: { "line-color": "dimgrey", "line-width": 4 }
        });
    exist = true;
}

