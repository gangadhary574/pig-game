var data={
    playerScore:[0,0],
    currentScore:0,
    activePlayer:0,
}
var canRoll = true;

var init = function(){
    canRoll = true;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('score-0').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.add('remove');
    console.log('Game has started');
    };

function rollDice(){
    if (canRoll){
        var roll = Math.ceil(Math.random()*6);
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-'+roll+'.png';
        if (roll === 6){
            playerChange();   
        }
        else{
            data.currentScore +=roll;     
            document.getElementById('current-'+ data.activePlayer).textContent = data.currentScore;
        } 
    }
    console.log(data.currentScore);
}


function holdScore(){
    if (canRoll === true){
        data.playerScore[data.activePlayer] += data.currentScore;
    document.getElementById('score-'+data.activePlayer).textContent = data.playerScore[data.activePlayer];
    isWinner();
    }
    
}


function isWinner(){
    if (data.playerScore[data.activePlayer]>=100){
            document.getElementById('name-'+ data.activePlayer).textContent = "Winner!!"
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-'+data.activePlayer+'-panel').classList.toggle('active');
            canRoll = false;
    }
    else{
        playerChange();
    }
}

function playerChange(){
    document.querySelector('.player-'+data.activePlayer+'-panel').classList.remove('active');
        data.currentScore = 0;
        document.getElementById('current-'+ data.activePlayer).textContent = data.currentScore;
        data.activePlayer === 0? data.activePlayer = 1:data.activePlayer = 0;
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-'+data.activePlayer+'-panel').classList.add('active');
        
}

document.querySelector('.btn-roll').addEventListener('click', rollDice);
document.querySelector('.btn-hold').addEventListener('click', holdScore);
document.querySelector('.btn-new').addEventListener('click', init);


init();
