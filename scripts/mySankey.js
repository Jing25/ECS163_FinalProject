//sect and c are two variables get from parallel coordinate
//sect is sector name, c is color of that sector
//by calling getSankeyData(sect, c), this sankey diagram can re-draw

var sect = "Consumer Discretionary";
var c = "#dd7118"

var units = "Companies";

// set the dimensions and margins of the graph
var margin_sk = {top: 10, right: 10, bottom: 10, left: 10},
    width_sk = 700 - margin_sk.left - margin_sk.right,
    height_sk = 300 - margin_sk.top - margin_sk.bottom;

// format variables
var formatNumber = d3.format(",.0f"),    // zero decimal places
    format = function(d) { return formatNumber(d) + " " + units; },
    color = d3.scaleOrdinal(d3.schemeCategory20);

// append the svg object to the body of the page
var svg_sk = d3.select("#sankeydiv").append("svg")
    .attr("width", width_sk + margin_sk.left + margin_sk.right)
    .attr("height", height_sk + margin_sk.top + margin_sk.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin_sk.left + "," + margin_sk.top + ")");

// Set the sankey diagram properties
var sankey = d3.sankey()
    .nodeWidth(36)
    .nodePadding(40)
    .size([width_sk, height_sk]);

var path = sankey.link();

function getSankeyData(sect, c) {
  d3.csv("Data/new_ConstituentsFinancials.csv", function(error, data) {
    var sectorMega = 0
    var sectorLarge = 0
    var sectorMid = 0
    var megaOver = 0
    var megaUnder = 0
    var largeOver = 0
    var largeUnder = 0
    var midOver = 0
    var midUnder = 0

    //Sector data
    dataSec = data.filter(function(d) {
      return d.Sector === sect;
    })

    //calculate data
    //got the range for overvalue and undervalue
    dataCal = dataSec.filter(function(d) {
      return d["Price/Earnings"] !== "";
    })
    PE = [];
    dataCal.forEach(function(d) {
      PE.push(+d["Price/Earnings"]);
    })
    var meanPE = arr.mean(PE);
    var stdPE = arr.standardDeviation(PE);
    console.log("mean: ", meanPE);
    console.log("std: ", stdPE);
    upper = meanPE + stdPE;
    lower = meanPE - stdPE;

    //get sankey data
    dataSec.forEach( function(d) {
      if (d["Market Cap"] >= 2 && d["Market Cap"] < 10) {
        sectorMid += 1;
        if (+d["Price/Earnings"] > upper) {
          midOver += 1;
        }
        if (+d["Price/Earnings"] < lower) {
          midUnder += 1;
        }
      }
      if (d["Market Cap"] >= 10 && d["Market Cap"] < 200) {
        sectorLarge += 1;
        if (+d["Price/Earnings"] > upper) {
          largeOver += 1;
        }
        if (+d["Price/Earnings"] < lower) {
          largeUnder += 1;
        }
      }
      if (d["Market Cap"] >= 200) {
        sectorMega += 1;
        if (+d["Price/Earnings"] > upper) {
          megaOver += 1;
        }
        if (+d["Price/Earnings"] < lower) {
          megaUnder += 1;
        }
      }
    })

    var graph = {"nodes" : [], "links" : []};

    var megaNorm = sectorMega - megaUnder - megaOver;
    var largeNorm = sectorLarge - largeUnder - largeOver;
    var midNorm = sectorMid - midUnder - midOver;

    var sankeyChart = [
      {
        source: sect,
        target: "Mega Cap",
        value: sectorMega
      },
      {
        source: sect,
        target: "Large Cap",
        value: sectorLarge
      },
      {
        source: sect,
        target: "Mid Cap",
        value: sectorMid
      },
      {
        source: "Mega Cap",
        target: "Overvalued",
        value: megaOver
      },
      {
        source: "Mega Cap",
        target: "Undervalued",
        value: megaUnder
      },
      {
        source: "Mega Cap",
        target: "Normal",
        value: megaNorm
      },
      {
        source: "Large Cap",
        target: "Overvalued",
        value: largeOver
      },
      {
        source: "Large Cap",
        target: "Undervalued",
        value: largeUnder
      },
      {
        source: "Large Cap",
        target: "Normal",
        value: largeNorm
      },
      {
        source: "Mid Cap",
        target: "Overvalued",
        value: midOver
      },
      {
        source: "Mid Cap",
        target: "Undervalued",
        value: midUnder
      },
      {
        source: "Mid Cap",
        target: "Normal",
        value: midNorm
      }
    ]

    sankeyChart.forEach(function (d) {
      if (d.value !== 0) {
        graph.nodes.push({ "name": d.source });
        graph.nodes.push({ "name": d.target });
        graph.links.push({ "source": d.source,
                           "target": d.target,
                           "value": d.value });
      }
     });

     // return only the distinct / unique nodes
     graph.nodes = d3.keys(d3.nest()
       .key(function (d) { return d.name; })
       .object(graph.nodes));

     // Draw Sankey Chart
     // loop through each link replacing the text with its index from node
     graph.links.forEach(function (d, i) {
       graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
       graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
     });

     // now loop through each nodes to make nodes an array of objects
     // rather than an array of strings
     graph.nodes.forEach(function (d, i) {
       graph.nodes[i] = { "name": d };
     });

     drawSankey(graph);
  })
}

function drawSankey(graph) {
  svg_sk.selectAll(".link").remove();
  svg_sk.selectAll(".node").remove();

  sankey
      .nodes(graph.nodes)
      .links(graph.links)
      .layout(32);

  // add in the links
  var link = svg_sk.append("g").selectAll(".link")
      .data(graph.links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", path)
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
      .sort(function(a, b) { return b.dy - a.dy; })
      .on("click", function(p) {
        console.log("links: ", p);
      });


  // add the link titles
  link.append("title")
        .text(function(d) {
        return d.source.name + " → " +
                d.target.name + "\n" + format(d.value); });

  // add in the nodes
  var node = svg_sk.append("g").selectAll(".node")
      .data(graph.nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")"; })
      .on("click", function(p) {
          console.log("here: ", p)
        })
      .call(d3.drag()
        .subject(function(d) {
          return d;
        })
        .on("start", function() {
          this.parentNode.appendChild(this);
        })
        .on("drag", dragmove));

  // add the rectangles for the nodes
  node.append("rect")
      .attr("height", function(d) { return d.dy; })
      .attr("width", sankey.nodeWidth())
      //.style("fill", function(d) {
      //return d.color = color(d.name.replace(/ .*/, "")); })
      .style("fill", c)
      .style("stroke", function(d) {
      return d3.rgb(d.color).darker(2); })
    .append("title")
      .text(function(d) {
      return d.name + "\n" + format(d.value); });

  // add in the title for the nodes
  node.append("text")
      .attr("x", -6)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
    .filter(function(d) { return d.x < width_sk / 2; })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");
}

getSankeyData(sect, c);
// the function for moving the nodes
function dragmove(d) {
  d3.select(this)
    .attr("transform",
          "translate("
             + d.x + ","
             + (d.y = Math.max(
                0, Math.min(height_sk - d.dy, d3.event.y))
               ) + ")");
  sankey.relayout();
  link.attr("d", path);
}
