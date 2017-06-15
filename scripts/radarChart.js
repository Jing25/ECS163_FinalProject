var a = "start";
var v = 0;
var chart = AmCharts.makeChart("radardiv", {
    "type": "radar",
    "theme": "light",
    "legend": {
       "useGraphSettings": true,
       "position": "top"
    },
    //"colors": ["rgba(#c3c4c4, 0.93)", "#82a3cf"],
    "dataProvider": [{
        "stockIndexes": "Added_Date",
    }, {
        "stockIndexes": "Price/High_Low",
    }, {
        "stockIndexes": "EBITDA",
    }, {
        "stockIndexes": "Dividend",
    }, {
        "stockIndexes": "Employee_Num",
    }],
    "valueAxes": [{
        "axisTitleOffset": 20,
        "minimum": 0,
        "maximum": 1,
        "axisAlpha": 0.2
    }],
    "startDuration": 1,
    "graphs": [{
        "balloonText": "[[value]]",
        "bullet": "round",
        "fillAlphas": 1,
        "valueField": "start"
    }],
    "categoryField": "stockIndexes"
});

function getRadarData(sym) {
    // debugger;
    AmCharts.loadFile("Data/radarData1.csv", {}, function(data) {
    var chartData = AmCharts.parseCSV(data, {
      "delimiter": ",",
      "useColumnNames": true
    });
    var data = chartData.filter( function(d) {
      return d.Symbol == sym;
    });

    updateChart(data[0],sym);
  });
}

function updateChart(data,sym) {

  var d = chart.dataProvider;
  var g = chart.graphs;

  d[0][sym] = +data.Standardized_Date;
  d[1][sym] = +data.Standardized_Price;
  d[2][sym] = +data.Standardized_EBITDA;
  d[3][sym] = +data.Standardized_Dividend;
  d[4][sym] = +data.Standardized_EmpNum;

  console.log("datap: ", d)


  var valueFields = Object.keys(d[0]).filter(function(value) {
      var gv = g.filter(function(s) {
        return s.valueField !== value;
      });
      if (gv.length !== 0 && value !== chart.categoryField) {
        for (var i = 0; i < gv.length; i++) {
          return gv[i].valueField;
        }
      }
    });
  valueFields.forEach( function( valueField ) {
    chart.graphs.push({
      "title": sym,
      "balloonText": "[[value]]",
      "bullet": "round",
      "fillAlphas": 0.3,
      "valueField": valueField
    })
  });

  chart.validateData();
}
