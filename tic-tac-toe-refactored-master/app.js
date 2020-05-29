// grab start button to run the runGame function via addEventListener
const startGameBtn = document.querySelector('#start');
// grab the reset button to run the resetGame function via addEventListener
const resetGameBtn = document.querySelector('#gameReset');

// grab the gameControlsParent div and display none upon start game
const gameControlsParent = document.querySelector('.gameControlsParent');


var move = new Audio('audio/move.mp3');
var win1 = new Audio('audio/win1.mp3');
var win2 = new Audio('audio/win2.mp3');
var cat = new Audio('audio/cat.mp3');
var tie = new Audio('audio/tie.mp3');




// function to choose background image on click
    const backgroundArray = ['url(img/teal-background.jpg)', 'url(img/blue-background.jpg)', 'url(img/purple-background.jpg)']
    // grab button to add one to counter so i can display different backgrounds.
    const changeBackground = document.querySelector('#changeBackground');
    const body = document.querySelector('body');
    let counter = 0;
    changeBackground.addEventListener('click', function(){
        counter++;
        if(counter > backgroundArray.length -1){
            counter = 0;
        }
        body.style.backgroundImage = backgroundArray[counter];
    });

let playerOneScore = 0;
let playerTwoScore = 0;
const playerOneScoreDiv = document.querySelector('#playerOneScoreDiv');
const playerTwoScoreDiv = document.querySelector('#playerTwoScoreDiv');

// holds the value of Player Scores
playerOneScoreDiv.innerText = `Player One Score: ` + localStorage.getItem("playerOneScore");
playerTwoScoreDiv.innerText = `Player Two Score: ` + localStorage.getItem("playerTwoScore");

const instructionsDiv = document.querySelector('header');
instructionsDiv.innerText = "Welcome to TIC-TAC-TOE 3D!!! \n\n3 in a row wins.  \n\n As the clock reaches 15 seconds remaining, turn will be passed to player two if it is player one's turn.  This prevents player one from sitting on its turn until the end.  \n\nPress start to begin.  \n\nPress reset to restart series."


let playerOneCurrentGameScore = 0;
let playerTwoCurrentGameScore = 0;
const playerOneCurrentGameScoreDiv = document.querySelector('#playerOneCurrentGameScoreDiv');
const playerTwoCurrentGameScoreDiv = document.querySelector('#playerTwoCurrentGameScoreDiv');

// game over function
const gameOver = function(){   
    setTimeout(function(){ 
        location.reload();
    }, 16000);
};

function getCurrentGameScores(){
    if(playerOneCurrentGameScore > playerTwoCurrentGameScore){
        playerOneScore = localStorage.getItem("playerOneScore");
        
        win1.play();
        winnerDiv.innerText = 'Player One Wins!';
        turnDiv.style.display = 'none';
        display.style.display = 'none';
        // using local storage to add 1 to playerOneScoreDiv
        localStorage.setItem('playerOneScore', parseInt(playerOneScore) + 1); 
        playerOneScoreDiv.innerText = `Player One Score: ` + localStorage.getItem("playerOneScore");
        gameOver();                         
        return;
    }
    else if(playerOneCurrentGameScore < playerTwoCurrentGameScore){
        playerTwoScore = localStorage.getItem("playerTwoScore");
        win2.play();
        winnerDiv.innerText = 'Player Two Wins!';
        turnDiv.style.display = 'none';
        display.style.display = 'none';
        // using local storage to add 1 to playerOneScoreDiv
        localStorage.setItem('playerTwoScore', parseInt(playerTwoScore) + 1); 
        playerTwoScoreDiv.innerText = `Player Two Score: ` + localStorage.getItem("playerTwoScore");
        gameOver()                                    
        return;
    }
    else {
        winnerDiv.innerText = 'Tie (Cat Game)';
        turnDiv.style.display = 'none';
        display.style.display = 'none';
        cat.play();
        tie.play();
        gameOver();
    }
}






