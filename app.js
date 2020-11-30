/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, checkSix;

gamePlaying = true;
init();

// document.querySelector("#current-"+activePlayer).textContent = dice;
// document.querySelector("#current-"+0).innerHTML = '<em>'+dice+'<em>';// setting a html content using js

// var x = document.querySelector('#current-0').textContent;// readinc content using queryselector


document. querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
    // 1. generate a random number
     var dice = Math.ceil(Math.random()*6);
    if (dice === 6){
        checkSix += dice;
        console.log(dice);
    }
    // Dispay the results
    if (checkSix !== 12) {
    var diceDom = document.querySelector('.dice')
     diceDom.style.display = 'block';
      diceDom.src = 'dice-'+dice+'.png';

    // update the round score if the rolled number is not a 1
            if (dice!==1){
                // add score
                roundScore += dice;
                document.querySelector('#current-'+activePlayer).textContent = roundScore;
                }
            else{
                nextPlayer();
                }
    }
    else{
        document.querySelector('#score-'+activePlayer).textContent = 0;
        checkSix =0;
        nextPlayer(); 
    }


}
});

document.querySelector(".btn-hold").addEventListener('click', function(){
    if (gamePlaying){
        // add currentscore to global score
        
        scores[activePlayer] += roundScore;


        // update the user interdface
        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

        // Reading the winning score
        var inputScore = document.querySelector(".final-score").nodeValue;
        var winningScore;
        if (inputScore && typeof inputScore === 'number'){
            winningScore = inputScore;
        }
        else{
            winningScore = 100;
        }

        // Check if player won the game
        if (scores[activePlayer] >= winningScore){
            document.getElementById("name-"+activePlayer).textContent = "Winner!";
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            gamePlaying = false;
            }
        else{
            nextPlayer();
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');
        }

}
    }
    );

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1: activePlayer =0;
        roundScore = 0;
        checkSix = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('.dice').style.display = 'none';
}


document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    checkSix = 0;

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

document.querySelector('.dice').style.display = "none";// setting a css property using JS
document.getElementById("name-0").textContent = "PLAYER 1";
document.getElementById("name-1").textContent = "PLAYER 2";

document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');
}