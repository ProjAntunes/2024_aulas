const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button final"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  {
    question: "Qual quais sao os principais metas da ODS 14?",
    answers: [
      { text: "Reduzir a emissao de CO2", correct: false },
      { text: "Essa ODS não existe", correct: false },
      { text: "Previnir a poluiçao marinha", correct: true },
      { text: "Erradicar a fome", correct: false }
    ]
  },
  {
    question: "Quais são os desafios para resolver os problemas da vida marinha? ",
    answers: [
      { text: "Sobrepesca,e poluição marinha", correct: true },
      { text: "Desigualdade de gênero e acesso a educaçao", correct: false },
      { text: "Altos niveis de poluição na Terra", correct: false },
      { text: "Os vários paises que passam fome", correct: false }
    ]
  },
  {
    question: 'Qual é o impacto do plástico nos oceanos?',
    answers: [
      { text: 'Plastico nos oceanos pode sufucar e ferir a vida marinha', correct: true },
      { text: 'O plastico se dissolve rapidamente', correct: false },
      { text: 'nNenhum, o plastico não causa nenhum dano', correct: false },
      { text: "Nenhuma das alternativas", correct: false }
    ]
  },
  {
    question: 'A ODS 14 tem o objetivo de promover a conservação dos ecossistemas marinhos e a gestão sustentável das zonas pesqueiras até 2030',
    answers: [
      { text: "falso", correct: false },
      { text: "Verdadeiro", correct: true }
    ]
  },
  {
    question: 'Como reduzir os niveis de poluição nos oceanos',
    answers: [
      { text: 'Usando energia renovavel, e contribuindo na economia', correct: false },
      { text: 'Reduzindo o uso de plástico descartavéis ', correct: true },
      { text: 'Continuar com Hábitos de jogar lixo no mar', correct: false },
      { text: 'Comprando produtos mais caros', correct: false }
    ]
  },
]