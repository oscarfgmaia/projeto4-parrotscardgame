function createCards(){
    let cardContainer = document.querySelector('.CARD-CONTAINER');
    let divNova = document.createElement("div");
    let conteudoNovo = document.createTextNode('<img src="./resources/card_image.png" alt="">');
    console.log(cardContainer)
    console.log(divNova)
    console.log(conteudoNovo)
    divNova.appendChild(conteudoNovo);
//    cardContainer.body.insertBefore(divNova,cardContainer);
    console.log(divNova)
    document.body.insertBefore(divNova,cardContainer)
}
/*

            <div class="card">
                <img src="./resources/card_image.png" alt="">
            </div>

            */