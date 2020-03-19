let openTitle = document.querySelector(".openTitle")
let openTitleLogo = document.querySelector(".openTitle>div")
let openTitleBtn = document.querySelector(".openTitle>h1")
let openTitleLvl1 = document.querySelector(".openTitle>img")
let instrucciones = document.querySelector(".instructions")
let instruccionesBtn = document.querySelector(".btnHelp")

let nivel = "menu"


openTitleBtn.addEventListener("click", function () {
    openTitleLogo.classList.add("slideOutUp")


    setTimeout(function () {
        openTitleLogo.style.opacity = "0"

    }, 300)

    setTimeout(function () {

        openTitleLvl1.style.display = "block"
        openTitleLogo.style.display = "none"
    }, 700)

    setTimeout(function () {
        openTitleLvl1.style.opacity = "1"
        openTitleLvl1.classList.add("slideInUp")
        nivel = "nivel1"
    }, 800)


    if (nivel == "nivel1") {
        openTitle.classList.add("slideOutUp")

        setTimeout(function () {
            openTitle.style.opacity = "0"

        }, 300)

    }

})


let story = `Un hombre decidió pasar el día explorando unos bosque que nunca había visitado. 
Cuando empezó a anochecer, su sentido de orientación ya no funcionaba bien y cada vez se empezó
a adentrar más y más en el bosque. Tras horas andando sin rumbo y de noche, encontró una cabaña 
entre varios árboles. Al golpear la puerta, no recibió respuesta y como estaba abierta decidió entrar. Al 
ver la cama, pensó que lo mejor sería ir a dormir y si alguien venía explicar lo que había pasado. 
Una vez estirado, se dio cuenta de que había muchas pinturas extrañas: eran rostros deformados con ojos 
rojos que le miraban. Intentó ignorarlos, cerró los ojos y se durmió. A la mañana siguiente, 
despertó aterrorizado al darse cuenta de que no había pinturas en la cabaña, solo ventanas..`


let phrase = story.split(". ")
let phraseBackup = story.split(". ")

let board = document.querySelector(".board")
let pool = document.querySelector(".pool")
let btnPool = document.querySelector(".btnPool")
let poolWords = document.querySelector(".poolWords")
let poolClosed = false
let poolOpened = true

let wordCards
let mistakes = 0
let boardCards



instruccionesBtn.addEventListener("click", function () {
    instrucciones.classList.add("slideOutUp")

    setTimeout(function () {
        instrucciones.style.opacity = "0";
    }, 200)

    setTimeout(function () {
        instrucciones.style.display = "none";
        poolWords.classList.add("fadeIn")
        createCards();
    }, 700)
})



//create text cards

function createCards() {
    shuffle(phrase)
    for (let i = 0; i < phrase.length; i++) {
        let p = document.createElement('p')
        phrase[i] += "."
        phraseBackup[i] += "."
        p.textContent = phrase[i];
        p.classList.add("wordCard")
        p.classList.add("poolCard")
        poolWords.appendChild(p);
    }

    //open and closes the word pool
    btnPool.addEventListener("click", poolMovement)



    //grabs the phrase cards
    wordCards = document.querySelectorAll(".wordCard")
    for (let i = 0; i < wordCards.length; i++) {

        wordCards[i].addEventListener("pointerdown", function () {

            if (wordCards[i].classList.contains("poolCard")) {


                wordCards[i].classList.remove("poolCard")
                wordCards[i].classList.add("boardCard")
                board.appendChild(wordCards[i])
                boardCards = document.querySelectorAll(".boardCard")

                mistakeCount()


            } else if (wordCards[i].classList.contains("boardCard")) {

                wordCards[i].classList.remove("boardCard")
                wordCards[i].classList.add("poolCard")
                poolWords.appendChild(wordCards[i])
                mistakes = 0

            }

        })
    }



}






//movement of the pool

function poolMovement() {

    if (poolOpened) {
        board.style.height = "550px"
        pool.style.height = "150px"
        setTimeout(function () {
            poolOpened = false;
            poolClosed = true;
        }, 500)
    }

    if (poolClosed) {

        board.style.height = "25%"
        pool.style.height = "75%"
        setTimeout(function () {
            poolOpened = true;
            poolClosed = false;
        }, 500)

    }
}



// sort randomlky the phrases array

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


//finish


function mistakeCount() {

    if (boardCards.length == phraseBackup.length) {

        for (let i = 0; i < phraseBackup.length; i++) {

            if (phraseBackup[i] != boardCards[i].textContent) {
                mistakes += 1
            }
        }

        if (mistakes == 0) {
            alert("VICTORIA")
        } else {
            alert("TUVISTE " + mistakes + " ERRORES")
        }

    }

}