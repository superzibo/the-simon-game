const buttonColours = ["red","blue","green","yellow"];

var gamePattern = []; 
var userClickedPattern = [];
var level = 0;

// detects the first press of the game
var gameStart = false;

// start the game when first key pressed
 $(document).keydown(function(e){
    if (gameStart === false){
        nextSequence();
        gameStart = true;
    }else {
        console.log("game already started!");
    } 
 }) 

// next sequence of the game
function nextSequence() {

    // init 
    userClickedPattern = [];

    // generates a random number between 0 to 3
    var randomNumber = Math.floor(Math.random()*4);

    // pick a random color base on the result of random number
    var pickedColour = buttonColours[randomNumber];

    // play sound and animation
    playSound(pickedColour);
    flash(pickedColour);

    // push the picked color to gamePattern array
    gamePattern.push(pickedColour);

    // update title by current level and increment level
    updateTitle(level);
    level++;
}

// play sound
function playSound(btnColour) {
    var audioURL = "/sounds/" + btnColour + ".mp3";
    var audio = new Audio(audioURL)
    audio.play();
}

// press animation
function animationPress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function (){
        $("#"+currentColour).removeClass("pressed");    
      }, 200); 
}

// flash
function flash(currentColour){
    $("#"+currentColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

// update title
function updateTitle(currentLevel){
    $("h1").text("level " + currentLevel);
}

// store the user clicked button to the userClickedPattern array
$(".btn").click(function(){
    if (gameStart){
        userClickedPattern.push(this.id);
        playSound(this.id);
        animationPress(this.id)
        //console.log(userClickedPattern);
        checkAnswer();

        if (checkAnswer()){
            if (userClickedPattern.length == level){
                
                setTimeout(function (){
                    nextSequence();  
                  }, 1000); 
            }
        }else{
            gameOver();
        }
    }else{
        alert("press a key to start the game first!");
    }
 })


// check if the user clicks wrong...
function checkAnswer(){
    const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    var slicedGamePattern = gamePattern.slice(0,userClickedPattern.length);
    if (equals(slicedGamePattern,userClickedPattern)){
        return true;
    }else{
        return false;
    }
}

// game over
function gameOver(){
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function (){
        $("body").removeClass("game-over"); 
      }, 400); 
    gameStart = false;
    level = 0;
    gamePattern = [];
    $("h1").text("Game Over, Press A Key to Restart the Game!");
}




