/*

 The circuit:
 * potentiometer connected to analog pin 0.

*/

const int potPin = A0;      // potentiometer pin
int sensorVal = 0;        // pot value 
int degreeVal = 0;        // value output to the PWM (analog out)

void setup() {
  Serial.begin(9600);
}

void loop() {

  sensorVal = analogRead(potPin);

  degreeVal = map(sensorVal, 0, 1023, 0, 360);

  // print to serial
  Serial.print("sensor = ");
  Serial.print(sensorVal);

  // wait 2 milliseconds before the next loop
  // for best reading
  delay(2);
}
