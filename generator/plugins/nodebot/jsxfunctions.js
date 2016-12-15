//all JSX functions meant to be run inside Photoshop's extendscript VM

(function () {
    "use strict";
    
    function log(s) {    
    	console.log('🅹🆂🆇: '+s);    
    }
    function err(s) {    
    	console.error('🅹🆂🆇: '+s);    
    }

    // var canvas = app.activeDocument;
    // rotates canvas (and image) clockwise.
    function spinArt(degree) {
		app.activeDocument.rotateCanvas(degree);
    }

    exports.spinArt = spinArt;

}());




