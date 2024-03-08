var game = {
    sequence: [],
    start: false,
    currentIndex: 0,
}

var colorSet = ["green", "red", "yellow", "blue"];

$(document).on("keypress", (e) => {
    if (game.sequence.length === 0) {
        if ((!game.start && e.key === "a") || game.start) {
            generateNextColor();
            game.start = true;
        }
    }
})

$(".btn").on("click", (e) => {
    if (game.sequence.length !== 0) {
        var currentColor = game.sequence[game.currentIndex];
        if (currentColor === e.currentTarget.id) {
            colorPressAnimate(currentColor);
            playSound(currentColor);
            if (game.currentIndex === game.sequence.length - 1) {
                generateNextColor();
                game.currentIndex = 0;
            } else {
                game.currentIndex++;
            }
        } else {
            colorPressAnimate(currentColor);
            playSound(currentColor);
            $("body").addClass("game-over");
            playSound("wrong");
            setTimeout(() => {
                $("body").removeClass("game-over");
                $("#level-title").text("Game Over, Press Any Key to Restart")
            }, 200);
            game.currentIndex = 0;
            game.sequence = [];
        }
    }
})

function generateNextColor() {
    var nextColor = nextChoice();
    game.sequence.push(nextColor);
    setTimeout(
        () => {
            $("#" + nextColor).animate({ opacity: 0.5 }).animate({ opacity: 1 });
            colorSound(nextColor);
        }, 1000);
    setTimeout(() => { $("#level-title").text("Level " + game.sequence.length) }, 200);
}

function playSound(keyword) {
    var audio = new Audio("./sounds/" + keyword + ".mp3");
    audio.play();
}

function nextChoice() {
    var num = Math.floor(Math.random() * 4);
    var color = colorSet[num];
    return color;
}

function colorPressAnimate(color) {
    var targetBtn = $("#" + color);
    targetBtn.addClass("pressed");
    setTimeout(() => { targetBtn.removeClass("pressed") }, 200);
}