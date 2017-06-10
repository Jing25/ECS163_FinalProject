// The units and dimensions to visualize, in order.
var units = {
  sec: {name: "Sector", unit: ""},
  mac: {name: "Market Cap", unit: " UNT"},
  pri: {name: "Price", unit: " USD"},
  bov: {name: "Book Value", unit: " BVPS"},
  eas: {name: "Earnings/Share", unit: " USD"},
  ebi: {name: "EBITDA", unit: " USD"},
  prs: {name: "Price/Sales", unit: " USD"}
}

var list = ["Industrials", "Health Care", "Information Technology",
"Consumer Discretionary", "Utilities", "Financials", "Materials",
"Consumer Staples", "Real Estate", "Energy", "Telecommunications Services"];

function getSectorColorNumber(t) {
switch (t) {
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
      return "#ffff99"
      break;
  default:

}
}

var dims = pv.keys(units);
var color = ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99"];

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
    c = pv.dict(dims, function(t) getSectorColorNumber);


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
    .top(-12)
    .font("bold 10px sans-serif")
    .text(function(d) units[d].name);

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
    .textStyle(pv.colors("#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99"))
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

handle.anchor("bottom").add(pv.Label)
    .textBaseline("top")
    .text(function(d) {
      sectors_min = [filter[d.dim].min.toFixed(0)]
      return (filter[d.dim].min.toFixed(0) + units[d.dim].unit)
    });

handle.anchor("top").add(pv.Label)
    .textBaseline("bottom")
    .text( function(d) {
      sectors_max = [filter[d.dim].max.toFixed(0)];
      return filter[d.dim].max.toFixed(0) + units[d.dim].unit;
    });


vis.render();
