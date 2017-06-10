window.onload = main;

var privateAccessToken = 'pk.eyJ1IjoiZGVjbGFueiIsImEiOiJjajNocnN0dTAwMDduMzJyejFlMnptZ3F2In0.aAaFIph2MksCaXfapoAeFQ';

function main(){
	console.log('Hello from main() at main.js');

	d3.csv("Data/S&P 500 Component Stocks.csv", function(data) {
		d3.json("Data/S&P 500 Component Stocks Location.json", function(location) {
			drawCompanyOnMap(data,location);
		})
	})
	console.log('End main.js');
}

function drawCompanyOnMap(company,location) {
	// debugger;
	//map function
	var map = L.map('map').setView([33.929648, -43.942662], 3);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 13,
    id: 'mapbox.streets',
    accessToken: privateAccessToken,
	}).addTo(map);

	var combinedData = company.map((d,i)=>{ d.GeoCode = location[i]; return d});
	var comBySector = d3.nest().key(d=>d["GICS Sector"]).entries(combinedData);

	function getMarkerCluster(list) {
		var locMarkerList = list.map(loc => L.marker(loc.GeoCode.features[0].geometry.coordinates.reverse()));

	 	var markerCluster = L.markerClusterGroup(
		 	// {
		 	// 	iconCreateFunction: cluster => L.divIcon({ html: '<b>' + cluster.getChildCount() + '</b>' }),
		 	// }
	 	);

		locMarkerList.forEach( (marker,i) => {
			
			markerCluster.addLayer(marker);

			marker.bindPopup(`<b>${company[i].Security}</b>`);
		});

		map.addLayer(markerCluster);
	}

	getMarkerCluster(combinedData);
	//comBySector.forEach( sector => { if ( sector.key == selction ) getMarkerCluster(sector.values); } );

	// var data = d3.select('#map').append('div');
	// debugger;
}

function mapboxGeoQuery(query) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${privateAccessToken}`, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
 // xhttp.onreadystatechange = function() {
 //    if (xhr.readyState === 200) {
 //      console.log(xhr.response); //Outputs a DOMString by default
 //    }
 //  }
  return JSON.parse(xhttp.responseText);
}





