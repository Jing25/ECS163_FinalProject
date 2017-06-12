// The units and dimensions to visualize, in order.
var units = {
  sec: {name: "Sector", unit: "", max: 0},
  mac: {name: "Market Cap", unit: " UNT", max: 733, min: -1},
  pri: {name: "Price", unit: " USD", max: 1738, min: -1},
  bov: {name: "Book Value", unit: " BVPS", max: 214, min: -66},
  eas: {name: "Earnings/Share", unit: " USD", max: 51, min: -35},
  ebi: {name: "EBITDA", unit: " USD", max: 71, min: -2},
  prs: {name: "Price/Sales", unit: " USD", max: 25, min: -1}
}
   
var list = ["Industrials", "Health Care", "Information Technology", 
"Consumer Discretionary", "Utilities", "Financials", "Materials", 
"Consumer Staples", "Real Estate", "Energy", "Telecommunications Services"];

function getSectorColor(c) {
    switch (c) {
      case 1:
          return "#a6cee3"
          break;
      case 2:
          return "#1f78b4"
          break;
      case 3:
          return "#b2df8a"
          break;
      case 4:
          return "#33a02c"
          break;
      case 5:
          return "#fb9a99"
          break;              
        case 6:
          return "#e31a1c"
          break;
      case 7:
          return "#fdbf6f"
          break;
      case 8:
          return "#ff7f00"
          break;
      case 9:
          return "#cab2d6"
          break;
      case 10:
          return "#6a3d9a"
          break;
        case 11:
          return "#6b4900"
          break;
      default:

    }
}

var dims = pv.keys(units);

/* var csv is the CSV file with headers. */
function csvJSON(csv){
  var lines=csv.split("\n");
  var result = [];
  var headers=lines[0].split(",");
  for(var i=1;i<lines.length;i++) {
    var obj = {};
    var currentline=lines[i].split(",");
    for(var j=0;j<headers.length;j++) {
      obj[headers[j]] = currentline[j];
      }
    result.push(obj);
  }
    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
}


    /* Sizing and scales. */
    var w = 820,
        h = 450,
        fudge = 0.5,
        x = pv.Scale.ordinal(dims).splitFlush(0, w),
        y = pv.dict(dims, function(t) pv.Scale.linear(
            pc.filter(function(d) !isNaN(d[t])),
            function(d) Math.floor(d[t])-fudge,
            function(d) Math.ceil(d[t]) +fudge
            ).range(0, h));
        c = pv.dict(dims, function(c) getSectorColor);
                  

    /* Interaction state. */
    var filter = pv.dict(dims, function(t) {
        return {min: y[t].domain()[0], max: y[t].domain()[1]};
      }), active = "sec";

    /* The root panel. */
    var vis = new pv.Panel()
        .width(w)
        .height(h)
        .left(170)
        .right(30)
        .top(30)
        .bottom(20);

    // The parallel coordinates display.
    vis.add(pv.Panel)
        .data(pc)
        .visible(function(d) dims.every(function(t)
            (d[t] >= filter[t].min) && (d[t] <= filter[t].max)))
        .add(pv.Line)
        .data(dims)
        .left(function(t, d) x(t))
        .bottom(function(t, d) y[t](d[t]))
        .strokeStyle("#ddd")
        .lineWidth(1)
        .antialias(false);

    // Rule per dimension.
    rule = vis.add(pv.Rule)
        .data(dims)
        .left(x);

    // Dimension label
    rule.anchor("top").add(pv.Label)
        .top(-15)
        .font("bold 10px sans-serif")
        .text(function(d) units[d].name);
    
    // for(i = 0; i < 4; i++) {


// scales
rule.anchor("left").add(pv.Label)
        .top(0)
        .font("bold 10px sans-serif")
        .text(function(d) {
          if(units[d].name != "Sector")
            return units[d].max + units[d].unit
        });

