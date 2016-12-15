//all JSX functions meant to be run inside Photoshop's extendscript VM

(function () {
    "use strict";
    
    function log(s) {    console.log('🅹🆂🆇: '+s);    }
    function err(s) {    console.error('🅹🆂🆇: '+s);    }

    // rotates canvas (and image) clockwise.
    function spinArt(deg) {
        app.activeDocument.rotateCanvas(deg);
    }

    exports.spinArt = spinArt;

}());




