
var startButton = document.querySelector(".start-button");
var timerElement = document.querySelector(".timer-element");
var answerTrue = document.querySelector(".true-answer");
var answerTrue = document.querySelector(".false-answer");
var questionDiv = document.querySelector(".questions");

var timer;
var timerCount = 60;

//Timer Function
function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount === 0) {
          clearInterval(timer);
          alert("time is done");
        }
      }, 1000);
      //when start the quiz, description getting hide and questions getting show
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('questions').style.display = 'block';
}
//Gets Value from Input and Makes a List.
function makeList() {
    var x = document.getElementById("myText").value;
    document.getElementById(
      "demo").innerHTML = "<table style='width:100%'><tr><th>Name</th><th>Score</th><th>Time Score</th></tr><tr style='color: rgb(228, 217, 203)'><th>" 
      + x + "</th><th>" 
      + score + "</th><th>" 
      + timerCount + "</th></tr></table>";
}
//Refreshes the Page When Reset Button is Clicked.
function reset(){
    location.reload();
}

    // Position of the user during quiz 
    var pos = 0, test, test_status, question, choice, choices, chA, chB, chC, chD, correct = 0, wrong = 0, score = 0;

    // Questions Array
    var questions = [
      {
          question: "Which of the following is a valid JavaScript identifier?",
          a: "pieceof Cake",
          b: "$100",
          c: "2ndOne",
          d: "else",
          answer: "B"
        },
      {
          question: "Which of the following literal is written correctly?",
          a: "35",
          b: "5,284",
          c: "4.34",
          d: "FALSE",
          answer: "A"
        },
      {
          question: "Which of the following phrase is an example for camel case identifier?",
          a: "timoday",
          b: "timeOday",
          c: "timeofday",
          d: "timeOfDay",
          answer: "D"
        }
      ];

    // Shortcut for Id selection 
    function get(x){
      return document.getElementById(x);
    }

    // Renders a Question
    function renderQuestion(){
      test = get("test");
      document.getElementById('div1').style.display ='none';
      document.getElementById('div2').style.display ='none';
    
      if(pos >= questions.length){
        questionPercent = Math.floor(100 / questions.length);
        score = correct * questionPercent;
        if (correct === questions.length){
            score = 100;
        }
        test.innerHTML = "<h2>True: "+correct+"</h2><h2>False: "+wrong+"</h2><h2>Score: "+score+"%</h2><h2>Timer: "+timerCount+"</h2>";
        
        get("test_status").innerHTML = "Quiz completed";
        document.getElementById('score-list').style.display = "block";
        clearInterval(timer);

        // Resests the Variable
        pos = 0;
        correct = 0;
        wrong = 0;
        return false;
      }
      get("test_status").innerHTML = "Question "+(pos+1)+" of "+questions.length;

      question = questions[pos].question;
      chA = questions[pos].a;
      chB = questions[pos].b;
      chC = questions[pos].c;
      chD = questions[pos].d;
      // Displays Question
      test.innerHTML = "<h3>"+question+"</h3>";
      // Displays Options
      test.innerHTML += "<label> <input type='radio' name='choices' value='A' onclick='checkAnswer();'> "+chA+"</label><br>";
      test.innerHTML += "<label> <input type='radio' name='choices' value='B' onclick='checkAnswer();'> "+chB+"</label><br>";
      test.innerHTML += "<label> <input type='radio' name='choices' value='C' onclick='checkAnswer();'> "+chC+"</label><br>";
      test.innerHTML += "<label> <input type='radio' name='choices' value='D' onclick='checkAnswer();'> "+chD+"</label><br><br>";
    }

    
    function checkAnswer(){
      // Loops through Question Array
      choices = document.getElementsByName("choices");
      
      for(var i=0; i<choices.length; i++){
        if(choices[i].checked){
          choice = choices[i].value;
        }
      }
      // Checks answers
      if(choice == questions[pos].answer){
        correct++;
        document.getElementById('div1').style.display ='block';
      }
      else{
        wrong++;
        timerCount-=10;
        document.getElementById('div2').style.display ='block';
      }
      pos++;
      
      //Next Question Comes within a Second When User Answers a Question.
      setTimeout(function(){
        renderQuestion();
      }, 1000); 
    }

    // Adds Event Listener to Call renderQuestion on Page Load Event
    window.addEventListener("load", renderQuestion);