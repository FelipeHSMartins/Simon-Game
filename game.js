let buttonsColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;


// Listeners

// Keyboard Pressed
$(document).keydown(function () {
    if(gameStarted === false) {
        gameStarted = true;
        nextSequence();
        $("h1").text("Level " + level);
    }
});


// Button Pressed
$(".btn").click(function() {

    let userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);

    playSound(userChoosenColor);

    playAnimation(userChoosenColor);

    
    checkAnswer();

});


// Functions

function nextSequence() {

    let randomNumber = Math.floor(Math.random() * 3);
    let randomChosenColor = buttonsColors[randomNumber];
    ++level;
    userClickedPattern = [];
    gamePattern.push(randomChosenColor);

    $("h1").text("Level " + level);
    
    playSound(randomChosenColor);
    playAnimation(randomChosenColor);
}

function checkAnswer() {

    let currentIndex = userClickedPattern.length - 1
    if (userClickedPattern[currentIndex] === gamePattern[currentIndex]) {
        console.log("Right");

        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        gameOverAnimation();
        startOver ()
    }
}

function playAnimation(randomChosenColor) {

    let colorClass = "." + randomChosenColor;

    $(colorClass).addClass("pressed");

    setTimeout(function () {
        $(colorClass).removeClass("pressed");
    }, 100);
}

function gameOverAnimation() {
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    
}

function playSound(name) {
    let audioFile = "./sounds/" + name + ".mp3";

    let audio = new Audio(audioFile);

    audio.play();
}

function startOver () {
    level = 0;
    gameStarted = false;
    gamePattern = [];
}