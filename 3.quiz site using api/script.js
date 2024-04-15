const apiKey = "kCVEvoQ6Y64MahToMLEuTfK1ZkkgX4zpIIMW5Ju8";
const apiUrl="https://quizapi.io/api/v1/questions?";/* apiKey=${apiKey}&limit=${limit} */
let limit =0;
let category="";
let questions={};
let difficulty="";
currentQuestionIndex = 0;
            score = 0;




const saveBtn=document.getElementById("save");
buttons=document.querySelectorAll(`.answer-buttons`);
const header=document.querySelector(".app h1")
const answerButtons = document.getElementById("answer-buttons");
const  questionEl=document.getElementById('question');

const nextButton = document.getElementById("next-btn");


function makeChoice(){
    nextButton.style.display = "none";
    questionEl.innerHTML='Choose Your Interest Of startQuiz';
    header.innerHTML=`Quiz Site Select Category`;
    answerButtons.innerHTML=`<div class="category-list"><div class="row">
    <button class="button" onclick="storeValue(this)">Linux</button>
    <button class="button" onclick="storeValue(this)">Bash</button>
    <button class="button" onclick="storeValue(this)">Uncategorized</button>
    <button class="button" onclick="storeValue(this)">Docker</button>
  </div>
  
  <div class="row">
    <button class="button" onclick="storeValue(this)">SQL</button>
    <button class="button" onclick="storeValue(this)">CMS</button>
    <button class="button" onclick="storeValue(this)">Code</button>
    <button class="button" onclick="storeValue(this)">DevOps</button>
  </div>
  </div>`;

}
function storeValue(button) {
    var clickedButtonValue = button.innerHTML;
    // Here you can do whatever you want with the clickedButtonValue
    console.log("Clicked button value:", clickedButtonValue);
    category=clickedButtonValue;
    function showLimit(){
        questionEl.innerHTML='How many questions you want to attempt?';
        header.innerHTML=`Quiz Site Select Limit `;
        answerButtons.innerHTML=`<div>
                                                <span id="rangeValue">0</span>
                                                <input class="range" type="range" name "limitRange" value="0" min="1"
                                                max="15" onChange="rangeSlide(this.value)" onmousemove="rangeSlide(this.value)">
                                                </div>
                                                <form id="difficultyForm">
    <label><input type="radio" name="difficulty" value="easy"> <span class="radio-label">Easy</span></label><br>
    <label><input type="radio" name="difficulty" value="medium"> <span class="radio-label">Medium</span></label><br>
    <label><input type="radio" name="difficulty" value="hard"> <span class="radio-label">Hard</span></label><br>
</form>

                                                `;  
                                                }

                                
      showLimit();
  }


  function rangeSlide(value) {
    limit = value;
    document.getElementById('rangeValue').innerHTML = value;
    console.log(limit);
    if(limit>0){
        saveBtn.style.display= 'block';
       saveBtn.addEventListener("click", submitData)
       
    }else{
        alert("alertt")
    }
    
}
function submitData() {
    var difficultyInput = document.querySelector('input[name="difficulty"]:checked');
    difficulty = difficultyInput.value;
    if (difficulty && limit) {
        console.log("Selected difficulty: " + difficulty);
        console.log("Selected range: " + limit);
        console.log(typeof(difficulty));
        startQuiz();
    } else {
        alert("Please select both a difficulty level and a range value.");
    }
}





 /*  function showLimit(){
    questionEl.innerHTML='How many questions you want to attempt?';
    header.innerHTML=`Quiz Site Select Limit `;
    answerButtons.innerHTML=`<input type="range" id="rangeInput" name="rangeInput" min="1" max="10" value="1" onclick="updateValue(this.value)">
    <span id="rangeValue">1</span>`;  
  } */

  

