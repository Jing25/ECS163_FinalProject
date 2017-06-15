console.log("the gui script is loaded");

var units = {
  // sec: {name: "Sector", unit: "", max: 0},
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

  var text = {
    min: 0,
    max: 100,
  };

  var SearchPanelContainer = document.getElementById('SearchPanel');
  SearchPanelContainer.appendChild(gui.domElement);

  var sectionGui = gui.add(text,"Sector",["Infomation","Materials"]);
  var companyName = gui.add(text,) 
  var SearchGuiArray = [];
  for( key in units ){
    var guiFolder = gui.addFolder(units[key].name);
    guiFolder.add(text,"min",units[key].min,units[key].max);
    guiFolder.add(text,"max",units[key].min,units[key].max);
    // guiFolder.open();
    SearchGuiArray.push(guiFolder);
  } 

}