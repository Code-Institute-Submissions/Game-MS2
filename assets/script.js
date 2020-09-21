//start the game
//shuffle the balls
//star time
//dragable componenets. Make the balls dragable and create container when to drag them.
//count how many times the user has used the scale
//check for the heavy ball when using scale
//set animation when the heavy ball is found in one side of the scale.
//Set basket to check for the heavy ball.
//Set the basket to only be used one.
//



class nameOfTheGame {
  constructor(totalTime, basketballs) {
    this.basketballsArray = basketballs;
    this.totalTime = totalTime;
    this.timeRemaining = totalTime;
    this.timer = document.getElementById('time-remaining');
  }

  startGame() {
    setTimeout(() => {
            this.shufflebasketballs();
            this.shufflegroup();
            this.countDown = this.startCountDown();
        }, 500);
    this.timeRemaining = this.totalTime;
    this.timer.innerText = this.timeRemaining;
    this.checkScale();
    this.checkBasketButton();
  }

  shufflebasketballs() {
      // Fisher-Yates (aka Knuth) Shuffle
    var currentIndex = this.basketballsArray.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = this.basketballsArray[currentIndex];
    this.basketballsArray[currentIndex] = this.basketballsArray[randomIndex];
    this.basketballsArray[randomIndex] = temporaryValue;
  }
  return this.basketballsArray;
  }
      // group of all balls in game

 shufflegroup(){
    const groupBalls = document.querySelector(".balls-container");
   var shuffleBalls = this.basketballsArray;
   for (var i= 0; i < shuffleBalls.length; i++){
      [].forEach.call(shuffleBalls, function(item){
         groupBalls.appendChild(item);
      });
   }
}
// count down for the time
 startCountDown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }


// overlays for game over and victory

 gameOver(){
    clearInterval(this.countDown);
    document.getElementById('game-over-text').classList.add('visible');
 }


//victoryOver()


//Check for the content in the scales.


// button action
checkScale(){
    const scaleCheck = document.querySelector(".scale-check");
    scaleCheck.addEventListener("click", () => {
        this.checkForHeavy();
    });
}


//Check for the data attribiute in the basketballs
checkForHeavy(){
    const leftSide = document.querySelector(".left-side");
    const leftSideDivs = Array.from(leftSide.children);
    const rightSide = document.querySelector(".right-side");
    const rightSideDivs = Array.from(rightSide.children);
  
    leftSideDivs.forEach((item) => {
    if(item.dataset.weight === 'heavy'){
        document.querySelector('.left-side').classList.add('heavier');
    }
});

    rightSideDivs.forEach((item) => {
        if(item.dataset.weight === 'heavy'){
            document.querySelector('.right-side').classList.add('heavier');

        }
    });
  
}

checkBasketButton(){
    const basketButton = document.querySelector(".basket");
    basketButton.addEventListener('click', () =>{
        this.checkResult();
    });
}

checkResult(){
    const basket = document.querySelector("#basket");
    const basketDivs = Array.from(basket.children);
    
    basketDivs.forEach((item) => {
        if(item.dataset.weight === 'heavy'){
            console.log("hello")
        } else {
            console.log("Bye")
        }
    }); 
    
}


};
// close the objecy


 
 


 



function ready() {
  let overlays = Array.from(document.getElementsByClassName("overlay-text"));
  let basketballs = Array.from(document.getElementsByClassName("basketballs"));
  let game = new nameOfTheGame(180, basketballs);

  new Sortable(leftSide, {
    group: 'shared', // set all lists to same group
    animation: 150,
    });

    new Sortable(rightSide, {
        group: 'shared',
        animation: 150,
    });

    new Sortable(ballsGroup, {
    group: 'shared', 
    });

    new Sortable(basket, {
    group: 'shared', 
    animation: 150,
    });

  overlays.forEach((overlay) => {
    overlay.addEventListener("click", () => {
        overlay.classList.remove("visible");
        game.startGame();
    });
    
  });
}



if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}