rule.anchor("left").add(pv.Label)
        .top(90)
        .font("bold 10px sans-serif")
        .text(function(d) {
          var number = (units[d].max - units[d].min) / 5 * 4 + units[d].min
          if(units[d].name != "Sector")
            return number.toFixed(0) + units[d].unit
        }); 
    
    rule.anchor("left").add(pv.Label)
        .top(180)
        .font("bold 10px sans-serif")
        .text(function(d) {
          var number = (units[d].max - units[d].min) / 5 * 3 + units[d].min
          if(units[d].name != "Sector")
            return number.toFixed(0) + units[d].unit
        }); 
    
    rule.anchor("left").add(pv.Label)
        .top(270)
        .font("bold 10px sans-serif")
        .text(function(d) {
          var number = (units[d].max - units[d].min) / 5 * 2 + units[d].min
          if(units[d].name != "Sector")
            return number.toFixed(0) + units[d].unit
        }); 
    
    rule.anchor("left").add(pv.Label)
        .top(360)
        .font("bold 10px sans-serif")
        .text(function(d) {
          var number = (units[d].max - units[d].min) / 5 * 1 + units[d].min
          if(units[d].name != "Sector")
            return number.toFixed(0) + units[d].unit
        }); 
        
    rule.anchor("left").add(pv.Label)
        .top(450)
        .font("bold 10px sans-serif")
        .text(function(d) {
          if(units[d].name != "Sector")
            return units[d].min + units[d].unit
        });                         

    // Add label for sector's name   
    vis.add(pv.Rule)
        .data(pv.range(11))
        .bottom(function(d) d / 2 * 82 + 22)
        .left(-5)
        .strokeStyle("white")
      .add(pv.Label)
        .textAlign("right")
        .textBaseline("middle")
        .font("bold 10px sans-serif")
        .textStyle(pv.colors("#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#6b4900"))
        .text(function(d) list[d]); 
              


    // The parallel coordinates display.
    var change = vis.add(pv.Panel);

    var line = change.add(pv.Panel)
        .data(pc)
        .visible(function(d) dims.every(function(t)
            (d[t] >= filter[t].min) && (d[t] <= filter[t].max)))
      .add(pv.Line)
        .data(dims)
        .left(function(t, d) x(t))
        .bottom(function(t, d) y[t](d[t]))
        .strokeStyle(function(t,d) { return c[active](d[active]);  }).lineWidth(1);
        
    // Updater for slider and resizer.
    function update(d) {
      var t = d.dim;
      filter[t].min = Math.max(y[t].domain()[0], y[t].invert(h - d.y - d.dy));
      filter[t].max = Math.min(y[t].domain()[1], y[t].invert(h - d.y));
      active = t;
      change.render();
      active = "sec";
      change.render();
      return false;
    }

    // Updater for slider and resizer.
    function selectAll(d) {
      if (d.dy < 3) {
        var t = d.dim;
        filter[t].min = Math.max(y[t].domain()[0], y[t].invert(0));
        filter[t].max = Math.min(y[t].domain()[1], y[t].invert(h));
        d.y = 0; d.dy = h;
        active = t;
        change.render();
        active = "sec";
        change.render();
      }
      return false;
    }

    /* Handle select and drag */
    var handle = change.add(pv.Panel)
        .data(dims.map(function(dim) { return {y:0, dy:h, dim:dim}; }))
        .left(function(t) x(t.dim) - 30)
        .width(60)
        .fillStyle("rgba(0,0,0,.001)")
        .cursor("crosshair")
        .event("mousedown", pv.Behavior.select())
        .event("select", update)
        .event("selectend", selectAll)
      .add(pv.Bar)
        .left(25)
        .top(function(d) d.y)
        .width(10)
        .height(function(d) d.dy)
        .fillStyle("hsla(0,0,50%,.5)")
        .strokeStyle("white")
        .cursor("move")
        .event("mousedown", pv.Behavior.drag())
        .event("dragstart", update)
        .event("drag", update);

