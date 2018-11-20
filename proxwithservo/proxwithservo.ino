 //* Creation & Computation - Digital Futures, OCAD University
 //* Kate Hartman / Nick Puckett

#include <Servo.h>
#include <NewPing.h> 

int servoPin1 = 2;           //Pin that the servo is attached to.
int moveRate = 10;        //the time between updates in milliseconds
int minAngle = 0;     //sets the low point of the movement range
int maxAngle = 180;   //sets the high point of the movement range
int moveIncrement = 20;    // how much to move the motor each cycle 
int servoAngle1;
int triggerPin = 3;   //pin conneccted to the Trig pin on the sensor
int echoPin = 4;       //pin connected to the Echo pin on the sensor
int maxDistance = 200;  //set the max distance for the sensor to read (helps with errors)
int distanceVal;        //variable to hold the distance val

int sampleRate = 200;   //how fast to sample the value
long lastReading;       //used for the timer

NewPing proximity1(triggerPin, echoPin, maxDistance); 

long lastTimeYouMoved1;

Servo servo1;  // create the Servo object
void setup() {
 Serial.begin(9600);
 servo1.attach(servoPin1);  //attach the servo to the corresponding control pin
servoAngle1=minAngle;//start the serial port // put your setup code here, to run once:

}

void loop() {
  if(millis()-lastReading>=sampleRate) //this very simple statement is the timer,

  {
  //delayMicroseconds(2000) ;
  distanceVal = proximity1.ping_cm();  //get the distance value in centimeters

  
  lastReading = millis();


  //Serial.print("Distance Reading CM : ");  //print the value to the Serial monitor
  Serial.println(distanceVal);
  if(distanceVal<30){
    // if(millis()-lastTimeYouMoved1>=moveRate) //this very simple statement is the timer,
//{                                          //it subtracts the value of the moment in time the last blink happened, and sees if that number is larger than your set blinking value
servo1.write(servoAngle1);

servoAngle1 += moveIncrement;

  if (servoAngle1 <= minAngle || servoAngle1 >= maxAngle) 
  {
    moveIncrement = -moveIncrement;
  }

lastTimeYouMoved1 = millis();            //save the value in time that this switch occured, so we can use it again.
   

    // put your main code here, to run repeatedly:

  //}
  }
  }

}
