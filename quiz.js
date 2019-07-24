function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

var game = {
  current: 0,
  score: {
    total: 0,
    correct: 0,
  },
  items: [
    {
      question: "Welches Tier macht 'muuuuh'?",
      answer: "Kuh",
      others: ["Pferd", "Katze", "Hund"],
    },
    {
      question: "Wenn wir [Verhalten] zulassen, wird es bald [Extrem] geben!",
      answer: "Dammbruch",
      others: ["Strohmann", "Zirkelschluss", "Sonderfall"],
    },
    {
      question: "Welches Tier macht 'miau'?",
      answer: "Katze",
      others: ["Pferd", "Kuh", "Hund"],
    },
  ]
}

var quiz = $(".quiz")
var score = quiz.find('.score')
var buttons = quiz.find(".btn-secondary")
var nextButton = quiz.find(".next")
shuffle(game.items)

function showQuestion() {
  console.log('showQuestion', game.current)
  var item = game.items[game.current]
  var answers = shuffle(item.others.concat([item.answer]))
  quiz.find(".question").text(item.question)
  buttons.off('click').click(handleAnswer).each(function (index) {
    $(this).text(answers[index])
  })
  quiz.removeAttr("hidden")
  nextButton.prop("disabled", true)
  buttons.prop("disabled", false)
}

function proceed() {
  game.current += 1
  buttons.removeClass("btn-success btn-danger")
  if (game.current > game.items.length - 1) {
    console.log('reset current to 0, from', game.current)
    game.current = 0
  }
  showQuestion()
}

function handleAnswer() {
  var result
  var item = game.items[game.current]
  var clickedButton = $(this)
  if (item.answer === clickedButton.text()) {
    result = "Korrekt!"
    game.score.correct += 1
  } else {
    result = "Falsch! Die richtige Antwort ist: " + item.answer + "."
  }
  buttons.each(function (index) {
    if (item.answer === $(this).text()) {
      $(this).addClass("btn-success")
    } else if (this === clickedButton[0]) {
      $(this).addClass("btn-danger")
    }
  })
  game.score.total += 1
  nextButton.prop("disabled", false)
  buttons.prop("disabled", true)

  score.text("Punkte: " + game.score.correct + "/" + game.score.total)
}

showQuestion()
nextButton.click(proceed)