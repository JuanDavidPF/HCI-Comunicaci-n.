let openTitle = document.querySelector(".openTitle")
let openTitleLogo = document.querySelector(".openTitle>div")
let openTitleBtn = document.querySelector(".openTitle>h1")
let openTitleLvl1 = document.querySelector(".openTitle>img")
let instrucciones = document.querySelectorAll(".instructions")
let instruccionesBtn = document.querySelectorAll(".btnHelp")


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
        nivel = 1
    }, 800)


    if (nivel == 1) {
        openTitle.classList.add("slideOutUp")

        setTimeout(function () {
            openTitle.style.opacity = "0"

        }, 300)
    }
})




let story = `Una chica ha planeado un viaje con su novio, han quedado de encontrarse en la finca de su familia al sur 
de la ciudad.. Entusiasmada emprende el viaje, al llegar se da cuenta de que su novio se ha retrasado
 y que deberá esperar.. Sin pensarlo dos veces entra en la casa y pretende prepararle una sorpresa.. Al 
 entrar la casa empieza a recordar momentos en su infancia, se queda mirando fijamente a ventana. pero se 
 sorprende al encontrar un hombre realmente apuesto observándola de lejos.. El hombre se acerca y le 
 tiende la mano, ella amablemente lo saluda y le explica su situación.. El hombre no deja de mirarla con 
 intensidad y se acerca a sus labios. ella no puede alejarse y pasan la noche juntos.. Al día siguiente se 
 levanta en la cama de un hospital como única sobreviviente de un accidente de carretera.. Su pronóstico es 
 reservado, acaba de escuchar que el doctor le dice a su colega.. "A esta paciente no le queda más de 
 una hora de vida".`


let phrase = story.split(". ")
let phraseBackup = story.split(". ")

let board = document.querySelector(".board")
let pool = document.querySelector(".pool")
let btnPool = document.querySelector(".btnPool")
let poolWords = document.querySelector(".poolWords")
let cardsCreated = false;
let poolClosed = false
let poolOpened = true

let wordCards
let mistakes = 0
let boardCards


for (let index = 0; index < instruccionesBtn.length; index++) {

    instruccionesBtn[index].addEventListener("click", function () {
        instrucciones[nivel - 1].classList.add("slideOutUp")

        setTimeout(function () {
            instrucciones[nivel - 1].style.opacity = "0";
        }, 200)

        setTimeout(function () {
            instrucciones[nivel - 1].style.display = "none";
            board.style.filter = "none"
            poolWords.classList.add("fadeIn")

            if (cardsCreated == false) {
                createCards();
            }

        }, 700)
    })
}



//create text cards

function createCards() {
    shuffle(phrase)
    for (let i = 0; i < phrase.length; i++) {
        let p = document.createElement('p')
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

    cardsCreated = true
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