async function startQuiz(){
    header.innerHTML=`Searching for Questions....`;
    saveBtn.style.display= 'none';
    nextButton.style.display= 'none';
    showLoading();

    if (Object.keys(questions).length === 0) {
        const response = await fetch(apiUrl + `apiKey=${apiKey}&category=${category}&difficulty=${difficulty}&limit=${limit}`);
        if (response.status == 404) {
            console.log("object not found!");
        } else {
            const data = await response.json();
            questions = { ...data };
            console.log(questions);
            currentQuestionIndex = 0;
            score = 0;
            showQuestion();        }
    } 
/*     startQuiz();
 */}

function showLoading() {
    document.getElementById('loading').style.display = 'block';
    questionEl.style.display='none';
    answerButtons.style.display='none';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
    questionEl.style.display='block';
    answerButtons.style.display='block';
}

 function showQuestion(){
    hideLoading();
    saveBtn.style.display='none';
    nextButton.style.display='none';
    header.innerHTML=`Category:${category}, Limit:${limit}, Difficulty:${difficulty}`;
    resetState();
    

    for (let i = 0; i < questions.length; i++) {
        // Check if the current object contains the property 'correct_answer'
        if (questions[i].hasOwnProperty('correct_answer')) {
            questions.splice(i, 1);            // If the object contains the property, remove it from the array
            // Decrement the loop counter to adjust for the removed element
            i--;
        }
    }


   let index=0;
    nextButton.innerHTML = "Next";
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    console.log(questions);
    console.log(`question number is ${questionNo}`);
    console.log(Object.keys(questions).length);
    questionEl.innerHTML= questionNo+`.`+currentQuestion.question;
    let answerIndex = 0;
    for (const [key, value] of Object.entries(currentQuestion.answers)) {
        const button = document.createElement("button");
        button.classList.add('btn');


        /* button.forEach((button, index) => {
            // Add a class to the button based on the current index
            button.classList.add('btn' + (index + 1));
        }); */


        if (value !== null) {
            button.textContent = `${String.fromCharCode(97 + answerIndex)}.${value}`;
        }
                if (button.textContent) {
            button.classList.add('btn' + (index + 1));
            index++;
        }
        console.log(currentQuestion.correct_answer);
        /* if(currentQuestion.correct_answer){
        
            button.dataset.correct= currentQuestion.correct_answer;
    } */
    if (button.classList.contains('btn1')&&currentQuestion.correct_answer=='answer_a') {
        button.dataset.correct=true;
        
    } else if(button.classList.contains('btn2')&&currentQuestion.correct_answer=='answer_b') {
        button.dataset.correct=true;
    }
    else if(button.classList.contains('btn3')&&currentQuestion.correct_answer=='answer_c') {
        button.dataset.correct=true;
    }
    else if(button.classList.contains('btn4')&&currentQuestion.correct_answer=='answer_d') {
        button.dataset.correct=true;
    }
    else if(button.classList.contains('btn5')&&currentQuestion.correct_answer=='answer_e') {
        button.dataset.correct=true;
    }
    else if(button.classList.contains('btn6')&&currentQuestion.correct_answer=='answer_f') {
        button.dataset.correct=true;
    }
    if (value.trim() !== "") {
        answerButtons.appendChild(button);
    }
    
        button.addEventListener("click", () => selectAnswer(button));
        
    
        
        answerIndex++;
    }
    
 }

 function selectAnswer(buttoncall){
    const selectedBtn = buttoncall;
    const isCorrect = selectedBtn.dataset.correct;
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionEl.innerHTML = `You scored ${score} out of ${Object.keys(questions).length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display = "block";
    questions = {};
}
  function resetState(){
    nextButton.style.display ="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
  }

  function handleNextButton(){
    console.log(`index ${currentQuestionIndex}and length ${Object.keys(questions).length}`);

    if(currentQuestionIndex <= Object.keys(questions).length-1){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    currentQuestionIndex+=1;

    if(currentQuestionIndex <= Object.keys(questions).length){
        handleNextButton();
    }else{
        makeChoice();
    }
});


/* startQuiz();
 */
makeChoice();