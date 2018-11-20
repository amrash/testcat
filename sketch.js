//Creation&Computation
 //* Creation & Computation - Digital Futures, OCAD University
 //* Kate Hartman / Nick Puckett
//reads 2 sensor values from arduino
//draws circles based on the analog sensor values
//requires p5.serialcontrol to be running
//and arduino running the sensorOutput1 sketch




var serial;       //variable to hold the serial port object
var ardVal = [];  //array that will hold all values coming from arduino

var serialPortName = '/dev/cu.usbmodem1421';        //FOR PC it will be COMX on mac it will be something like "/dev/cu.usbmodemXXXX"
                                    //Look at P5 Serial to see the available ports
var img;
var inData = 0;
var song;
function preload(){
  img = loadImage("coolcat.jpg");
  song = loadSound("meow.mp3");
}

function setup() {
  
  createCanvas(1023,1023);
  //Setting up the serial port
  serial = new p5.SerialPort();       //create the serial port object
 // serial.open(serialPortName);        //open the serialport. determined 
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
 serial.list(); // list the serial ports
 serial.open(serialPortName);              // open a serial port           //open the socket connection and execute the ardCon callback 
  //serial.on('data',dataReceived);     //when data is received execute the dataReceived function
}

function draw() {
  background(255);
  //stroke(0);
  if (inData <30){
  image(img,0,0);
  }
  //strokeWeight(map(ardVal[0],0,1023,0.5,10));
  //fill(255,0,0,map(ardVal[0],0,1023,10,255));
  //ellipse(width/4,height/2,ardVal[0],ardVal[0]); //apply the sensor value to the radius of the ellipse
  
  //strokeWeight(map(ardVal[1],0,1023,0.5,10));  
  //fill(0,0,255,map(ardVal[1],0,1023,10,255));
  //ellipse(width/2+width/4,height/2,ardVal[1],ardVal[1]);
  
  
}

 function serverConnected() {
  console.log('connected to server.');
}
 
function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
  // read a string from the serial port:
  var inString = serial.readLine();
  // check to see that there's actually a string there:
  if (inString.length > 0 ) {
  // convert it to a number:
  inData = Number(inString);
  if (inData > 30 ){
    redraw();
    if (song.isPlaying()){
      song.stop();
    }
  }
  else{
    redraw();
    if (song.isPlaying()){

    }
    else{
         song.play();
    }
  }
  console.log(inData);
  }
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  console.log('The serial port closed.');
}


// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 console.log(i + " " + portList[i]);
 }
}

