const questions = [
    {
        question : "What is the chemical symbol for gold?" ,
        answers: [
            { text : "Au" , correct : true},
            { text : "pb" , correct : false},
            { text : "gd" , correct : false},
            { text : "ni" , correct : false},
        ]
    },
    {
        question : "Which is the largest desert in the world?" ,
        answers: [
            { text : " Sahara" , correct : false},
            { text : "Arctic Desert" , correct : false},
            { text : "Antarctic Desert" , correct : true},
            { text : "Gobi Desert" , correct : false},
        ]
    },
    {
        question : "What does 'HTTP' stand for in web technology?" ,
        answers: [
            { text : " Hyper Text Transfer Protocol" , correct : true},
            { text : "High-Tech Transfer Protocol" , correct : false},
            { text : "Hyper Text Transmission Process" , correct : false},
            { text : "High-Tech Transmission Process " , correct : false},
        ]

    },
    {
        question : "Who was the first President of the United States?" ,
        answers: [
            { text : "  Abraham Lincoln" , correct : false},
            { text : "George Washington" , correct : true},
            { text : "Thomas Jefferson" , correct : false},
            { text : "John Adams" , correct : false},
        ]

    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn")

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score= 0;
    nextButton.innerHTML = "Next";
    showQuestion();

}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer)
    });
}
 


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = " block";
}



function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();

    }else{
        showScore();
    }
}



nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();
