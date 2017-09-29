 /* ╮(╯▽╰)╭ */

var questionAnswers = [
	{
		question: "What is honey bunches of oats official slogan?",
		answers: ["One spoonful is all it takes", "Taste the joy in every spoonful", "It's what's for breakfast", "Just eat this"],
		correctAnswer: "Taste the joy in every spoonful"
	},
	{
		question: "Which of these was not an actual cereal based of a popular baked good?",
		answers: ["Cookie Crisp", "Birthday Breakfast", "Smorz", "Brownie Crunch"],
		correctAnswer: "Birthday Breakfast"
	},
	{
		question: "How many years was frexh toast crunch discontinued",
		answers: ["1 Year", "3 Years", "9 Years", "12 Years"],
		correctAnswer: "9 Years",
	},
];

var gameState ={
	correctlyAnswered: 0,
	incorrectlyAnswer: 0,
	unanswered: 0,
	totalAnswered: 0,
	
	renderCurrentQuestion: function(){ 
		var questionObject = questionAnswers[this.totalAnswered];
		//console.log("renderCurrentQuestion " + this.totalAnswered)
		var triviaHTML = gameState.createQuestionHTML(questionObject);

		$("#sec" + (this.totalAnswered+1)).removeClass("hide").append(triviaHTML);
		$(".counter").removeClass("enLrg");
		$("#counter" +this.totalAnswered).addClass("enLrg");
		gameState.bindAnswerClicks();
	},
	
	createQuestionHTML: function(questionObject){
		var sectionHTML = document.createElement('div');
		sectionHTML.className = "content-container";

		var sectionQuestion = document.createElement('p');
		sectionQuestion.innerText = questionObject.question;
		sectionHTML.appendChild(sectionQuestion);

		var questionTimer = timer.timerHTML()
		sectionHTML.appendChild(questionTimer);

		var messageContainer = document.createElement('div');
		messageContainer.className = "message-container";
		sectionHTML.appendChild(messageContainer);
		//console.log(sectionHTML);
		for(var i = 0;i<questionObject.answers.length; i++){
			//console.log("answer array length: " + questionObject.answers.length);
			var sectionAnswers = document.createElement('button');
			sectionAnswers.className = "btn";
			sectionAnswers.innerText = questionObject.answers[i];
			sectionHTML.appendChild(sectionAnswers);
		}

		return sectionHTML;
	},

	bindAnswerClicks: function(){
		$(".btn").on("click", function(){
			timer.stop();
			var chosenAnswer = $(this).text();
			var currentQuestion = questionAnswers[gameState.totalAnswered];
			gameState.totalAnswered++;
			// console.log(chosenAnswer);
			// console.log(questionAnswers[2].correctAnswer);
			gameState.validateAnswer(chosenAnswer, currentQuestion);

		});
	},
	// refactor smaller functions
	validateAnswer: function(chosenAnswer, currentQuestion) {
		if(chosenAnswer === currentQuestion.correctAnswer){
			this.correctlyAnswered++;
			this.iterateAnswered();
			
			$(".content-container > p, .btn").addClass("hide");
			
			var correctAnserWrap = $("<div>");
			correctAnserWrap.addClass("answer-txt");
			var correctAnserTxt = $("<h4>");
			correctAnserTxt.text("Nice! " + currentQuestion.correctAnswer + " is the right answer.");
			$(correctAnserWrap).append(correctAnserTxt);
			$(".message-container").append(correctAnserWrap);
			
			
			console.log("right");
			console.log("correct: " + this.correctlyAnswered);
		} else if(chosenAnswer != currentQuestion.correctAnswer) {
			this.incorrectlyAnswer++;
			this.iterateAnswered();

			$(".content-container > p, .btn").addClass("hide");

			var incorrectAnserWrap = $("<div>");
			incorrectAnserWrap.addClass("answer-txt");
			var incorrectAnserTxt = $("<h4>");
			incorrectAnserTxt.text("uh oh! " + currentQuestion.correctAnswer + " is the right answer.");
			$(incorrectAnserWrap).append(incorrectAnserTxt);
			$(".message-container").append(incorrectAnserWrap);
			
			// incorrect text
			console.log("wrong");
			console.log("incorrect: " + this.incorrectlyAnswer);
		}

		if(this.totalAnswered != questionAnswers.length){
			this.showNextQuestion();
		} else {
			this.endGame();
		}
	},

	showNextQuestion: function(){
		setTimeout(function(){
			$("#sec" + this.totalAnswered).addClass("hide");
			// get HTML for next question
			gameState.renderCurrentQuestion();
			timer.startTimer();
			// render question in the intended div
			// do whatever animation/logic to show that question
			// bind all the events for the new HTML
		}, 2000);  /// not sure how long need
	},

	iterateAnswered: function(){
		totalAnswered = this.incorrectlyAnswer + this.correctlyAnswered + this.unanswered;
		console.log("total answered: " + totalAnswered);
	},
	endGame: function() {
		$(".toggle").addClass("hide");
		$("#finish").removeClass("hide");
		$("#finish").removeClass("hide");
		var endGamescore = $("<div>");
		endGamescore.addClass("split end-game-data");
		var endGameheader = $("<h4>");
		endGameheader.text("Final Score");
		var endGameData1 = $("<p>");
		endGameData1.text("correct answers: " + this.correctlyAnswered);
		var endGameData2 = $("<p>");
		endGameData2.text("incorrect answers: " + this.incorrectlyAnswer);
		var endGameData3 = $("<p>");
		endGameData3.text("unanswered questions: " + this.unanswered);
		endGamescore.append(endGameheader, endGameData1, endGameData2, endGameData3);
		var playAginBtn = $("button");
		playAginBtn.text("play again");
		endGamescore.append(playAginBtn);
		$("#finish").append(endGamescore);

		var endGameBox = $("<div>");
		endGameBox.addClass("boxes split");
		var endGameBoxWrap = $("<div>");
		endGameBoxWrap.addClass("boxes-wrap");
		var endGameBoxWraphead1 = $("<h1>");
		endGameBoxWraphead1.text("Cer");
		var endGameBoxWraphead2 = $("<h1>");
		endGameBoxWraphead2.text("eal.");
		endGameBoxWrap.append(endGameBoxWraphead1, endGameBoxWraphead2);
		endGameBox.append(endGameBoxWrap);
		$("#finish").append(endGameBox);
	},

	resetgame: function(){
		this.correctlyAnswered = 0;
		this.incorrectlyAnswer = 0;
		this.unanswered = 0;
		this.totalAnswered = 0;
		timer.number = 0;
		$(".content-container").delete();
		$(".toggle").addClass("hide");
		$(".top-footer").addClass("hide");
	}
}

