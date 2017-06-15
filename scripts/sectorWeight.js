
function handleLegendClick( graph ) {
  var chart = graph.chart2;
  var hidden = graph.hidden;
  console.log("chart: ", hidden)
  for( var i = 0; i < chart2.graphs.length; i++ ) {
    if ( graph.id == chart2.graphs[i].id )
      chart2.showGraph(chart2.graphs[i]);
    else
      chart2.hideGraph(chart2.graphs[i]);

  }
}
function markerleLegendClick( graph ) {
  for( var i = 0; i < chart2.graphs.length; i++ ) {
      chart2.showGraph(chart2.graphs[i]);
  }
  console.log("here")
}

//"#5DA5B3","#D58323","#DD6CA7","#54AF52","#8C92E8","#E15E5A","#725D82","#776327","#50AB84","#954D56","#AB9C27","#517C3F","#9D5130","#357468","#5E9ACF","#C47DCB","#7D9E33","#DB7F85","#BA89AD","#4C6C86","#B59248","#D8597D","#944F7E","#D67D4B","#8F86C2"]);

var chart2 = AmCharts.makeChart("weightdiv", {
    "type": "serial",
    "theme": "light",
    "colors": ['#8dd3c7','#725D82','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69','#fccde5','#da894d','#bc80bd','#ccebc5'],
    "legend": {
        "useGraphSettings": true,
        "clickMarker": markerleLegendClick,
        "clickLabel": handleLegendClick
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
