var buttonColours = ["red", "blue", "green", "yellow"];

gamePattern = [];
userClickedPattern = [];
var started = false;
var level = 0;

$(".btn").on("click", function() { // Detecting when any of the buttons are clicked
  var userChosenColour = $(this).attr("id"); // Storing the id of the button clicked by the user
  userClickedPattern.push(userChosenColour); // Pushing the colour clicked into the array userClickedPattern
  //console.log(userChosenColour);
  playSound(userChosenColour); // Play the corresponding audio of the color chosen by the user
  animatePress(userChosenColour); // Change the colour of the pressed button
  checkAnswer(userClickedPattern.length - 1);
});

$(document).on("keydown", function() { // Calling the nextSequence function when the first key is pressed
  if(!started) {
    //nextSequence();
    //$("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


function nextSequence() {

  userClickedPattern = [];
  level++; // Increases the level by one
  $("#level-title").text("Level " + level); // Changes the h1 element to the number of the level game

  var randomNumber =  Math.floor(Math.random() * 4);  // selecting randomly one of the numbers (0,1,2,3)
  var randomChosenColour = buttonColours[randomNumber]; // associating the random number above to the colours of buttonColours
  gamePattern.push(randomChosenColour); // pushing the colour into the array gamePattern

  $("#" + randomChosenColour).fadeIn(duration = 100).fadeOut(duration = 100).fadeIn(duration = 100); // Flashing the randomChosenColour
  playSound(randomChosenColour); // Play the corresponding audio of the randomChosenColour
};

function playSound(name) { // Function that plays the audio corresponding to the parameter name
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) { // Function that changes the style of the pressed button by 100 miliseconds
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if ((userClickedPattern.length) === gamePattern.length) {
      setTimeout( function() {
        nextSequence()
      }, 1000);
    }
  }else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over! Press Any Key to Restart");
    startOver()
  }
}

function startOver() {
  started = false;
  gamePattern = [];
  level = 0;
}
