const buttonColors = [ 'red', 'blue', 'green', 'yellow' ];

let gamePattern = [];

let userClickedPattern = [];

let started = false;

let level = 0;

$(document).keypress(function() {
	if (started === false) {
		$('h1').text('Level ' + level);
		nextSequence();
		started = true;
	}
});

$('.btn').click(function() {
	let userChosenColor = this.id;

	userClickedPattern.push(userChosenColor);

	let currentLevel = userClickedPattern.length - 1;

	playSound(userChosenColor);

	animatePress(userChosenColor);

	checkAnswer(currentLevel);
});

function nextSequence() {
	userClickedPattern = [];

	level++;

	$('h1').text('Level ' + level);

	let randomNumber = Math.floor(Math.random() * 4);

	let randomChosenColor = buttonColors[randomNumber];

	gamePattern.push(randomChosenColor);

	$('#' + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

	playSound(randomChosenColor);
}

function playSound(name) {
	let audio = new Audio('sounds/' + name + '.mp3');

	audio.play();
}

function animatePress(currentColor) {
	$('#' + currentColor).addClass('pressed');

	setTimeout(function() {
		$('#' + currentColor).removeClass('pressed');
	}, 100);
}

function checkAnswer(currentLevel) {
	if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
		if (gamePattern.length === userClickedPattern.length) {
			setTimeout(function() {
				nextSequence();

				userClickedPattern = [];
			}, 1000);
		}
	} else {
		startOver();

		playSound('wrong');

		$('body').addClass('game-over');

		setTimeout(function() {
			$('body').removeClass('game-over');
		}, 200);

		$('h1').text('Game over, Press Any key to Restart');
	}
}

function startOver() {
	started = false;
	gamePattern = [];
	level = 0;
}
