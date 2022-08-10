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
            console.log("Going back to the beginning");
            this.drawCounter = 0;
        }else{
            if(this.drawCounter >= 0 && this.drawCounter < this.cards.length){
                drawDiv.innerText = `${this.cards[this.drawCounter].suit}${this.cards[this.drawCounter].rank}`;
                console.log(this.drawCounter);
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
                    }else{
                        tempElem.innerText = `${sortingArrayColumns[i][j].suit}${sortingArrayColumns[i][j].rank}`; 
                }
                tempElem.className = 'card';
                columns[i].appendChild(tempElem);
            }
        }
        this.drawCounter = 0;
        drawDiv.innerText = '';
    }
    selectCardFromDeck(){
        if(this.drawCounter > 0){
            selectedCard = this.cards[this.drawCounter-1];
            console.log(selectedCard);
        }else{
            console.log('No Cards Drawn');
        };
    };
};

// Query Selector of main board Areas
let mainDeck = document.querySelector('.main-deck');
let drawDiv = document.querySelector('.draw-deck');
let sortingColumnDivs = document.querySelectorAll('.sorting');

let selectedCard = null;
let selectedPlace = null;

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

// Create 52 card and 1 deck instances
let solitaireDeck = new Deck([]);
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
            }else{
            drawDiv.innerText = `${solitaireDeck.cards[solitaireDeck.drawCounter-1].suit}${solitaireDeck.cards[solitaireDeck.drawCounter-1].rank}`;
            };
        };

        let currentCard = selectedCard;
        selectedCard = null;
        currentCard.faceUp = true;
        

        let cardElem = document.createElement('div');
        cardElem.innerText = `${currentCard.suit}${currentCard.rank}`;
        cardElem.className = 'card';
        console.log(e.target);
        e.target.append(cardElem);

        place.push(currentCard);
        selectedPlace = null;
        return true;

    }else{
        selectedCard = null;
        selectedPlace = null;
        return false;
    }; 
};  

function _canPlaceCard(place){
    if (place == column1 || place == column2 || place == column3 || place == column4 || place == column5 || place == column6 || place == column7){
        if (place.length == 0 || selectedCard.color != place[place.length-1].color && rank.indexOf(selectedCard.rank) == rank.indexOf(place[place.length-1].rank) - 1){
            return true;
        };
    }else if(place == sortSuit1 || place == sortSuit2 || place == sortSuit3 || place == sortSuit4){
        if (place.length == 0 && selectedCard.rank == 'A'){
            return true;
        }else if (place.length > 0 && selectedCard.suit == place[place.length-1].suit && rank.indexOf(selectedCard.rank) == rank.indexOf(place[place.length-1].rank) + 1){
            return true;
        };
    };
    return false;
};
    
function getSelectedCards (e){
    // Find Column of clicked table card
    let divClass = e.target.parentNode.className.split(' ')[1];
    findColumnArray(divClass);
    let column = selectedPlace;
    selectedPlace = null;
    console.log(column);

    // Find index of clicked card
    let idx = [...e.target.parentNode.childNodes].indexOf(e.target)
    console.log(idx)

    selectedCard = column[idx]
    console.log(selectedCard)

}


solitaireDeck.shuffle();
solitaireDeck.setUp(sortingColumnDivs);

console.log(sortingArrayColumns);
console.log(solitaireDeck.cards);





mainDeck.addEventListener('click', () =>{
    selectedCard = null;
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
        }
        _placeCard(selectedPlace, e);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    let cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            getSelectedCards(e);
        })
    });
});

document.addEventListener('DOMNodeInserted', () => {
    let cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            getSelectedCards(e);
        })
    })
})


/// Can only select Face Up card

/// If user clicks on another column after,  cards will be placed based on condition. 

/// The previous column last card will be set to face up































// if (solitaireDeck.drawCounter >0 && solitaireDeck.cards[solitaireDeck.drawCounter-1].select == true){
        //     solitaireDeck.selectCardFromDeck(e.target);
        //     console.log(selectPlace)
        //     selectedPlace = null;
        // }



// console.log(selectList)



         //// Push selected card and all child elements to list

         //// When div element is clicked, find that index placing in the column it is. Update column card


            //// Only select card if it is faceUp
            ///// check nextSibling
            ///// Also move column cards
            

            

            /// Get the element clicked and all the next siblings if element has. Add to list. 
            // console.log(selectList[0].nextSibling)
            

// let cards = document.querySelectorAll('.card');
// // Find the parent div and the index for each card clicked
// cards.forEach(card => {
    
// })



// let gameActive = true;


// function addCards() {    
//     for (let i=4; i<sortingArrayColumns.length;i++){
//         for (let j=0; j<sortingArrayColumns[i].length; j++){
//                 let tempElem = document.createElement('div')
//                 if (sortingArrayColumns[i][j].faceUp == false){
//                     tempElem.innerText = `Face Down`
//                 }else{
//                     tempElem.innerText = `${sortingArrayColumns[i][j].suit}${sortingArrayColumns[i][j].rank}`; 
//             }
//             tempElem.className = 'card';
//             sortingDeck[i].appendChild(tempElem);
//         }
//     }
// }

// Need to get card nodes and add event listener to see if user clicked it
// Get card nodes





//     column.addEventListener('DOMNodeInserted', () => {
//         // User will click on card in a column
//         // Get the DOM Node of what user clicked and every one below
//         // Use the _placeCard function to place card in another column.
//         // If card is 1 card, can check suit conditions, otherwise just check column conditions.
    
// })

// add event listeners to have draw() run if user clicks main deck div


// add event listener to have select() run if user clicks draw deck div






// console.log(column7)

// Append divs to column for each element in column list

// console.log(sortingDeck.length)


// let drawCard = document.createElement('div')
// drawCard.innerText = `${solitaireDeck.cards[solitaireDeck.drawCounter].suit}${solitaireDeck.cards[solitaireDeck.drawCounter].rank}`
// drawDeck.appendChild(drawCard)




// Create conditionals for board play.
// User can select on any item in a column if it is faceup,
// User can only select on last item in sorted suits


// Always show last item of list for sorted suits

//             while (selectList[idx].nextSibling != null){
//                 selectList.push(selectList[idx].nextSibling);
//                 idx++;
//             }

//             console.log(selectList)

// }
