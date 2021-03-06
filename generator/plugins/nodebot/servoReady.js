function servoReady() {
        board.on("ready", function() {
            console.log("Use Up and Down arrows for CW and CCW respectively. Space to stop.");
            var servo = new five.Servo.Continuous(10);
            process.stdin.resume();
            process.stdin.setEncoding("utf8");
            process.stdin.setRawMode(true);
            process.stdin.on("keypress", function(ch, key) {
                if (!key) {
                  return;
                }
                if (key.name === "up") {
                  console.log("CW");
                  servo.cw();
                } else if (key.name === "down") {
                  console.log("CCW");
                  servo.ccw();
                } else if (key.name === "space") {
                  // console.log("Stopping");
                  // servo.stop();
                }
            });
        });
    }