// timer
var timer = {
	intervalId: null,
	number: 10,

	timerHTML: function() {
		var timerContainer = document.createElement('div');
		timerContainer.className = "timer-container";
		var timerText = document.createElement('p');
		timerText.innerText = timer.number;
		timerContainer.appendChild(timerText);
		return timerContainer
	},

	startTimer: function(){
		if(gameState.totalAnswered === 0){
			$("#start-game").on("click", function(){
				gameState.renderCurrentQuestion();
				$("#home").addClass("hide");
				$(".top-footer").removeClass("hide");
				run();
			});
		}else {
			run();
		}	 
		function run() {
		  timer.intervalId = setInterval(timer.decrement, 1000);
		  $(".timer-container > p").text(timer.number);
		}
	},

	decrement: function(){
	  	timer.number--;
	  	console.log(timer.number);
	  	$(".timer-container > p").text(timer.number);
	  	if(timer.number == 0) {
	  		if(gameState.totalAnswered === questionAnswers.length){
	  			gameState.unanswered++;
			    gameState.totalAnswered++;
			    gameState.iterateAnswered();
	  			timer.stop();
	  			gameState.endGame();
	  		}else{
	  			$(".content-container > p, .btn").addClass("hide");
				    var noAnserWrap = $("<div>");
				    noAnserWrap.addClass("answer-txt");
					var noAnserTxt = $("<h4>");
					var currentQuestion = questionAnswers[gameState.totalAnswered];
					noAnserTxt.text("Uh Oh! You didn't answer in time. The correct anser was " + currentQuestion.correctAnswer);
					$(noAnserWrap).append(noAnserTxt);
					$(".message-container").append(noAnserWrap);

			  		gameState.unanswered++;
			  		gameState.totalAnswered++;

			  		gameState.iterateAnswered();
			  		// console.log("unanswered question: " + gameState.unanswered);
				    timer.stop();
				    gameState.showNextQuestion();

	  		}

	  	}
	},

	stop: function(){
		clearInterval(timer.intervalId);
		this.number = 10;
	}
} 

$(document).ready(function(){
	timer.startTimer();
});

// play again button click - reset function call
// end game screen show after last question