var sectors_min = [];
var sectors_max = [];
    // Label on Selection : Start
    // 
    // handle.anchor("bottom").add(pv.Label)
    //   .textMargin(6)
    //     .textBaseline("top")
    //     .text(function(d) {
    //       sectors_min = [filter[d.dim].min.toFixed(0)]
    //       return (filter[d.dim].min.toFixed(0) + units[d.dim].unit)
    //     });   
  
    // handle.anchor("top").add(pv.Label)
    //   .textMargin(6)
    //     .textBaseline("bottom")
    //     .text( function(d) {
    //       sectors_max = [filter[d.dim].max.toFixed(0)];
    //       return filter[d.dim].max.toFixed(0) + units[d.dim].unit;
    //     });
    // Label on Selection : END

    function myPC_update() {
    
      if(document.getElementById("max1").value != 'Keep Same') {
        var t = "sec";
          filter[t].min = Math.max(y[t].domain()[0], y[t].invert((document.getElementById("min1").value) * 37.5 - 18.75));
          filter[t].max = Math.min(y[t].domain()[1], y[t].invert((document.getElementById("max1").value) * 37.5 + 18.75));
          active = t;
          change.render();
          active = "sec";
          change.render();
    }
    
    if(document.getElementById("max2").value != 'Keep Same') {
        var t = "mac";
          filter[t].min = Math.max(y[t].domain()[0], y[t].invert((document.getElementById("min2").value) * 0.6122 - 0.3061 - 1));
          filter[t].max = Math.min(y[t].domain()[1], y[t].invert((document.getElementById("max2").value) * 0.6122 + 0.3061 - 1));
          active = t;
          change.render();
          active = "sec";
          change.render();
//          document.getElementById("max1").value = 'Keep Same';
//          document.getElementById("min1").value = 'Keep Same';
    }
    
    if(document.getElementById("max3").value != 'Keep Same') {
        var t = "pri";
          filter[t].min = Math.max(y[t].domain()[0], y[t].invert((document.getElementById("min3").value) * 0.2586 - 0.1293 - 1));
          filter[t].max = Math.min(y[t].domain()[1], y[t].invert((document.getElementById("max3").value) * 0.2586 + 0.1293 - 1));
          active = t;
          change.render();
          active = "sec";
          change.render();
//          document.getElementById("max1").value = 'Keep Same';
//          document.getElementById("min1").value = 'Keep Same';
    }
    
    if(document.getElementById("max4").value != 'Keep Same') {
        var t = "bov";
          filter[t].min = Math.max(y[t].domain()[0], y[t].invert((document.getElementById("min4").value) * 1.6014 - 0.8007));
          filter[t].max = Math.min(y[t].domain()[1], y[t].invert((document.getElementById("max4").value) * 1.6014 + 0.8007));
          active = t;
          change.render();
          active = "sec";
          change.render();
//          document.getElementById("max1").value = 'Keep Same';
//          document.getElementById("min1").value = 'Keep Same';
    }
    
    if(document.getElementById("max5").value != 'Keep Same') {
        var t = "eas";
          filter[t].min = Math.max(y[t].domain()[0], y[t].invert((document.getElementById("min5").value) * 5.1724 - 2.5862 - 35));
          filter[t].max = Math.min(y[t].domain()[1], y[t].invert((document.getElementById("max5").value) * 5.1724 + 2.5862 - 35));
          active = t;
          change.render();
          active = "sec";
          change.render();
//          document.getElementById("max1").value = 'Keep Same';
//          document.getElementById("min1").value = 'Keep Same';
    }
    
    if(document.getElementById("max6").value != 'Keep Same') {
        var t = "ebi";
          filter[t].min = Math.max(y[t].domain()[0], y[t].invert((document.getElementById("min6").value) * 6.0811 - 3.0405 - 2));
          filter[t].max = Math.min(y[t].domain()[1], y[t].invert((document.getElementById("max6").value) * 6.0811 + 3.0405 - 2));
          active = t;
          change.render();
          active = "sec";
          change.render();
//          document.getElementById("max1").value = 'Keep Same';
//          document.getElementById("min1").value = 'Keep Same';
    }
    
    if(document.getElementById("max7").value != 'Keep Same') {
        var t = "prs";
          filter[t].min = Math.max(y[t].domain()[0], y[t].invert((document.getElementById("min7").value) * 16.6667 - 8.3333 - 1));
          filter[t].max = Math.min(y[t].domain()[1], y[t].invert((document.getElementById("max7").value) * 16.6667 + 8.3333 - 1));
          active = t;
          change.render();
          active = "sec";
          change.render();
//          document.getElementById("max1").value = 'Keep Same';
//          document.getElementById("min1").value = 'Keep Same';
    }

//      if(document.getElementById("max1").value != 'Keep Same') {
//        fuction(d); {
//          d.dim = "sec";
//          d.y = h - (document.getElementById("max1").value * 37.5 + 18.75);
//          d.dy = h - d.y - (document.getElementById("min1").value * 37.5 - 18.75);
//          return false;
//        } 
//            update(d);
// //           document.getElementById("max1").value = 'Keep Same';
// //           document.getElementById("min1").value = 'Keep Same';
//        }
    return false;
}    

vis.render();