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
var feedback = quiz.find('.feedback')
var score = quiz.find('.score')
shuffle(game.items)

function showQuestion() {
  console.log('showQuestion', game.current)
  var item = game.items[game.current]
  var answers = shuffle(item.others.concat([item.answer]))
  quiz.find(".question").text(item.question)
  quiz.find("button").off('click').click(handleAnswer).each(function (index) {
    $(this).text(answers[index])
  })
  quiz.removeAttr("hidden")
}

function proceed() {
  feedback.text("...")
  game.current += 1
  if (game.current > game.items.length - 1) {
    console.log('reset current to 0, from', game.current)
    game.current = 0
  }
  showQuestion()
}

function handleAnswer() {
  var result
  var item = game.items[game.current]
  if (item.answer === $(this).text()) {
    result = "Korrekt!"
    game.score.correct += 1
  } else {
    result = "Falsch! Die richtige Antwort ist: " + item.answer + "."
  }
  game.score.total += 1
  feedback.text(result + " Lade nächste Frage...")

  score.text("Punkte: " + game.score.correct + "/" + game.score.total)

  setTimeout(proceed, 3000)
  $(this).blur()
}

showQuestion()