// function for running the game
const runGame = function(){

    const fiveMinutes = 60 * 5,
        display = document.querySelector('#countdown');
    startTimer(fiveMinutes, display);

    
    
    instructionsDiv.style.display = 'none';
    gameControlsParent.style.display = 'none';
    
    // grabbing grid list so i can work with it to add user choice of x or o.
    const gridArray = document.querySelectorAll('.grid');
    const parentDiv = document.querySelectorAll('.parentDiv');
    
   
   
    
    // variable to hold boolean flag to keep track of turn
    let playerOneTurn = true;



//  countdown timer 
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        // ternary statement: if minutes less than 10, place a zero before the minute counter; same for seconds.
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;


        --timer;

        if(timer === 15 && playerOneTurn === true){
            playerOneTurn = false;
            turnDiv.innerText = "Player Two Turn";
        }
        
        
        if(timer === 0){
            getCurrentGameScores();
            gameOver();
            body.style.pointerEvents = 'none';
            return;
        }


       
    }, 1000);
}



    // array to hold all moves made by X and O
    const moves = [];
    // counter variable to track ties; if value reaches 9 and player one if not a winner, it's a tie.
    let counter = 0;

    // grabbing winnerDiv to place result of game.
    const winnerDiv = document.querySelector('#winnerDiv');

    
    const turnDiv = document.querySelector('#turnDiv');
    turnDiv.innerText = 'Player One\'s Turn';

    // check winner function
    const checkWinner = function(array, xoString){
        if(moves[0] === xoString && moves[4] === xoString && moves[8] === xoString ||
            moves[0] === xoString && moves[12] === xoString && moves[24] === xoString  ||
            moves[0] === xoString && moves[16] === xoString && moves[32] === xoString ||
            moves[1] === xoString && moves[5] === xoString && moves[9] === xoString ||
            moves[1] === xoString && moves[13] === xoString && moves[25] === xoString ||
            moves[1] === xoString && moves[17] === xoString && moves[33] === xoString ||
            moves[2] === xoString && moves[6] === xoString && moves[10] === xoString ||
            moves[2] === xoString && moves[14] === xoString && moves[26] === xoString ||
            moves[2] === xoString && moves[18] === xoString && moves[34] === xoString ||
            moves[3] === xoString && moves[7] === xoString && moves[11] === xoString ||
            moves[3] === xoString && moves[15] === xoString && moves[27] === xoString ||
            moves[3] === xoString && moves[19] === xoString && moves[35] === xoString ||
            moves[4] === xoString && moves[16] === xoString && moves[28] === xoString ||
            moves[5] === xoString && moves[17] === xoString && moves[29] === xoString ||
            moves[6] === xoString && moves[18] === xoString && moves[30] === xoString ||
            moves[7] === xoString && moves[19] === xoString && moves[31] === xoString ||
            moves[8] === xoString && moves[20] === xoString && moves[32] === xoString ||
            moves[8] === xoString && moves[16] === xoString && moves[24] === xoString ||
            moves[9] === xoString && moves[21] === xoString && moves[33] === xoString ||
            moves[9] === xoString && moves[17] === xoString && moves[25] === xoString ||
            moves[10] === xoString && moves[22] === xoString && moves[34] === xoString ||
            moves[10] === xoString && moves[18] === xoString && moves[26] === xoString ||
            moves[11] === xoString && moves[19] === xoString && moves[27] === xoString ||
            moves[11] === xoString && moves[23] === xoString && moves[35] === xoString ||
            moves[12] === xoString && moves[16] === xoString && moves[20] === xoString ||
            moves[13] === xoString && moves[17] === xoString && moves[21] === xoString ||
            moves[14] === xoString && moves[18] === xoString && moves[22] === xoString ||
            moves[15] === xoString && moves[19] === xoString && moves[23] === xoString ||
            moves[24] === xoString && moves[28] === xoString && moves[32] === xoString ||
            moves[25] === xoString && moves[29] === xoString && moves[33] === xoString ||
            moves[26] === xoString && moves[30] === xoString && moves[34] === xoString ||
            moves[27] === xoString && moves[31] === xoString && moves[35] === xoString){
            return true;
        } 
    };
    for(let i = 0; i < gridArray.length; i++){
        gridArray[i].id = i;
        
        gridArray[i].addEventListener('click', function(){
            if(playerOneTurn === true){
                if(this.innerText !== 'X' && this.innerText !== 'O'){
                    move.play();
                    moves[this.id] = 'X';
                    this.innerText = 'X';
                    playerOneCurrentGameScore++;
                    playerOneCurrentGameScoreDiv.innerText = `Player One Current Game Score: ${playerOneCurrentGameScore}`;
                    this.style.backgroundImage = "url(img/flower1.jpg)";
                    this.style.backgroundSize = "cover";
                    // if counter gets to 9, it must be a tie, if X is not the winner on the last move.
                    counter++;
                    playerOneTurn = false;
                    // winnerDiv announcing player turn
                    turnDiv.innerText = 'Player Two\'s Turn';
                    // check for win if the length of the moves array >= 5
                    if (moves.length >= 5){
                        // passong the moves array and value of X to check if X is winner
                        if(checkWinner(moves, 'X')){
                            win1.play();
                            winnerDiv.innerText = "Player One Wins!";
                            turnDiv.style.display = 'none';
                            display.style.display = 'none';
                            body.style.backgroundImage = "url(img/flower1.jpg)";
                            body.style.backgroundSize = "cover";

                            // disable the board on a win
                            body.style.pointerEvents = 'none';

                            playerOneScore = localStorage.getItem("playerOneScore");
                            // using local storage to add 1 to playerOneScoreDiv
                            localStorage.setItem('playerOneScore', parseInt(playerOneScore) + 1); 
                    
                            playerOneScoreDiv.innerText = `Player One Score: ` + localStorage.getItem("playerOneScore");

                            gameOver();
                            return;
                        }
                          
                    }
                }
            }
            else {
                if(this.innerText !== 'X' && this.innerText !== 'O'){
                    move.play();
                    moves[this.id] = 'O';
                    this.innerText = 'O';
                    playerTwoCurrentGameScore++;
                    playerTwoCurrentGameScoreDiv.innerText = `Player Two Current Game Score: ${playerTwoCurrentGameScore}`;
                    this.style.backgroundImage = "url(img/flower2.jpg)";
                    this.style.backgroundSize = "cover";
                    // if counter gets to 9, it must be a tie, if X is not the winner on the last move.
                    counter++;
                    playerOneTurn = true;
                    // winnerDiv announcing player turn
                    turnDiv.innerText = 'Player One\'s Turn';
                    // check for win if the length of the moves array >= 5
                    if (moves.length >= 5){
                        // passing the moves array and value of X to check if X is winner
                        if(checkWinner(moves, 'O')){
                            win2.play();
                            winnerDiv.innerText = "Player Two Wins!";
                            turnDiv.style.display = 'none';
                            display.style.display = 'none';
                            // disable the board on a win
                            body.style.pointerEvents = 'none';
                            body.style.backgroundImage = "url(img/flower2.jpg)";
                            body.style.backgroundSize = "cover";
                            playerTwoScore = localStorage.getItem("playerTwoScore");
                            // using local storage to add 1 to playerOneScoreDiv
                            localStorage.setItem('playerTwoScore', parseInt(playerTwoScore) + 1); 
                    
                            playerTwoScoreDiv.innerText = `Player Two Score: ` + localStorage.getItem("playerTwoScore");

                            gameOver();
                            return;
                        }
                    }
                    if(counter === 36){
                        winnerDiv.innerText = "Game is a Tie!";
                        cat.play();
                        tie.play();
                        turnDiv.style.display = 'none';
                        display.style.display = 'none';
                        // disable the board on a tie
                        body.style.pointerEvents = 'none';
                        
                        gameOver();
                        return;  
                    }  
                }
            }
            // fire only once (maybe prevents event bubbling?  I'll look this up later.)
        });
    }
}

const resetGame = function(){  
    console.log('resetGame function success');
    instructionsDiv.style.display = 'block';
    localStorage.setItem('playerOneScore', '0'); 
    localStorage.setItem('playerTwoScore', '0');
    location.reload();
}

startGameBtn.addEventListener('click', function(){
    console.log('startGameBtn clicked');
    runGame();
});

resetGameBtn.addEventListener('click', function(){
    resetGame();
});