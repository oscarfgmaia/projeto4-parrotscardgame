const arrayOfCards1 = [];
const arrayOfCards2 = [];
let arrayOfCards;
const cardContainer = document.querySelector('.CARD-CONTAINER');
let jogo = false


function func(cardClicked) {
    console.log(cardClicked)
    let frontFace = cardClicked.getElementsByTagName('div')[0];
    let backFace = cardClicked.getElementsByTagName('div')[1];
    frontFace.classList.add('turn')
    backFace.classList.add('turn')
    console.log(frontFace);
    console.log(backFace);
}
function createCards(numOfCards) {
    //create first half of the deck
    for (i = 0; i < numOfCards / 2; i++) {
        let divNova = document.createElement("div");
        divNova.className = "card";
        divNova.setAttribute("onclick", "func(this)")

        let divFaceCard = document.createElement('div');
        divFaceCard.className = "front-face face";

        let faceCard = document.createElement("img");
        faceCard.src = `./resources/card_image.png`;
        
        let divVersoCard = document.createElement('div');
        divVersoCard.className = "back-face face";

        let versoCard = document.createElement("img");
        versoCard.src = `./resources/cards/${i}.gif`;

        divFaceCard.appendChild(faceCard);
        divVersoCard.appendChild(versoCard);
        divNova.appendChild(divFaceCard);
        divNova.appendChild(divVersoCard);
        arrayOfCards1[i] = divNova;
    }
    //create second half of the deck
    for (i = 0; i < numOfCards / 2; i++) {
        let divNova = document.createElement("div");
        divNova.className = "card";
        divNova.setAttribute("onclick", "func(this)")

        let divFaceCard = document.createElement('div');
        divFaceCard.className = "front-face face";

        let faceCard = document.createElement("img");
        faceCard.src = `./resources/card_image.png`;
        
        let divVersoCard = document.createElement('div');
        divVersoCard.className = "back-face face";

        let versoCard = document.createElement("img");
        versoCard.src = `./resources/cards/${i}.gif`;

        divFaceCard.appendChild(faceCard);
        divVersoCard.appendChild(versoCard);
        divNova.appendChild(divFaceCard);
        divNova.appendChild(divVersoCard);
        arrayOfCards2[i] = divNova;
    }

    //append the two halfs to make one deck with 2 equals cards of each.
    arrayOfCards = arrayOfCards1.concat(arrayOfCards2);
}

function addArrayToContainer() {
    arrayOfCards.sort(comparador)
    console.log(comparador)
    for (i = 0; i < arrayOfCards.length; i++) {
        cardContainer.appendChild(arrayOfCards[i]);
    }

    function comparador() {
        return Math.random() - 0.5;
    }
    
}

function removeCards() {
    for (i = 0; i < arrayOfCards.length; i++) {
        let cardToBeRemoved = document.querySelector('.card');
        cardToBeRemoved.remove();
    }

    clearArrayOfCards();
}

//private use to removeCards()
function clearArrayOfCards() {
    let size = arrayOfCards.length
    for (i = 0; i < size; i++) {
        arrayOfCards.pop()
    }

    let size1 = arrayOfCards1.length
    for (i = 0; i < size; i++) {
        arrayOfCards1.pop()
    }

    let size2 = arrayOfCards2.length
    for (i = 0; i < size; i++) {
        arrayOfCards2.pop()
    }
}
