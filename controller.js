let questionBank = new Array();
let gUrl="https://cdn.glitch.com/22f42b5d-6168-48d8-b680-55af94b75e48%2F"
  let questionNumber=0;
  
  var sidebar=".sidebar";
  var body="body";
  var stage="#game1";
  var stage2 = new Object;
  var questionLock = false;
  var numberOfQuestions;
  var score=0;
  /*originally in displayQuestion()*/
  var rnd=1;
  var q1;
  var q2;
  var q3;

$(document).ready(function () {
  
  startGame();  
  
  function startGame(){
  
  $.getJSON('data.json', function(data) {
    //alert('getJson ');
    /*loop that populates questionBank array with question and answers for all data in JSON*/
    for(let i=0; i<data.quizlist.length; i++){
      questionBank[i]=new Array;
      questionBank[i][0]=data.quizlist[i].question;
      questionBank[i][1]=data.quizlist[i].option1;
      questionBank[i][2]=data.quizlist[i].option2;
      questionBank[i][3]=data.quizlist[i].option3;
      //console.log(questionBank);
      
    }
    
    numberOfQuestions = questionBank.length;
    //alert('getJson done ' + numberOfQuestions);
    displayQuestion();
    
  })
  }
                     
  
 
  
  
  function displayQuestion(){
    //alert('displayQuestion ' + questionNumber);
    rnd=Math.random()*3; 
    rnd=Math.ceil(rnd);
 
    var q1;
    var q2;
    var q3;
    
    if(rnd==1){q1=questionBank[questionNumber][1];q2=questionBank[questionNumber][2];q3=questionBank[questionNumber][3];}
    if(rnd==2){q2=questionBank[questionNumber][1];q3=questionBank[questionNumber][2];q1=questionBank[questionNumber][3];}
    if(rnd==3){q3=questionBank[questionNumber][1];q1=questionBank[questionNumber][2];q2=questionBank[questionNumber][3];}        
    

    //$(stage).append('<div class="questionPix">' + questionNumber + '</div><div id="1" class="answerPix"><img src= "'assets/+q1+'"></div><div id="2" class="answerPix"> <img src="assets/'+q2+'"></div><div id="3" class="answerPix"><img src="assets/'+q3+'"></div>');
    $(stage).append('<div class="questionPix"> <img src="' + gUrl+questionBank[questionNumber][0] + '"</div><div class="answer-container"><div id="1" class="answerPix"><img src="' + gUrl+q1 + '"></div><div id="2" class="answerPix"> <img src="' + gUrl+q2+ '"></div><div id="3" class="answerPix"><img src="' + gUrl+q3+'"></div>');
    $(sidebar).append("SCORE: " + score);

  
 // $(stage).append('<div class="questionPix">' + questionBank[questionNumber][0] + '</div><div id="1" class="answerPix"><img src="assets/'+q1+'"></div><div id="2" class="answerPix"> <img src="assets/'+q2+'"></div><div id="3" class="answerPix"><img src="assets/'+q3+'"></div>');
  
 $('.answerPix').click(function(){
    if(questionLock==false) {
      questionLock=true;
      /*correct answer*/
      if(this.id==rnd){
        $(stage).append('<div class="feedback1">CORRECT</div>');
        $(score).val(score++);
      }
      
      
      /*wrong answer*/
      if(this.id!=rnd){
      $(stage).append('<div class="feedback2">WRONG</div>');
      }
      setTimeout(function(){changeQuestion()},1000);
      
    }})
   
    


  }
  
  
  
  
  
  //can we try to make a function to display the score on the sidebar?
  
  function changeQuestion(){
    questionNumber++;
     
    if(stage=="#game1"){stage2="#game1";stage="#game2";}
    else{stage2="#game2";stage="#game1";}
    
    
    $(stage2).animate({"right": "+=1000px"},"slow", function() {$(stage2).css('right','-1000px');$(stage2).empty();}); 
    $(sidebar).empty(score);
    $(stage).animate({"right": "+=1000px"},"slow", function() {questionLock=false;});
 
    
    /*$(stage2).animate({"right": "+=800px"},"slow", function() {$(stage2).css('right','-800px');$(stage2).empty();});
    $(stage).animate({"right": "+=800px"},"slow", function() {questionLock=false;});*/
    
    
    if(questionNumber<numberOfQuestions){displayQuestion();}
    else{displayFinalSlide();}
  }
                  
                  
  function displayFinalSlide(){
    $(stage).append('<div class="questionText">You have finished the quiz!<br><br>Total questions: '+numberOfQuestions+'<br>Correct answers: '+score+'</div>');
    $(sidebar).append("CONGRATS!");
    
  }
});