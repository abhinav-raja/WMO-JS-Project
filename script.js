//Get some elements that we'll need later
const setupDisplayEl = document.getElementById('setup');
const deliveryDisplayEl = document.getElementById('delivery');
const newJokeBtn = document.getElementById('newJokeBtn');
const deliveryRevealBtn = document.getElementById('deliveryRevealBtn');

//Functions to animate fading out and fading in elements
function fadeOut(id, timing=400){
  /*The animate function restores the element's original style after the animation,
  so we need to manually set its final opacity to 0*/
  document.getElementById(id).style.opacity = 0;
  document.getElementById(id).animate([
      {opacity: 1},
      {opacity: 0}
    ], 
    {
      duration: timing,
      iterations: 1,
      easing: "linear"
    })
}

function fadeIn(id, timing=400){
  document.getElementById(id).style.opacity = 1;
  document.getElementById(id).animate([
      {opacity: 0},
      {opacity: 1}
    ], 
    {
      duration: timing,
      iterations: 1,
      easing: "linear"
    })
}

//Function to show the punchline of the joke and disable the button
function showDelivery(){
  fadeIn('delivery');
  deliveryRevealBtn.classList.add('disabled');
}
deliveryRevealBtn.onclick = showDelivery;

//Function to load a new joke
function loadJoke(){
  //Hide the current joke and punchline, bring up the loading message
  fadeOut('delivery');
  fadeOut('setup');
  fadeIn('loadingContainer', 200);

  //Get a joke from the Joke API
  fetch('https://v2.jokeapi.dev/joke/Misc,Pun,Spooky?format=json&type=twopart&blacklistFlags=nsfw,religious,political,racist,sexist,explicit')
  .then(response => response.json())
  .then(joke => {
    //Change the contents of the page to the new joke
    setupDisplayEl.innerText = joke.setup;
    deliveryDisplayEl.innerText = joke.delivery;

    //Show the setup, re-enable the punchline button, and hide the loading message
    deliveryRevealBtn.classList.remove('disabled');
    fadeOut('loadingContainer', 200);
    fadeIn('setup');
  });
}



//Load a new joke on first opening the page and clicking the button:
newJokeBtn.onclick = loadJoke;
window.onload = loadJoke;