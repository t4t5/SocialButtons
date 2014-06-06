/*** SocialButtonView ***/

define(function(require, exports, module) {
    var View              = require('famous/core/View');
    var Surface           = require('famous/core/Surface');
    var Transform         = require('famous/core/Transform');
    var StateModifier     = require('famous/modifiers/StateModifier');
    var Easing            = require('famous/transitions/Easing');
    var Transitionable    = require('famous/transitions/Transitionable');
    var SpringTransition  = require('famous/transitions/SpringTransition');
    Transitionable.registerMethod('spring', SpringTransition);

    function SocialButtonView() {
      View.apply(this, arguments);
      
      _createButtonBg.call(this);
      _createButtonCircleBorder.call(this);
      _createButtonIcon.call(this);
      _createButtonContainer.call(this);
      
      _addHoverEffect.call(this);
      _addClickableLink.call(this);
    }
    
    SocialButtonView.prototype = Object.create(View.prototype);
    SocialButtonView.prototype.constructor = SocialButtonView;

    SocialButtonView.DEFAULT_OPTIONS = {
      buttonSize: 80,
      borderColor: 'white',
      backgroundColor: 'gray',
      iconUrl: 'img/twitter-icon.svg',
    };
    
    
    
    function _createButtonContainer() {
      this.buttonContainer = new Surface({
  	    size: [this.options.buttonSize, this.options.buttonSize],
  	    properties: {
    	    cursor: 'pointer'
  	    }
      });
      this.buttonModifier = new StateModifier({
        transform: Transform.translate(0, 0, 0.1)
      });
      
      this.add(this.buttonModifier).add(this.buttonContainer);
    }
    
    
    function _createButtonCircleBorder() {
      this.buttonCircle = new Surface({
  	    size: [this.options.buttonSize, this.options.buttonSize],
  	    properties: {
    	    border: '1px solid '+this.options.borderColor,
    	    borderRadius: '50%'
  	    }
      });
      this.circleModifier = new StateModifier();
      
      this.add(this.circleModifier).add(this.buttonCircle);
    }
      
      
    function _createButtonBg() {
      this.buttonBg = new Surface({
  	    size: [this.options.buttonSize, this.options.buttonSize],
  	    opacity: 0,
  	    properties: {
          backgroundColor: this.options.backgroundColor,
    	    borderRadius: '50%'
  	    }
      });
      this.buttonBgModifier = new StateModifier({
        transform: Transform.scale(0, 0, 0.1)
      });
      
      this.add(this.buttonBgModifier).add(this.buttonBg);
    }
    
    function _createButtonIcon() {
      this.socialIcon = new Surface({
        size: [this.options.buttonSize/2, this.options.buttonSize/2],
        properties: {
          backgroundImage: 'url('+this.options.iconUrl+')',
    	    backgroundSize: this.options.buttonSize/2+'px',
    	    backgroundPosition: 'center center',
    	    backgroundRepeat: 'no-repeat'
        }
      });
     
      this.add(this.socialIcon);
    }
  
    
    
    // Hover effect
    
    function _addHoverEffect() {
    
      this.buttonContainer.on('mouseover', function(){
        this.circleModifier.setTransform(
          Transform.scale(1.3, 1.3, 1), { duration: 200, curve: 'easeInOut' }
        ).setOpacity(
          0, { duration: 300, curve: 'easeInOut' }
        );
        
        this.buttonBgModifier.setTransform(   // Set inital size (tiny)...
          Transform.scale(0.1, 0.1, 1)
        ).setTransform(                       // ... then scale it up!
          Transform.scale(1, 1, 1), 
          { method: 'spring', period: 300, dampingRatio: 0.5 }
        ).setOpacity(
          1, { duration: 300, curve: 'easeInOut' }
        );  
      }.bind(this));
      
      
      this.buttonContainer.on('mouseout', function(){
        this.circleModifier.setTransform(
          Transform.scale(1, 1, 1)
        ).setOpacity(
          1, { duration: 200 }
        );
    
        this.buttonBgModifier.setOpacity(
          0, { duration: 300, curve: 'easeInOut' }
        );  
      }.bind(this));

    }
    
    
    function _addClickableLink() {
      this.buttonContainer.on('click', function(){
        window.open(this.options.url)
      }.bind(this));
    }
  


    module.exports = SocialButtonView;
});