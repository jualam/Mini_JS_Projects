document.addEventListener('DOMContentLoaded',()=>{
    const startBtn = document.getElementById("start-btn");
    const nextBtn = document.getElementById("next-btn");
    const restartBtn = document.getElementById("restart-btn");
    const questionContainer = document.getElementById("question-container");
    const questionText = document.getElementById("question-text");
    const choicesList = document.getElementById("choices-list");
    const resultContainer = document.getElementById("result-container");
    const scoreDisplay = document.getElementById("score");

    const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris",
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Mars", "Venus", "Jupiter", "Saturn"],
        answer: "Mars",
    },
    {
        question: "Who wrote 'Hamlet'?",
        choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
        ],
        answer: "William Shakespeare",
    },
    {
        question: "What is the largest ocean on Earth?",
        choices: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
        answer: "Pacific Ocean",
    },
    {
        question: "What is the square root of 64?",
        choices: ["6", "7", "8", "9"],
        answer: "8",
    },
    {
        question: "Which programming language is primarily used for web development?",
        choices: ["Python", "JavaScript", "C++", "Java"],
        answer: "JavaScript",
    },
    {
        question: "Which country is home to the Great Wall?",
        choices: ["India", "China", "Japan", "South Korea"],
        answer: "China",
    },
    {
        question: "Who developed the theory of relativity?",
        choices: [
        "Isaac Newton",
        "Albert Einstein",
        "Galileo Galilei",
        "Nikola Tesla",
        ],
        answer: "Albert Einstein",
    },
    {
        question: "Which data structure works on the principle of FIFO?",
        choices: ["Stack", "Queue", "Tree", "Graph"],
        answer: "Queue",
    },
    {
        question: "What does HTML stand for?",
        choices: [
        "Hyper Trainer Marking Language",
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Hyper Text Marketing Language",
        ],
        answer: "Hyper Text Markup Language",
    },]

    let currentQuestionIndex = 0
    let score = 0
    let quizQuestions = []
    let selectedAnswer = null

    startBtn.addEventListener('click', startQuiz)

    nextBtn.addEventListener('click',()=>{
        const correctAnswer = quizQuestions[currentQuestionIndex].answer
        if(selectedAnswer === correctAnswer){
            score++
        }
        currentQuestionIndex++
        if(currentQuestionIndex < quizQuestions.length){
            showQuestion()
        }
        else{
            showResult()
        }
    })

    restartBtn.addEventListener('click',()=>{
        resultContainer.classList.add('hidden')
        startQuiz()
    })
    function startQuiz(){
        startBtn.classList.add('hidden')
        resultContainer.classList.add('hidden')
        questionContainer.classList.remove('hidden')
        quizQuestions = shuffleArray([...questions]).slice(0,5)
        currentQuestionIndex = 0
        score = 0
        showQuestion()
    }

    function showQuestion(){
        nextBtn.classList.add('hidden')
        selectedAnswer = null
        questionText.textContent=quizQuestions[currentQuestionIndex].question
        choicesList.innerHTML=''//clear previous choices
        quizQuestions[currentQuestionIndex].choices.forEach(choice=>{
            const li=document.createElement('li')
            li.textContent=choice
            li.addEventListener('click', ()=>selectAnswer(choice,li))
            choicesList.appendChild(li)
        })
    }

    function selectAnswer(choice,element){
        const allChoices = choicesList.querySelectorAll('li')
        allChoices.forEach(li=>{
            li.style.backgroundColor = "#333333"
        })
        // highlight selected option
        element.style.backgroundColor = "#6200ea"
        selectedAnswer = choice
        nextBtn.classList.remove('hidden')
    }

    function showResult(){
        questionContainer.classList.add('hidden')
        resultContainer.classList.remove('hidden')
        scoreDisplay.textContent=`${score} out of ${quizQuestions.length}`
    }

    function shuffleArray(array){
        return array.sort(()=>Math.random()-0.5)
    }

})