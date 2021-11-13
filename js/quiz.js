"use strict";

/* 

Author: David Richards
Date:   2021-10-31

Filename: quiz.js

*/

var i = 0;

// Shuffle plantCards using Durstenfeld shuffle algorithm
function shuffleCards(array) {
   for (var i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
   }
   return array;
}

var randomQuiz = shuffleCards(plantCards);
var options = [];

function setOptions(cards, i) {
   let answer = i;
   let option1 = Math.floor(Math.random() * cards.length);
   let option2 = Math.floor(Math.random() * cards.length);
   let option3 = Math.floor(Math.random() * cards.length);

   // Make sure answers aren't duplicated
   while (answer == option1 || option1 == option2 || option2 == option3 || answer == option2 || answer == option3) {
      option1 = Math.floor(Math.random() * cards.length);
      option2 = Math.floor(Math.random() * cards.length);
      option3 = Math.floor(Math.random() * cards.length);
   }

   // Set options, randomize order
   options[i] = [[answer, option1, option2, option3], answer];
   options[i] = [shuffleCards(options[i][0]), options[i][1]];
}

/* NESTED ARRAYS
    options[i][0][1-3][2] = 
        i = for that item in the setOptions() while loop
        0 = the first value in the array is a nested array (1 = the answer)  
        1-3 = the randomly selected option value, shuffled
        2 = the name of the plant (this array is stored in the slideshow.js file)

        randomQuiz[i][0-2] =
        i = item in the shuffled list of plants
        0 = plant category
        1 = show plant name
        2 = species name
*/
function getOptions(i) {
   document.getElementById("quiz").innerHTML +=
      "<div class='question'><h4> Question " +
      (i + 1) +
      ": " +
      randomQuiz[i][1] +
      "</h4><select class='selection' size='4'><option value='" +
      options[i][0][0] +
      "'>A: " +
      randomQuiz[options[i][0][0]][2] +
      "</option><br /><option value='" +
      options[i][0][1] +
      "'>B: " +
      randomQuiz[options[i][0][1]][2] +
      "</option><br /><option value='" +
      options[i][0][2] +
      "'>C: " +
      randomQuiz[options[i][0][2]][2] +
      "</option><br /><option value='" +
      options[i][0][3] +
      "'>D: " +
      randomQuiz[options[i][0][3]][2] +
      "</option><br /><div class='answer'>Answer: " +
      randomQuiz[options[i][1]][2] +
      "</div></selection></div>";
}

// Grade items
var choices = [];
function gradeQuestions() {
   document.getElementById("score").innerHTML = "Results:<br />";
   choices = document.getElementsByClassName("selection");
   var correct = 0;
   var incorrect = 0;
   var totalPoints = 0;

   for (i = 0; i < 10; i++) {
      if (typeof randomQuiz[choices[i].value] === "undefined") {
         document.getElementById("score").innerHTML += "<li>Not answered</li>";
         incorrect++;
      } else if (randomQuiz[options[i][1]][2] === randomQuiz[choices[i].value][2]) {
         document.getElementById("score").innerHTML += "<li>" + randomQuiz[options[i][1]][1] + "</li>";
         document.getElementById("score").innerHTML += "Correct: " + randomQuiz[choices[i].value][2];
         correct++;
      } else {
         document.getElementById("score").innerHTML += "<li>" + randomQuiz[options[i][1]][1] + "</li>";
         document.getElementById("score").innerHTML += "Incorrect! Correct answer is: " + randomQuiz[options[i][1]][2] + " |  You chose: " + randomQuiz[choices[i].value][2];
         incorrect++;
      }
   }

   totalPoints = correct * 10;
   document.getElementById("buttons").innerHTML = "<button onclick='initialize()'>Reset</button>";
   document.getElementById("score").innerHTML += "<br />Score: " + totalPoints + "%";
}

function initialize() {
   randomQuiz = shuffleCards(plantCards);
   document.getElementById("buttons").innerHTML = "<button onclick='gradeQuestions()'>Check Score</button>";
   document.getElementById("quiz").innerHTML = "";
   document.getElementById("score").innerHTML = "";
   for (i = 0; i < 10; i++) {
      setOptions(randomQuiz, i);
      getOptions(i);
   }
}

initialize();
