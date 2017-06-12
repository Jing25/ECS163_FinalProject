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

  var SearchPanelContainer = document.getElementById('SearchPanel');
  SearchPanelContainer.appendChild(gui.domElement);

  var SearchGuiArray = [];
  for( key in units ){
    var guiFolder = gui.addFolder(units[key].name);
    guiFolder.add(text,"min",-1000,1000);
    guiFolder.add(text,"max",-1000,1000);
    guiFolder.open();
    SearchGuiArray.push(guiFolder);
  } 
}