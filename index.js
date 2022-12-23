let blackJack = {
    'Player': {'scoreSpan': '#playerscore' , 'div': '#player-box', 'score': 0},
    'Dealer': {'scoreSpan': '#dealerscore' , 'div': '#dealer-box', 'score': 0},
    
    'cards': ['phillyFanatic2', 'phillyFanatic3', 'phillyFanatic4', 'phillyFanatic5', 'phillyFanatic6', 'phillyFanatic7', 'phillyFanatic8', 'phillyFanatic9', 'phillyFanatic10', 'phillyFanaticA', 'phillyFanaticJ', 'phillyFanaticK', 'phillyFanaticQ', 'mrMet2', 'mrMet3', 'mrMet4', 'mrMet5', 'mrMet6', 'mrMet7', 'mrMet8', 'mrMet9', 'mrMet10', 'mrMetA', 'mrMetJ', 'mrMetK', 'mrMetQ', 'marlins2', 'marlins3', 'marlins4', 'marlins5', 'marlins6', 'marlins7', 'marlins8', 'marlins9', 'marlins10', 'marlinsA', 'marlinsJ', 'marlinsK', 'marlinsQ', 'braves2', 'braves3', 'braves4', 'braves5', 'braves6', 'braves7', 'braves8', 'braves9', 'braves10', 'bravesA', 'bravesJ', 'bravesK', 'bravesQ'],
    'cardsmap': {'phillyFanatic2': 2, 'phillyFanatic3': 3, 'phillyFanatic4': 4, 'phillyFanatic5': 5, 'phillyFanatic6': 6, 'phillyFanatic7': 7, 'phillyFanatic8': 8, 'phillyFanatic9': 9, 'phillyFanatic10': 10, 'phillyFanaticA': [1, 11], 'phillyFanaticJ': 10, 'phillyFanaticK': 10, 'phillyFanaticQ': 10, 'mrMet2': 2, 'mrMet3': 3, 'mrMet4': 4, 'mrMet5': 5, 'mrMet6': 6, 'mrMet7': 7, 'mrMet8': 8, 'mrMet9': 9, 'mrMet10': 10, 'mrMetA': [1, 11], 'mrMetJ': 10, 'mrMetK': 10, 'mrMetQ': 10, 'marlins2': 2, 'marlins3': 3, 'marlins4': 4, 'marlins5': 5, 'marlins6': 6, 'marlins7': 7, 'marlins8': 8, 'marlins9': 9, 'marlins10': 10, 'marlinsA': [1, 11], 'marlinsJ': 10, 'marlinsK': 10, 'marlinsQ': 10, 'braves2': 2, 'braves3': 3, 'braves4': 4, 'braves5': 5, 'braves6': 6, 'braves7': 7, 'braves8': 8, 'braves9': 9, 'braves10': 10, 'bravesA': [1, 11], 'bravesJ': 10, 'bravesK': 10, 'bravesQ': 10},
    
    'wins':0,
    'losses':0,
    'draws':0
};
const Player = blackJack['Player'];
const Dealer = blackJack['Dealer'];

function drawCard(activeplayer) {
    const randomNumber = Math.floor(Math.random() * (blackJack['cards'].length));
    const currentCard = blackJack['cards'].splice(randomNumber, 1);
    let card = document.createElement('img');
    card.src = `./images/${currentCard}.jpg`;
    document.querySelector(activeplayer['div']).appendChild(card);
    
    updateScore(currentCard, activeplayer);

    showScore(activeplayer);
}

document.querySelector('#hit').addEventListener('click', blackJackHit);
function blackJackHit(){
    if(Dealer['score'] === 0){
        if(Player['score']<=21){
            drawCard(Player);
        }
    }
}

document.querySelector('#hold').addEventListener('click', blackJackHold)
function blackJackHold(){
    if(Player['score']===0){
        alert('Player Must Hit First!');
    }
    else{
        while(Dealer['score']<16){
            drawCard(Dealer);
        }
        setTimeout(function(){
            showresults(findwinner());
            scoreboard();
        }, 500); 
    }
}
function updateScore(currentcard, activeplayer){
 
    if(currentcard == 'phillyFanaticA' || currentcard == 'mrMetA' || currentcard == 'marlinsA' || currentcard == 'bravesA'){
        if((activeplayer['score'] + blackJack['cardsmap'][currentcard][1]) <= 21){

            activeplayer['score'] += blackJack['cardsmap'][currentcard][1];
        }
        else{
            activeplayer['score'] += blackJack['cardsmap'][currentcard][0];
        }
    }
    else{
        activeplayer['score'] += blackJack['cardsmap'][currentcard];
    }   
}

