
function drawStockChart(symb,title){
  // debugger;
  var divID = `${symb}-${title}-stockdiv`;
  var fileName = "Data_Company_CandleStick/" + symb + ".json";
  var chart = AmCharts.makeChart(divID, {
    "type": "stock",
    "theme": "light",

    //"color": "#fff",
    "dataSets": [ {
      "title": title,
      "fieldMappings": [ {
        "fromField": "Open",
        "toField": "open"
      }, {
        "fromField": "High",
        "toField": "high"
      }, {
        "fromField": "Low",
        "toField": "low"
      }, {
        "fromField": "Close",
        "toField": "close"
      }, {
        "fromField": "Volume",
        "toField": "volume"
      } ],
      "compared": false,
      "categoryField": "Date",

      /**
       * data loader for data set data
       */
      "dataLoader": {
        "url": fileName, //"prices.csv",//"MSFT.csv",
        "format": "json",
        "showCurtain": true,
        "showErrors": true,
        "async": true,
        "reverse": true,
        "useColumnNames": true,
         "postProcess": function(data) {
           // console.log("data: ", data.values);
           return data.values;
         }
      }
    } ],
    "dataDateFormat": "YYYY-MM-DD",

    "panels": [ {
        "title": "Company",
        "percentHeight": 70,

        "stockGraphs": [ {
          "type": "candlestick",
          "id": "g1",
          "openField": "open",
          "closeField": "close",
          "highField": "high",
          "lowField": "low",
          "valueField": "close",
          "lineColor": "#fff",
          "fillColors": "#fff",
          "negativeLineColor": "#db4c3c",
          "negativeFillColors": "#db4c3c",
          "fillAlphas": 1,
          "comparedGraphLineThickness": 2,
          "columnWidth": 0.7,
          "useDataSetColors": false,
          "comparable": true,
          "compareField": "close",
          "showBalloon": false,
          "proCandlesticks": true
        } ],

        "stockLegend": {
          "valueTextRegular": undefined,
          "periodValueTextComparing": "[[percents.value.close]]%"
        }

      },

      {
        "title": "Volume",
        "percentHeight": 30,
        "marginTop": 1,
        "columnWidth": 0.6,
        "showCategoryAxis": false,

        "stockGraphs": [ {
          "valueField": "volume",
          "openField": "open",
          "type": "column",
          "showBalloon": false,
          "fillAlphas": 1,
          "lineColor": "#fff",
          "fillColors": "#fff",
          "negativeLineColor": "#db4c3c",
          "negativeFillColors": "#db4c3c",
          "useDataSetColors": false
        } ],

        "stockLegend": {
          "markerType": "none",
          "markerSize": 0,
          "labelText": "",
          "periodValueTextRegular": "[[value.close]]"
        },

        "valueAxes": [ {
          "usePrefixes": true
        } ]
      }
    ],

    "panelsSettings": {
      //    "color": "#fff",
      "plotAreaFillColors": "#333",
      "plotAreaFillAlphas": 1,
      "marginLeft": 60,
      "marginTop": 5,
      "marginBottom": 5
    },

    "chartScrollbarSettings": {
      "graph": "g1",
      "graphType": "line",
      "usePeriod": "WW",
      "backgroundColor": "#333",
      "graphFillColor": "#666",
      "graphFillAlpha": 0.5,
      "gridColor": "#555",
      "gridAlpha": 1,
      "selectedBackgroundColor": "#444",
      "selectedGraphFillAlpha": 1
    },

    "categoryAxesSettings": {
      "equalSpacing": true,
      "gridColor": "#555",
      "gridAlpha": 1
    },

    "valueAxesSettings": {
      "gridColor": "#555",
      "gridAlpha": 1,
      "inside": false,
      "showLastLabel": true
    },

    "chartCursorSettings": {
      "pan": true,
      "valueLineEnabled": true,
      "valueLineBalloonEnabled": true
    },

    "legendSettings": {
      //"color": "#fff"
    },

    "stockEventsSettings": {
      "showAt": "high",
      "type": "pin"
    },

    "balloon": {
      "textAlign": "left",
      "offsetY": 10
    },

    "periodSelector": {
      "position": "bottom",
      "periods": [ {
          "period": "DD",
          "count": 10,
          "label": "10D"
        }, {
          "period": "MM",
          "count": 1,
          "label": "1M"
        }, {
          "period": "MM",
          "count": 6,
          "label": "6M"
        }, {
          "period": "YYYY",
          "count": 1,
          "label": "1Y"
        }, {
          "period": "YYYY",
          "count": 2,
          "selected": true,
          "label": "2Y"
        },
        /* {
             "period": "YTD",
             "label": "YTD"
           },*/
        {
          "period": "MAX",
          "label": "MAX"
        }
      ]
    }
  } );  
}

