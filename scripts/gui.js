console.log("the gui script is loaded");

drawSearchPanel();

function drawSearchPanel() {

  var gui = new dat.GUI({
    autoPlace: false,
  });

  var text = {
    min: 0,
    max: 100,
  };

  var SearchPanelContainer = document.getElementById('SearchPanelContent');
  SearchPanelContainer.appendChild(gui.domElement);

  var SearchGuiArray = [];
  for( key in units ){
    var guiFolder = gui.addFolder(units[key].name);
    guiFolder.add(text,"min",-100,1000);
    guiFolder.add(text,"max",-100,2000);
    // guiFolder.open();
    SearchGuiArray.push(guiFolder);
  } 
}