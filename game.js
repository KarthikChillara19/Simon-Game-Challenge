var buttonColors = ["red", "green", "yellow", "blue"];

var gamePattern = [];
var userCLickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
});


$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userCLickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userCLickedPattern.length-1);
    });

function nextSequence(){
    userCLickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+ randomChosenColor).fadeOut(75).fadeIn(75);
    playSound(randomChosenColor);
    
};


function checkAnswer(currentLevel){
    console.log(gamePattern);
    console.log(userCLickedPattern);

    if (userCLickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success");

        if(userCLickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence()
            }, 1000);
        }

    } else {
        console.log("Failure");
        var wrong = new Audio('/Users/karthikchillara/Documents/Coding/Vscode/Web DV/Simon Game Challenge Starting Files/sounds/wrong.mp3');
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over!\nPress any button to restart.");
        $(document).keypress(function(){
            startOver();
        });
    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

// var randomChosenColor = buttonColors[nextSequence()];
// gamePattern.push(randomChosenColor);
// playSound(gamePattern);

// $("#"+ randomChosenColor).fadeOut(75).fadeIn(75);
// var color = new Audio('/Users/karthikchillara/Documents/Coding/Vscode/Web DV/Simon Game Challenge Starting Files/sounds/'+randomChosenColor+'.mp3');
// color.play();

function playSound(name){
    var color = new Audio('/Users/karthikchillara/Documents/Coding/Vscode/Web DV/Simon Game Challenge Starting Files/sounds/'+name+'.mp3');
    color.play();
}



function animatePress(currentColour){
        $("#"+currentColour).addClass("pressed");
        setTimeout(function(){
            $("#"+currentColour).removeClass("pressed");
        }, 75);
}






// $(document).keypress(function(){
//     if (gamePattern == userCLickedPattern) {
//         level++;
//     }
//     else {
//         $("h1").text("Game Over");
//         playSound("wrong");
//     }

//         $("h1").text("Level "+level);
//         nextSequence(level);
// });