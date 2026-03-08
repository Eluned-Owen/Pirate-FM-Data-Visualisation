//The live website for this project can be found here (https://cci.arts.ac.uk/~elowen/PirateFM/) and the git repository can be found here (https://git.arts.ac.uk/23008862/Data-Visualisation)
let lineMove = 85;
let radioYear = 1990;
let yearList = ["1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000"]

//this was used for testing
//let fakeYear = "2000"

let display;
let yearKey;
let displayParent;
let activeYear;
let previousYear = null;
let displayData;
let frequencyFilter = false;
let previousFrequencyFilter;

function setup() {
  createCanvas(750, 500);

  displayParent = createDiv();
  displayParent.addClass("displayParent")
  display = createDiv()
  display.addClass('display');
  display.parent(displayParent);
}

function draw() {
  //initiallising these so I can increase lineWeight on hover
  let lineWeightBack = 1;
  let lineWeightForward = 1;
  let lineWeightButton = 1;

  //Back and forward button interactions
  //Back button hover effect
  if (mouseX > 210 && mouseX < 250 && mouseY > 60 && mouseY < 95){
    lineWeightBack = 5;
  }

  //Code for BACKWARD movements on the year line, also making sure it cant move further back than it should
  if (mouseX > 210 && mouseX < 250 && mouseY > 60 && mouseY < 95 && mouseIsPressed && lineMove > 85 && radioYear > 1989){
    lineMove -= 2.8;
    radioYear -= 0.08 ;
  }
  
  //Forward button hover effect
  if (mouseX > 310 && mouseX < 330 && mouseY > 60 && mouseY < 95){
    lineWeightForward = 5;
  }
  
  //Code for FORWARD movements on the year line, also making sure it cant move further forward than it should
  if (mouseX > 310 && mouseX < 330 && mouseY > 60 && mouseY < 95 && mouseIsPressed && lineMove < 460 && radioYear < 2001){
    lineMove += 2.8;
    radioYear += 0.08;
  }

  //For frequency sort button
  if (mouseX > 140 && mouseX < 278 && mouseY > 170 && mouseY < 200){
    lineWeightButton = 5
  }
  
  //UI background 
  image(radioBackground, 0 ,0, 750, 500);
  noStroke();
  fill(90, 31, 111);
  rect(30, 162, 450, 330);
  fill(142, 41, 41);
  rect(40, 158, 470, 322);

  //Drawing forward and back button
  fill(128, 219, 224);
  triangle(221, 72, 242, 55, 242, 85);
  triangle(332, 72, 312, 55, 312, 85);

  //Creating functions for all the interactable/moving elements
  function yearLine(){
    stroke(128, 219, 224);
    strokeWeight(3);
    line(lineMove, 105, lineMove, 120);
  }

  function goBack(){
    strokeWeight(lineWeightBack);
    stroke(128, 219, 224);
    noFill();
    goBackTriangle = triangle(221, 72, 242, 55, 242, 85);
  };

  function goForward(){
    strokeWeight(lineWeightForward);
    stroke(128, 219, 224);
    noFill();
    goForwardTriangle = triangle(332, 72, 312, 55, 312, 85);
  };

  function frequencyButton(){
   //Frequency sort button
    noStroke()
    fill(90, 31, 111)
    rect(140, 175, 140, 20)

    stroke(222);
    strokeWeight(lineWeightButton)
    colour = fill(252, 111, 9)
    rect(142, 173, 140, 20)

    noStroke()
    textFont("Fugaz One")
    textSize(14)
    fill(102, 31, 19);
    text("Sort by frequency", 150, 187)

  };

  //Year display
  textFont('Arial');
  textSize(12)
  fill(222)
  text("1990     91'      92'      93'       94'       95'       96'       97'       98'      99'      2000", 70, 132);


  //How to use text
  textFont("Fugaz One")
  fill(128, 219, 224);
  textSize(14)
  text("How to use?", 573, 220 )
  textSize(11)
  text("Click on the back and forward", 573, 250 );
  text("forward buttons to interact ", 573, 270 );
  text("with the radio. Press the", 573, 290 );
  text("'sort by frequency' button", 573, 310 );
  text("to toggle frequency sort on/off.", 573, 330 );

  yearLine();
  goBack();
  goForward();
  frequencyButton();  

  //Converting float numbers from radioYear (year ver starting on 1990 effected by forward/back buttons) to int
  year = int(radioYear);
  activeYear = str(year);
  //console.log(activeYear);
  //displaying the active year
  strokeWeight(1);
  textSize(25);
  fill(128, 219, 224)
  text(activeYear, 50, 190);

  //Checking if activeYear is in yearList 
  //if (activeYear in yearList);
  //  console.log("yes!");
  //console.log(activeYear);

  //Checks for any changes in state in activeYear and frequencyFilter
  if ((activeYear !== previousYear) ||(frequencyFilter !== previousFrequencyFilter)) {
    //saving the changes
    previousFrequencyFilter = frequencyFilter
    previousYear = activeYear;
    //clearing previous data
    allTogether = []; 

    getData(activeYear);  
    updateDisplay();   
  }
}

//toggle state for frequency filter if pressed
function mousePressed() {
  if (mouseX > 140 && mouseX < 282 && mouseY > 172 && mouseY < 192){
    frequencyFilter = ! frequencyFilter;
  }
}

function updateDisplay() {
  if (displayData) {
    //removing the previous DOM element
    displayData.remove(); 
  }

  // joining the array into string
  displayData = createP(allTogether.join(" "));
  //pending the data to a div
  displayData.addClass("displayData");
  displayData.parent(display);
}

