
mapMain();

var privateAccessToken = 'pk.eyJ1IjoiZGVjbGFueiIsImEiOiJjajNocnN0dTAwMDduMzJyejFlMnptZ3F2In0.aAaFIph2MksCaXfapoAeFQ';

function mapMain(){
	console.log('Hello from mapMain() at map.js');

	d3.csv("Data/S&P 500 Component Stocks.csv", function(data) {
		d3.json("Data/S&P 500 Component Stocks Location.json", function(location) {
			drawCompanyOnMap(data,location);
		})
	})
	console.log('End mapMain.js');
}

function drawCompanyOnMap(company,location) {
	// debugger;
	//map function
	var map = L.map('map',{scrollWheelZoom:false,}).setView([33.929648, -43.942662], 3);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 13,
    id: 'mapbox.streets',
    accessToken: privateAccessToken,
	}).addTo(map);

	var combinedData = company.map((d,i)=>{ d.GeoCode = location[i]; return d});
	var comBySector = d3.nest().key(d=>d["GICS Sector"]).entries(combinedData);

	map.on('popupopen', (object) =>{
		// debugger;
		var companyInfos = object.popup._content.split('"')[3].split('-');
		var symb = companyInfos[0];
		var fullCompanyName = companyInfos[1];
		drawStockChart(symb,fullCompanyName);
	});

	getMarkerCluster(combinedData);

	function getMarkerCluster(list) {
		var locMarkerList = list.map(loc => L.marker(loc.GeoCode.features[0].geometry.coordinates.reverse()));

	 	var markerCluster = L.markerClusterGroup(
		 	// {
		 	// 	iconCreateFunction: cluster => L.divIcon({ html: '<b>' + cluster.getChildCount() + '</b>' }),
		 	// }
	 	);

		locMarkerList.forEach( (marker,i) => {
			
			markerCluster.addLayer(marker);
			// is for full name
			marker.bindPopup(`<div class="stockdiv" id="${company[i]["Ticker symbol"]}-${company[i].Security}-stockdiv"></div>`,
				{ maxWidth:600,
				});
			marker.bindTooltip(`${company[i].Security}`);

			marker.on('mouseover', function (e) {this.openTooltip();});

		});
		map.addLayer(markerCluster);
	}


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





