console.log("the gui script is loaded");

var units = {
  mac: {name: "Market Cap", unit: " UNT", max: 733, min: -1},
  pri: {name: "Price", unit: " USD", max: 1738, min: -1},
  bov: {name: "Book Value", unit: " BVPS", max: 214, min: -66},
  eas: {name: "Earnings/Share", unit: " USD", max: 51, min: -35},
  ebi: {name: "EBITDA", unit: " USD", max: 71, min: -2},
  prs: {name: "Price/Sales", unit: " USD", max: 25, min: -1}
}

drawSearchPanel();

function drawSearchPanel() {

  var gui = new dat.GUI({
    autoPlace: false,
  });

  var SearchPanelContainer = document.getElementById('SearchPanel');
  SearchPanelContainer.appendChild(gui.domElement);

  gui.add(conditionPanel,'Sector',["Industrials", "Health Care", "Information Technology",
  "Consumer Discretionary", "Utilities", "Financials", "Materials",
  "Consumer Staples", "Real Estate", "Energy", "Telecommunications Services"]);
  var SearchGuiArray = [];
  for( key in units ){
    var guiFolder = gui.addFolder(units[key].name);
    guiFolder.add(conditionPanel,"min",units[key].min,units[key].max);
    guiFolder.add(conditionPanel,"max",units[key].min,units[key].max);
    // guiFolder.open();
    SearchGuiArray.push(guiFolder);
  }
  gui.add(conditionPanel,'Company');d
}
