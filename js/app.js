class Card {
    constructor(suit, rank, color, faceUp){
        this.suit = suit;
        this.rank = rank;
        this.faceUp = faceUp;
        this.color = color;
    };
};

class Deck {
    constructor (cards){
        this.cards = cards;
        this.drawCounter = 0;
    };
    shuffle(){
        let currentIndex = this.cards.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [this.cards[currentIndex], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[currentIndex]];
        };
    };
    draw(){
        if (this.drawCounter == this.cards.length){
            drawDiv.innerText = '';
            drawDiv.style.backgroundImage = 'none';
            console.log("Going back to the beginning");
            this.drawCounter = 0;
            mainDeck.style.backgroundImage = "url('../images/cardback.png')";
        }else{
            if(this.drawCounter >= 0 && this.drawCounter < this.cards.length){
                console.log(this.drawCounter);
                drawDiv.style.backgroundImage = `url('../images/${this.cards[this.drawCounter].suit}/${this.cards[this.drawCounter].rank}.png')`;
                if(this.drawCounter == this.cards.length-1){
                    mainDeck.style.backgroundImage = 'none';
                }
            }
            
            this.drawCounter++;
        }
    }
    setUp(columns){
        for (let i=7;i>=1;i--){
            for(let j=1;j<=i;j++){
                this.draw();
                let currentCard = this.cards[this.drawCounter-1];
                this.cards.splice(this.drawCounter-1, 1);
                if (j==i){
                    currentCard.faceUp = true;
                }
                let variable = `column${i}`;
                eval(variable).push(currentCard);
                this.drawCounter--;
            };
        }; 
        for (let i=4; i<sortingArrayColumns.length;i++){
            for (let j=0; j<sortingArrayColumns[i].length; j++){
                    let tempElem = document.createElement('div');
                    if (sortingArrayColumns[i][j].faceUp == false){
                        tempElem.innerText = `Face Down`;
                        tempElem.style.backgroundImage = "url('../images/cardback.png')";
                    }else{
                        tempElem.style.backgroundImage = `url('../images/${sortingArrayColumns[i][j].suit}/${sortingArrayColumns[i][j].rank}.png')`;
                        tempElem.style.minWidth = '130px';
                        tempElem.style.minHeight = '190px';

                }
                tempElem.className = 'card';
                columns[i].appendChild(tempElem);
            }
        }
        this.drawCounter = 0;
        drawDiv.innerText = '';
        drawDiv.style.backgroundImage = 'none';
        
    }
    selectCardFromDeck(){
        if(this.drawCounter > 0){
            selectedCard = this.cards[this.drawCounter-1];
            console.log(selectedCard);
            drawDiv.style.boxShadow = "0 10px 10px";

        }else{
            console.log('No Cards Drawn');
        };
    };
};

// the moved arrays are not being pushed to the new list

// Query Selector of main board Areas
let mainDeck = document.querySelector('.main-deck');
let drawDiv = document.querySelector('.draw-deck');
let sortingColumnDivs = document.querySelectorAll('.sorting');

let selectedCard = null;
let selectedPlace = null;
let previousColumn = null;
let previousIdx = null;
let previousParent = null;

// Columns for card Data
let column1 = [];
let column2 = [];
let column3 = [];
let column4 = [];
let column5 = [];
let column6 = [];
let column7 = [];
let sortSuit1 = [];
let sortSuit2 = [];
let sortSuit3 = [];
let sortSuit4 = [];
let sortingArrayColumns = [sortSuit1, sortSuit2, sortSuit3, sortSuit4, column1, column2, column3, column4, column5, column6, column7,];

// Card Face Information
const suit = ['H', 'S', 'C', 'D',];
const rank = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K',];
let solitaireDeck = new Deck([]);

function makeSolitaireDeck(){
    for (let i=0; i<suit.length; i++){
        for (let j=0; j<rank.length; j++){
            if(suit[i] == 'H' || suit[i] == 'D'){
                let card = new Card(suit[i], rank[j], 'Red', false, false);
                solitaireDeck.cards.push(card);
            }else{
                let card = new Card(suit[i], rank[j], 'Black', false, false);
                solitaireDeck.cards.push(card);
            };
        };
    };
};

function findColumnArray(divClass) {
    let place = divClass
    switch(place){
        case 'sort-suit1':
            selectedPlace = sortSuit1;
            break;
        case 'sort-suit2':
            selectedPlace = sortSuit2;
            break;
        case 'sort-suit3':
            selectedPlace = sortSuit3;
            break;
        case 'sort-suit4':
            selectedPlace = sortSuit4;
            break;
        case 'column1':
            selectedPlace = column1;
            break;
        case 'column2':
            selectedPlace = column2;
            break; 
        case 'column3':
            selectedPlace = column3;
            break;
        case 'column4':
            selectedPlace = column4;
            break; 
        case 'column5':
            selectedPlace = column5;
            break; 
        case 'column6':
            selectedPlace = column6;
            break; 
        case 'column7':
            selectedPlace = column7;
            break;      
    };
};

