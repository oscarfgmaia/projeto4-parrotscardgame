let arrayOfCards = [];
let counterCardClicked = 0;
const checkPair = [];
let actualClock = 0.00;
const delay = 0.01;
let clearIntervalName
startGame();

function updateClock() {
  const clockDocument = document.querySelector('.clock');
  actualClock += delay
  clockDocument.innerHTML = actualClock.toFixed(2)+" segundos";
}

function startGame() {
  const clockDocument = document.querySelector('.clock');
  clockDocument.classList.remove('hidden');
  actualClock = 0;
  counterCardClicked = 0;
  let quantidadeCartas = prompt("Com quantas cartas deseja jogar?");
  if (quantidadeCartas >= 4 && quantidadeCartas <= 14 && quantidadeCartas % 2 === 0) {
    createCards(quantidadeCartas);
    addArrayToContainer();
  }
  else {
    alert("Você deve inserir valores pares entre 4 e 14.")
    startGame()
  }
  clearIntervalName = setInterval(updateClock, 10)
}

function checkGameFinished() {
  let counter = 0
  for (i = 0; i < arrayOfCards.length; i++) {
    if (arrayOfCards[i].classList.contains('acertada') === true) {
      counter++;
    }
  }
  if (arrayOfCards.length === counter) {
    alert("Você ganhou em " + counterCardClicked + " jogadas, com um tempo de " + actualClock.toFixed(2) + " segundos!")
    askToPlayAgain()
  }
}

function checkIfCanStopClock() {
  let counter = 0
  for (i = 0; i < arrayOfCards.length; i++) {
    if (arrayOfCards[i].classList.contains('acertada') === true) {
      counter++;
    }
  }
  if (arrayOfCards.length === counter) {
    clearInterval(clearIntervalName);
  }
}

function askToPlayAgain() {
  const answer = prompt("Você gostaria de jogar novamente?")
  if (answer === "sim") {
    removeCards();
    startGame();
  }
  else if (answer === "não") {
    const a = document.querySelector('.titulo');
    a.innerHTML = "ESPERO QUE VOCÊ VENHA JOGAR NOVAMENTE, FOI UM PRAZER TER VOCÊ COMO JOGADOR!";
    a.parentNode.classList.add('centralizar-titulo')
    removeCards();
    const clockDocument = document.querySelector('.clock');
    clockDocument.classList.add('hidden')
  }
  else {
    alert("Digite apenas sim ou não");
    askToPlayAgain();
  }
}

function clickCard(cardClicked) {
  if (cardClicked.classList.contains("canClick") === true) {
    cardClicked.classList.add("cartaClicada");
    cardClicked.classList.remove("canClick");
    counterCardClicked++;
    const frontFace = cardClicked.querySelector(".front-face");
    const backFace = cardClicked.querySelector(".back-face");
    frontFace.classList.add("turn");
    backFace.classList.add("turn");
    checkPair.push(cardClicked);
    if (checkPair.length === 2) {
      checkTwoPair();
    }
  }
}

function flipBack() {
  let a = checkPair[0].children[0];
  let b = checkPair[0].children[1];
  a.classList.remove("turn");
  b.classList.remove("turn");
  checkPair[0].classList.remove("cartaClicada");

  a = checkPair[1].children[0];
  b = checkPair[1].children[1];
  a.classList.remove("turn");
  b.classList.remove("turn");
  checkPair[1].classList.remove("cartaClicada");


  checkPair.pop();
  checkPair.pop();
  for (i = 0; i < arrayOfCards.length; i++) {
    if (arrayOfCards[i].classList.contains('acertada') === false) {
      arrayOfCards[i].classList.add('canClick')
    }
  }
}

function checkTwoPair() {
  if (
    checkPair[0].querySelector(".back-face").innerHTML === checkPair[1].querySelector(".back-face").innerHTML) {
    checkPair[0].classList.add("acertada");
    checkPair[1].classList.add("acertada");
    checkPair[0].classList.remove("cartaClicada");
    checkPair[1].classList.remove("cartaClicada");
    checkPair.pop();
    checkPair.pop();
    setTimeout(checkGameFinished, 500);
    checkIfCanStopClock();
  } else {
    setTimeout(flipBack, 1000);
    for (i = 0; i < arrayOfCards.length; i++) {
      arrayOfCards[i].classList.remove('canClick')
    }
  }
}

function createCards(numOfCards) {
  const arrayOfCards1 = [];
  const arrayOfCards2 = [];
  //create first half of the deck
  for (i = 0; i < numOfCards / 2; i++) {
    const divNova = document.createElement("div");
    divNova.className = "card canClick";
    divNova.setAttribute("onclick", "clickCard(this)");
    const divFaceCard = document.createElement("div");
    divFaceCard.className = "front-face face";
    const faceCard = document.createElement("img");
    faceCard.src = `./resources/card_image.png`;
    const divVersoCard = document.createElement("div");
    divVersoCard.className = "back-face face";
    const versoCard = document.createElement("img");
    versoCard.src = `./resources/cards/${i}.gif`;
    divFaceCard.appendChild(faceCard);
    divVersoCard.appendChild(versoCard);
    divNova.appendChild(divFaceCard);
    divNova.appendChild(divVersoCard);
    arrayOfCards1[i] = divNova;
  }
  //create second half of the deck
  for (i = 0; i < numOfCards / 2; i++) {
    const divNova = document.createElement("div");
    divNova.className = "card canClick";
    divNova.setAttribute("onclick", "clickCard(this)");

    const divFaceCard = document.createElement("div");
    divFaceCard.className = "front-face face";

    const faceCard = document.createElement("img");
    faceCard.src = `./resources/card_image.png`;

    const divVersoCard = document.createElement("div");
    divVersoCard.className = "back-face face";

    const versoCard = document.createElement("img");
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
  const cardContainer = document.querySelector(".CARD-CONTAINER");
  arrayOfCards.sort(comparador);
  for (i = 0; i < arrayOfCards.length; i++) {
    cardContainer.appendChild(arrayOfCards[i]);
  }

  function comparador() {
    return Math.random() - 0.5;
  }
}

function removeCards() {
  for (i = 0; i < arrayOfCards.length; i++) {
    const cardToBeRemoved = document.querySelector(".card");
    cardToBeRemoved.remove();
  }
  clearArrayOfCards();
}
//private use to removeCards()
function clearArrayOfCards() {
  const size = arrayOfCards.length;
  for (i = 0; i < size; i++) {
    arrayOfCards.pop();
  }
}
