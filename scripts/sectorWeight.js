
var chart = AmCharts.makeChart("weightdiv", {
    "type": "serial",
    "theme": "light",
    "legend": {
        "useGraphSettings": true
    },

		"dataLoader": {
			"url": "Data/sectorweight.csv",
			"format": "csv",
			"showCurtain": true,
			"showErrors": true,
			"async": true,
			"reverse": true,
			"delimiter": ",",
			"useColumnNames": true,
			//"skip": 1,
			 "postProcess": function(data) {
				 data.forEach( function(d) {
					 Object.keys(d).forEach( function(k) {
						 if (k != "year") {
							 d[k] = (Number(d[k])*100).toPrecision(4);
						 }
					 })
				 })
				 console.log("data: ", data);
				 return data;
			 }
		},

    "valueAxes": [{
        "integersOnly": true,
        "maximum": 23,
        "minimum": 0,
        "reversed": false,
        "axisAlpha": 0,
        "dashLength": 2,
        //"gridCount": 10,
        "position": "left",
        "title": "Sector Weight (%)"
    }],
    "startDuration": 0.5,
    "graphs": [{
        "balloonText": "Telecommunication Services",
        "bullet": "round",
        "title": "Telecommunication Services",
        "valueField": "Telecommunication Services",
		"fillAlphas": 0
		},{
				"balloonText": "Utilities",
				"bullet": "round",
				"title": "Utilities",
				"valueField": "Utilities",
		"fillAlphas": 0
		},{
        "balloonText": "Materials",
        "bullet": "round",
        "title": "Materials",
        "valueField": "Materials",
		"fillAlphas": 0
    },{
        "balloonText": "Energy",
        "bullet": "round",
        //"hidden": true,
        "title": "Energy",
        "valueField": "Energy",
		"fillAlphas": 0
    },{
        "balloonText": "Industrials",
        "bullet": "round",
        "title": "Industrials",
        "valueField": "Industrials",
		"fillAlphas": 0
    },{
        "balloonText": "Consumer Discretionary",
        "bullet": "round",
        "title": "Consumer Discretionary",
        "valueField": "Consumer Discretionary",
		"fillAlphas": 0
    },{
        "balloonText": "Consumer Staples",
        "bullet": "round",
        "title": "Consumer Staples",
        "valueField": "Consumer Staples",
		"fillAlphas": 0
    },{
        "balloonText": "Health Care",
        "bullet": "round",
        "title": "Health Care",
        "valueField": "Health Care",
		"fillAlphas": 0
    },{
        "balloonText": "Financials",
        "bullet": "round",
        "title": "Financials",
        "valueField": "Financials",
		"fillAlphas": 0
    },{
        "balloonText": "Information Technology",
        "bullet": "round",
        "title": "Information Technology",
        "valueField": "Information Technology",
		"fillAlphas": 0
    }],
    "chartCursor": {
        "cursorAlpha": 0,
        "zoomable": false
    },
    "categoryField": "year",
    "categoryAxis": {
        "gridPosition": "start",
        "axisAlpha": 0,
        "fillAlpha": 0.05,
        "fillColor": "#000000",
        "gridAlpha": 0,
        "position": "top"
    }
});