function _placeCard(place, e){
    if(_canPlaceCard(place)){
        if (solitaireDeck.cards.includes(selectedCard)){
            solitaireDeck.cards.splice(solitaireDeck.drawCounter-1, 1); 
            solitaireDeck.drawCounter--;
            if (solitaireDeck.drawCounter == 0){
                drawDiv.innerText = '';
                drawDiv.style.backgroundImage = 'none'
                drawDiv.style.boxShadow = 'none';

            }else{
            drawDiv.style.backgroundImage = `url('../images/${solitaireDeck.cards[solitaireDeck.drawCounter-1].suit}/${solitaireDeck.cards[solitaireDeck.drawCounter-1].rank}.png')`;
            drawDiv.style.boxShadow = 'none';
            };
        };
        if(Array.isArray(selectedCard)){
            for(let i=0; i<selectedCard.length; i++){
                let currentCard = selectedCard[i];
                let cardElem = document.createElement('div');
                cardElem.innerText = `${currentCard.suit}${currentCard.rank}`;
                cardElem.className = 'card';
                e.target.append(cardElem)
                place.push(currentCard)
            }
            selectedCard = null;
            clearPastColumn()
        }else{
            let currentCard = selectedCard;
            selectedCard = null;
            currentCard.faceUp = true;
        
            let cardElem = document.createElement('div');
            cardElem.innerText = `${currentCard.suit}${currentCard.rank}`;
            cardElem.className = 'card';
            e.target.append(cardElem);

            place.push(currentCard);
        }
        selectedPlace = null;
        return true;

    }else{
        selectedCard = null;
        selectedPlace = null;

        /// get previous parent and index - set box shadow and all next siblings to no box shadow (target)
        // .style.boxShadow = "0 10px 10px";
        return false;
    }; 
};  

function _canPlaceCard(place){
    let cardRank
    let cardSuit
    let cardColor

    cardRank = selectedCard.rank || selectedCard[0].rank;
    cardSuit = selectedCard.suit || selectedCard[0].suit;
    cardColor = selectedCard.color || selectedCard[0].color;

    if (place == column1 || place == column2 || place == column3 || place == column4 || place == column5 || place == column6 || place == column7){
        if (place.length == 0 || cardColor != place[place.length-1].color && rank.indexOf(cardRank) == rank.indexOf(place[place.length-1].rank) - 1){
            return true;
        };
    }else if(place == sortSuit1 || place == sortSuit2 || place == sortSuit3 || place == sortSuit4){
        if (place.length == 0 && cardRank == 'A'){
            return true;
        }else if (place.length > 0 && cardSuit == place[place.length-1].suit && rank.indexOf(cardRank) == rank.indexOf(place[place.length-1].rank) + 1){
            return true;
        };
    };
    return false;
};

function clearPastColumn(){
    previousColumn.splice(previousIdx);
    if (previousColumn.length > 0){
        previousColumn[previousColumn.length-1].faceUp = true;
    }
    
    while(previousParent.firstChild){
        previousParent.removeChild(previousParent.lastChild)
    }
    for(let i=0; i<previousColumn.length; i++){
        let tempElem = document.createElement('div');
        if (previousColumn[i].faceUp == false){
            tempElem.innerText = `Face Down`;
        }else{
            tempElem.innerText = `${previousColumn[i].suit}${previousColumn[i].rank}`; 
        }
        tempElem.className = 'card';
        previousParent.appendChild(tempElem);
    }
    previousColumn = null;
    previousIdx = null;
    previousParent = null;
}
    
function getSelectedCards(e){
    let divClass = e.target.parentNode.className.split(' ')[1];
    findColumnArray(divClass);
    let column = selectedPlace;
    selectedPlace = null;
    
    let idx = [...e.target.parentNode.childNodes].indexOf(e.target);
    previousColumn = column;
    previousIdx = idx;
    previousParent = e.target.parentNode;

    selectedCard = column.slice(idx);
    
    e.target.style.boxShadow = "0 10px 10px";
}



makeSolitaireDeck();
solitaireDeck.shuffle();
solitaireDeck.setUp(sortingColumnDivs);
console.log(solitaireDeck)



// EVENT LISTENERS
mainDeck.addEventListener('click', () =>{
    selectedCard = null;
    drawDiv.style.boxShadow = "none";
    solitaireDeck.draw();
});

drawDiv.addEventListener('click', () =>{
    solitaireDeck.selectCardFromDeck();
});

sortingColumnDivs.forEach(place => {
    place.addEventListener('click', (e) => {
        if(selectedCard != null){
            let divClass = e.target.className.split(' ')[1]
            findColumnArray(divClass);
            _placeCard(selectedPlace, e);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    let cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            if(card.style.backgroundImage != "url('../images/cardback.png')"){
                getSelectedCards(e);
            }
        })
    });
});

document.addEventListener('DOMNodeInserted', () => {
    let cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            if(card.style.backgroundImage != "url('../images/cardback.png')"){
                getSelectedCards(e);
            }
        })
    })
})