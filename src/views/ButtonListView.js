/*** ButtonListView ***/

define(function(require, exports, module) {
    var View              = require('famous/core/View');
    var Surface           = require('famous/core/Surface');
    var Transform         = require('famous/core/Transform');
    var StateModifier     = require('famous/modifiers/StateModifier');
    
    var SocialButtonView  = require('views/SocialButtonView');

    function ButtonListView() {
        View.apply(this, arguments);
        
        _createList.call(this);
    }

    ButtonListView.prototype = Object.create(View.prototype);
    ButtonListView.prototype.constructor = ButtonListView;

    ButtonListView.DEFAULT_OPTIONS = {
      buttonMargin: 80,
      buttonSize: 120,
      list:[
        {
          name: 'Twitter',
          iconUrl: 'img/twitter-icon.svg',
          url: 'https://twitter.com/t4t5',
          backgroundColor: '#55acee'
        },
        {
          name: 'Instagram',
          iconUrl: 'img/instagram-icon.svg',
          url: 'https://instagram.com/t4t5',
          backgroundColor: '#305F84'
        },
        {
          name: 'Dribbble',
          iconUrl: 'img/dribbble-icon.svg',
          url: 'http://dribbble.com/tristanedwards',
          backgroundColor: '#EA4C89'
        }
      ]
    };
    
    
    function _createList() {
    
      var listLength = this.options.list.length;

      var xOffset = -((listLength - 1)*(this.options.buttonSize + this.options.buttonMargin)/2);
      
      for (var buttonIndex = 0; buttonIndex < listLength; buttonIndex++) {
        
        var buttonProperties = this.options.list[buttonIndex];
        
        var socialButton = new SocialButtonView({
          backgroundColor: buttonProperties.backgroundColor,
          iconUrl: buttonProperties.iconUrl,
          buttonSize: this.options.buttonSize,
          url: buttonProperties.url
        });
        
        var socialButtonModifier = new StateModifier({
          origin: [0.5, 0.5],
          align: [0.5, 0.5],
          transform: Transform.translate(xOffset, 0, 0)
        });
        
        this.add(socialButtonModifier).add(socialButton);
        
        xOffset += this.options.buttonSize + this.options.buttonMargin;  
      }
      
    }
    

    module.exports = ButtonListView;
});