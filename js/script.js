const btnName = document.getElementById(`name`);
let pScore = 0;
let cScore = 0;

const aiChoises = [`sten`, `sax`, `påse`];

//Bilder Spelare och Dator
const playerimg = document.getElementById(`pimg`);
const computerimg = document.getElementById(`cimg`);

//Announcment gällande vad som valts
const announcment = document.getElementById(`announcment`);

//Spelarens Namn genom textinput till h2
btnName.addEventListener(`click`, function(){
    const input = document.querySelector(`input`);
    const displayPlayerName = document.querySelector(`h2`);

    displayPlayerName.innerText = input.value;
    input.value = ` `;
});


//Function Datorn Random sten sax eller påse nr 0-2

function randomChoises (choises){
    const randomIndex = Math.floor( Math.random()*aiChoises.length);

    const result = document.getElementById(`compResult`);
    // result.innerText = aiChoises[randomIndex];

    return aiChoises[randomIndex];
}

//RandomChoises ska ske varje gång man klickar på en av knapparna
//STEN

const buttonSten = document.getElementById(`sten`);

buttonSten.addEventListener(`click`, function(){
    const compChoice = randomChoises();

    const playerChoice = document.getElementById(`playerResult`);
    playerimg.src = `img/sten.png`;
    computerimg.src = `img/${compChoice}.png`

    playerimg.style.computerMove = "example 2sec ease";
    computerimg.style.computerMove = "example 2sec ease";

    //Kollar om datorns val är === X val
    if(compChoice === `sten`){
        announcment.innerText = `Oavgjort`;
        announcment.style.color = `white`;
        
    }
    if (compChoice === `påse`){
        announcment.innerText = `CPU +1`;
        announcment.style.color = `hsl(2, 81%, 74%)`;
        cScore++;
        updateScore();
        
    }
    if(compChoice === `sax`){
        announcment.innerText = `+1`;
        announcment.style.color = `hsl(129, 48%, 57%)`;
        pScore++;
        updateScore();
    }
    endGame();
});

//SAX
const buttonSax = document.getElementById(`sax`);

buttonSax.addEventListener(`click`, function(){
    const compChoice = randomChoises();

    const playerChoice = document.getElementById(`playerResult`);
    // playerChoice.innerText = `sax`;
    playerimg.src = `img/sax.png`;
    computerimg.src = `img/${compChoice}.png`

    //Kollar om datorns val är === X val
    if(compChoice === `sax`){
        announcment.innerText = `Oavgjort`;
        announcment.style.color = `white`;
        
    }
    if (compChoice === `påse`){
        announcment.innerText = `+1`;
        announcment.style.color = `hsl(129, 48%, 57%)`;
        pScore++;
        updateScore();
        
    }
    if(compChoice === `sten`){
        announcment.innerText = `CPU +1`;
        announcment.style.color = `hsl(2, 81%, 74%)`;
        cScore++;
        updateScore();

    }
    endGame();
});

//PÅSE
const buttonPase = document.getElementById(`pase`);

buttonPase.addEventListener(`click`, function(){
    const compChoice = randomChoises();

    const playerChoice = document.getElementById(`playerResult`);
    // playerChoice.innerText = `sax`;
    playerimg.src = `img/påse.png`;
    computerimg.src = `img/${compChoice}.png`

    //Kollar om datorns val är === X val
    if(compChoice === `påse`){
        announcment.innerText = `Oavgjort`;
        announcment.style.color = `white`;
        
    }
    if (compChoice === `sten`){
        announcment.innerText = `+1`;
        announcment.style.color = `hsl(129, 48%, 57%)`;
        pScore++;
        updateScore();
        
    }
    if(compChoice === `sax`){
        announcment.innerText = `CPU +1`;
        announcment.style.color = `hsl(2, 81%, 74%)`;
        cScore++;
        updateScore();

    }  
    endGame();
});

//Fuktion för att uppdatera poäng
const updateScore = function(event){
    const playerScore = document.getElementById(`playerScore`);
    const computerScore = document.getElementById(`computerScore`);
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
}

//Funktion för - GAME END
const endGame = function(event){
    if(cScore === 1){
        compareScore();
        alert(`Du förlorade din fajt efter att ha vunnit mot ${pScore} motståndare.`)
        console.log(pScore);
        cScore = 0;

        playerScore.textContent = 0;
        computerScore.textContent = 0;

        window.location.reload();
    }
} 

//DATABAS URLs
const highscoreUrl = `https://highscore-29947-default-rtdb.europe-west1.firebasedatabase.app/highscore.json`;


//Funktion jämföra score

const compareScore = function(){
    const scorePromise = fetch(highscoreUrl);
    const jsonPromise = scorePromise.then(
        function(promiseValue){
            return promiseValue.json();
        }
    );
    jsonPromise.then(
        function(scoreArray){

            const displayPlayerName = document.querySelector(`h2`);
            playerName = displayPlayerName.innerText;

            let customId;
            let newArray; 
            console.log(pScore);
            for(let i = 0; i < scoreArray.length; i++){
                
                if (pScore >= scoreArray[i].score){
                    console.log(`${pScore} ska in på highscore index`, scoreArray.indexOf(scoreArray[i]))

                    customId = scoreArray.indexOf(scoreArray[i]);
                    (console.log(customId))
                    
                    break;
                }else{
                    console.log(`${pScore} ska ej in på highscore index`, scoreArray.indexOf(scoreArray[i]))
                }
            }

            //Arrayen ändras om
            newArray = scoreArray;
            newArray.splice(customId, 0, Object = {
                player: playerName,
                score: pScore
            });
            newArray.pop();
            console.log(newArray)

            //Uppdatera URL beroende på index

            for(i = customId; i < 5; i++){
               const url = `https://highscore-29947-default-rtdb.europe-west1.firebasedatabase.app/highscore/${i}.json`; 

               const headerObject = {
                'Content-type': 'application/json; charset=UTF-8',
                }
               
               const init = {
                method: `PUT`,
                body: JSON.stringify(newArray[i]),
                headers: headerObject,
               }

               fetch(url, init).then(r=>r.json()).then(d=>console.log(`Posted new scoreboard`, d));
            }
        }
    )
}

//Funktion för att hämta highscore och skriva ut det i DOM:en
const getHighscore = function(){
    
    const scorePromise = fetch(highscoreUrl);
    
    const jsonPromise = scorePromise.then(
        function(promiseValue){
            return promiseValue.json();
        }
    );
    console.log(jsonPromise);
    
    jsonPromise.then(
        function(promiseValue){
            console.log(`Porimise i variabler`, promiseValue);

            for(let i = 0; i < promiseValue.length; i++){

                const div = document.getElementById(`scoreBoard`);
                const newDiv = document.createElement(`div`);
                const h2 = document.createElement(`h2`);
                const p = document.createElement(`p`);

                newDiv.classList.add(`playerScore`);
                
                h2.innerText = promiseValue[i].player;
                p.innerText = promiseValue[i].score;
                
                div.appendChild(newDiv);
                newDiv.appendChild(h2);
                newDiv.appendChild(p);

            }
        }
    );
}
getHighscore();