function showScore(activeplayer){
    if(activeplayer['score']>21){
        document.querySelector(activeplayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activeplayer['scoreSpan']).style.color = 'white';
    }
    else{
        document.querySelector(activeplayer['scoreSpan']).textContent = activeplayer['score'];
    }
}

function findwinner(){
    let winner;
    if(Player['score']<=21){
        if(Dealer['score']<Player['score'] || Dealer['score']>21){
            blackJack['wins']++;
            winner = Player;
        }
        else if(Dealer['score'] == Player['score']){
            blackJack['draw']++;
        }
        else{
            blackJack['losses']++;
            winner = Dealer;
        }
    }
    else if(Player['score']>21 && Dealer['score']<=21){
        blackJack['losses']++;
        winner = Dealer;
    }
    else if(Player['score']>21 && Dealer['score']>21){
        blackJack['draws']++;
    }
    return winner;
}

function showresults(winner){
    if(winner == Player){
        document.querySelector('#begin').textContent = 'You Win!';
        document.querySelector('#begin').style.color = 'green';}
    else if(winner == Dealer){
        document.querySelector('#begin').textContent = "You Lose!";
        document.querySelector('#begin').style.color = 'red';
    }
    else{
        document.querySelector('#begin').textContent = 'It is a draw!';
        document.querySelector('#begin').style.color = 'black';
    }

}

function scoreboard(){
    document.querySelector('#Wins').textContent = blackJack['Wins'];
    document.querySelector('#Losses').textContent = blackJack['Losses'];
    document.querySelector('#Ties').textContent = blackJack['Ties'];
}

document.querySelector('#reshuffle').addEventListener('click', blackJackReshuffle);
function blackJackReshuffle(){
    if(Player['score']=== 0){
        alert('Please Hit Some Cards First!');
    }
    else if(Dealer['score']===0){
        alert('Please Press Hold Key Before Deal...');
    }
    else{

    let playerimg = document.querySelector('#player-box').querySelectorAll('img');
    let dealerimg = document.querySelector('#dealer-box').querySelectorAll('img');
    
    for(let i=0; i<playerimg.length; i++){
        playerimg[i].remove();
    }
    for(let i=0; i<dealerimg.length; i++){
        dealerimg[i].remove();
    }

    blackJack['cards'] = ['PhillyFanatic2', 'PhillyFanatic3', 'PhillyFanatic4', 'PhillyFanatic5', 'PhillyFanatic6', 'PhillyFanatic7', 'PhillyFanatic8', 'PhillyFanatic9', 'PhillyFanatic10', 'PhillyFanaticA', 'PhillyFanaticJ', 'PhillyFanaticK', 'PhillyFanaticQ', 'MrMet2', 'MrMet3', 'MrMet4', 'MrMet5', 'MrMet6', 'MrMet7', 'MrMet8', 'MrMet9', 'MrMet10', 'MrMetA', 'MrMetJ', 'MrMetK', 'MrMetQ', 'Marlins2', 'Marlins3', 'Marlins4', 'Marlins5', 'Marlins6', 'Marlins7', 'Marlins8', 'Marlins9', 'Marlins10', 'MarlinsA', 'MarlinsJ', 'MarlinsK', 'MarlinsQ', 'Braves2', 'Braves3', 'Braves4', 'Braves5', 'Braves6', 'Braves7', 'Braves8', 'Braves9', 'Braves10', 'BravesA', 'BravesJ', 'BravesK', 'BravesQ'];

    Player['score'] = 0;
    document.querySelector(Player['scoreSpan']).textContent = Player['score'];
    document.querySelector(Player['scoreSpan']).style.color = 'whitesmoke';
    Dealer['score'] = 0;
    document.querySelector(Dealer['scoreSpan']).textContent = Dealer['score'];
    document.querySelector(Dealer['scoreSpan']).style.color = 'whitesmoke';

    document.querySelector('#begin').textContent = "Begin!";
    document.querySelector('#begin').style.color = 'black';
    }
}
