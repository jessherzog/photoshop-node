(function () {
    
    "use strict";    
    
    function log(s) {    
        console.log('𝕣𝕠𝕥𝕒𝕥𝕖_𝕔𝕒𝕟𝕧𝕒𝕤: '+s);    
    }
    function err(s) {    
        console.error('𝕣𝕠𝕥𝕒𝕥𝕖_𝕔𝕒𝕟𝕧𝕒𝕤: '+s);    
    }

    /*********** GLOBALS ***********/
    
    var PLUGIN_ID = require("./package.json").name,
        MENU_ID = "generator-test",
        MENU_LABEL = "↬ 𝕣𝕠𝕥𝕒𝕥𝕖_𝕔𝕒𝕟𝕧𝕒𝕤 ↫";
    
    var generator = null;
    var config = null; 

    var jsxfunctions = require('./jsxfunctions.js');

    // servo
    var five = require("./lib/johnny-five.js");
    var keypress = require("keypress");
    var rot_deg;
    
    /*********** INIT ***********/

    function init(gen, cfg) {
        generator = gen;
        config = cfg;
        
        function initLater() {
            generator.addMenuItem(MENU_ID, MENU_LABEL, true, false).then(
                function () { log("✔", MENU_ID); },
                function () { err("☹", MENU_ID); }
            );
        }
        
        process.nextTick(initLater);

        generator.onPhotoshopEvent( "generatorMenuChanged", function(event) {
            var menu = event.generatorMenuChanged;
            if (menu && menu.name == MENU_ID) {
                onMenuClicked(menu);
            }
        });
        
        generator.on('close', function() {
        });
    }

    /*********** MENU EVENTS ***********/

    function onMenuClicked(menu) {
        var startingMenuState = generator.getMenuState(menu.name);
        var checked = (startingMenuState.checked) ? false : true;
        generator.toggleMenu(menu.name, true, checked);

    /*********** ROTATE SERVO + RENDER CANVAS ***********/    
    // if checked, start servo,
    // and rotate canvas (and image) clockwise.

        if (checked) {
            callJSXfunction(jsxfunctions.spinArt, [20], true);

            keypress(process.stdin);
            var board = new five.Board();
            board.on("ready", function() {
                var servo = new five.Servo.Continuous(10);
                process.stdin.setEncoding("utf8");
                process.stdin.setRawMode(true);
                process.stdin.on("keypress", function(ch, key) {
                    if (!key) {
                      return;
                    }
                    if (key.name === "left") {
                      console.log("CW");
                      rot_deg = 1;
                      servo.cw();
                    } else if (key.name === "right") {
                      console.log("CCW");
                      rot_deg = -1;
                      servo.ccw();
                    } else if (key.name === "space") {
                      console.log("Stopping");
                      rot_deg = 0;
                      servo.stop();
                    }
                });
            });
        } else {

        }
    }
    
    /*********** HELPERS ***********/
    
    function callJSXfunction(fcn, args, quiet) {
        args = args || [];
        var str = "(" + fcn.toString() + ")("+ args.join() +")";
        sendJSX(str, quiet);
    }
    
    function sendJSX(str, quiet) {
        var res = generator.evaluateJSXString(str);
        if (!quiet) {
            res.then(
                function(result){ 
                    log("jsx result: "+result); 
                },
                function(msg){ 
                    err("jsx error: "+msg); 
                }
            );
        }
    }
    
    /*********** EXPORT ***********/

    exports.init = init;
    
}());