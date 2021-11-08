"use strict";

/*

   SD Native Plants Slide Show Function
      carousel() displays a slideshow of images 
      with their associated captions on the
      home page 
  
   Author: David Richards
   Date:   2021-10-31

   Filename: slideshow.js
*/

// Subtitle captions for the main page slideshow
var plantCards = [
   ["css", "Chamise", "Adenostoma fasciculatum", "img/coastalsagescrub/chamise3.jpg", "Adenostoma fasciculatum"],
   ["css", "California Sagebrush", "Artemisia californica", "img/coastalsagescrub/chamise1.jpg", "Artemisia californica"],
   ["css", "Mission Manzanita", "Xylococcus bicolor", "img/coastalsagescrub/missionmanzanita1.jpg", "Xylococcus bicolor"],
   ["css", "Lemonade Berry", "Rhus integrifolia", "img/coastalsagescrub/lemonadeberry1.jpg", "Rhus integrifolia"],
   ["css", "White Sage", "Salvia apiana", "img/coastalsagescrub/whitesage1.jpg"],
   ["css", "Black Sage", "Salvia mellifera", "img/coastalsagescrub/blacksage1.jpg"],
   ["css", "Coastal Live Oak", "Quercus agrifolia", "img/coastalsagescrub/coastalliveoak1.jpg"],
   ["chaparral", "Laurel Sumac", "Malosma laurina", "img/chaparral/laurelsumac1.jpg"],
   ["chaparral", "Engelmann's Oak", "Quercus engelmannii", "img/chaparral/eldermannsoak1.jpg"],
   ["chaparral", "Chaparral Broom", "Baccharis serothoides", "img/chaparral/chaparralbroom2.jpg"],
];

var i = 0;

document.getElementById("slideshow").innerHTML = "<h3>" + plantCards[i][1] + "</h3><i>" + plantCards[i][2] + "</i><img alt='' src='" + plantCards[i][3] + "' />";

// Cycles through images in the slideshow folder
function carousel(direction) {
   switch (direction) {
      case "up":
         i++;
         if (i >= plantCards.length) {
            i = 0;
         }
         break;

      case "down":
         i--;
         if (i < 0) {
            i = plantCards.length - 1;
         }
         break;
   }

   document.getElementById("slideshow").innerHTML = "<h3>" + plantCards[i][1] + "</h3><i>" + plantCards[i][2] + "</i><img alt='' src='" + plantCards[i][3] + "' />";
}

/* =======================
// autoCarousel() function
// Used on flashcards page
   ======================= */

// Set checkbox state vars
var loop;
var checkedState = document.getElementById("autoCarousel");

// Set to unchecked on page reload
checkedState.checked = false;

function autoCarousel() {
   if (checkedState.checked == false) {
      clearInterval(loop);
   }

   if (checkedState.checked == true) {
      loop = setInterval("carousel('up')", 5000);
   }
}

// displayCards() function
var categoryID;
var categoryName;

function displayCards(category) {
   document.getElementById(categoryID).innerHTML = "<div class='categoryHeader' id='" + category + "'>" + category + "</div>";
   categoryID = "display" + category;
   for (let j = 0; j < plantCards.length; j++) {
      if (plantCards[j][0] == category) {
         document.getElementById(categoryID).innerHTML += "<div class='plantCard'><h3>" + plantCards[j][1] + "</h3><img alt='' src='" + plantCards[j][2] + "' /></div>";
      }
   }
}

// hideCards() function
function hideCards(category) {
   categoryID = "display" + category;
   document.getElementById(categoryID).innerHTML = "";
}

/* =======================
   hideName() function
   Hides the name of the plant to be identified
   Used on flashcards page 
   ======================= */
var checkedState2 = document.getElementById("hideName");
checkedState2.checked = false;

function hideName() {
   const display = document.querySelector("style");
   if (checkedState2.checked == true) {
      display.innerHTML = "#slideshow h3, #slideshow i {visibility: hidden;}";
   } else {
      display.innerHTML = "#slideshow h3, #slideshow i {visibility: visible;}";
   }
}
