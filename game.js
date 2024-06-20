var buttonColours=["red","yellow","green","blue"]
var gamePattern=[];
var randomChosenColour;
var userClickedPattern=[];
var userChosenColor;
var level=0;
var gameStarted=false;


//function to start the game
function startGame(){
    if(!gameStarted){
        userClickedPattern=[];
        gamePattern=[];
        nextSequence();
        $("h1").text("Level "+ level);
        gameStarted=true;
    }
}
$(document).keydown(function() {
    startGame();
});

//function to choose random buttons
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber=Math.floor(Math.random()*4);
    randomChosenColour= buttonColours[randomNumber];
    gamePattern.push(randomChosenColour); 
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100, function() {
        playSound(randomChosenColour);
    });
    
       
}



//function to make the button picked randomly to play a sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
// function to animate the clicked buttons
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed"); 
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);  
}

//function to check what buttons have been clicked and add sound
$(".btn").on("click", function(){
    userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    //$("h1").text("Level "+ level);


});

// Function to check answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
     } 

    else {
        $("body").addClass("game-over");
        setTimeout(function() {
            $("h1").text("Game Over Press Any Key To Restart");
            $("body").removeClass("game-over");
        }, 200);
        startOver();
        
    }
}

//function to start game all over   
function startOver(){
    level=0;
    userClickedPattern=[];
    gamePattern=[];
    gameStarted=false;
    
}