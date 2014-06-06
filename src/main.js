define(function(require, exports, module) {
    var Engine            = require('famous/core/Engine');
    var Surface           = require('famous/core/Surface');
    var ButtonListView    = require('views/ButtonListView');


    var mainContext = Engine.createContext();
    
    // Create a dark background 
    var pageBg = new Surface({
      size: [undefined, undefined],
      properties: {
        backgroundColor: '#323142'
      }
    });
    
    mainContext.add(pageBg);
    
    
    // Add button list
    var buttonList = new ButtonListView();
    
    mainContext.add(buttonList);
    
});
