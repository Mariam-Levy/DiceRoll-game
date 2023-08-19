'use strict'

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');

const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore, activePlayer, scores, playing;

// condiciones de inicio:
const init = function() {
    currentScore = 0;
    activePlayer = 0;
    scores = [0, 0];
    playing = true;

    diceElement.classList.add('hidden'); // esconde el dado

    current0.textContent = 0;
    current1.textContent = 0;
    score0.textContent = 0;
    score1.textContent = 0;

    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
};
init();

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;      // reasignando al jugador activo  (Si activePlayer es 0, se cambia a 1; y si es 1, se cambia a 0.)
    player0.classList.toggle('player--active');      // esta línea de código se usa para cambiar el estado de la clase 'player--active', Si la clase está presente, se quitará; si no está presente, se agregará.
    player1.classList.toggle('player--active');   
};

btnRoll.addEventListener('click', function() {
    if(playing) {
        // 1.- Necesito que el dado muestre numeros al azar
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);
    
        // 2.- Que se muestre el dado
        diceElement.classList.remove('hidden'); // remueve la clase hidden para que se pueda ver el dado
        diceElement.src = `dice-${dice}.png` // de esta manera podemos cargar dinamicamente una de las 6 imagnes del dado
    
        // 3.- Si el dado muestra el numero 1, cambiar de jugador.
        if (dice !== 1) { //si el dado es diferente a 1, entonces:
            // añadir el valor del dado a la puntuacion actual
            currentScore = currentScore + dice; 
            document.getElementById(`current--${activePlayer}`).textContent = currentScore; // seleccionamos el elemento de la puntuacion de manera dinamica, en funcion de cual es el jugador activo.
        } else {
            // cambia de jugador
            switchPlayer();
        }
    }
});


btnHold.addEventListener('click', function() {
    if(playing) {
        // Agregar la puntuacion actual al jugador que este activo
        scores[activePlayer] += currentScore;   // esto seria asi: scores[1] = scores[1] + currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    
    
        // Comprobar si la puntuacion del jugador es mayor o igual a 100
        if (scores[activePlayer] >= 20) {
            //Termina el juego
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            // Cambiar al siguiente jugador
            switchPlayer();
        }

    }


});

btnNew.addEventListener('click', init);


