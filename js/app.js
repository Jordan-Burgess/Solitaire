class Card {
    constructor(suit, rank, color, faceUp, select){
        this.suit = suit;
        this.rank = rank;
        this.faceUp = faceUp;
        this.select = select;
        this.color = color;
    }
}

class Deck {
    constructor (cards){
        this.cards = cards;
        this.drawCounter = 0;
    }
    shuffle(){
        let currentIndex = this.cards.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [this.cards[currentIndex], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[currentIndex]];
        }
    }
    draw(){
        if (this.drawCounter == this.cards.length){
            //Display blank card on Main deck div
            console.log("Going back to the beginning");
            this.drawCounter = 0;
            
        }else{
            // Display this card on Draw deck div
            this.drawCounter++;
        }
    }
    setUp(){
        for (let i=7;i>=1;i--){
            for(let j=1;j<=i;j++){
                this.draw()
                let currentCard = this.cards[this.drawCounter-1];
                this.cards.splice(this.drawCounter-1, 1);
                if (j==i){
                    currentCard.faceUp = true;
                }
                let variable = `column${i}`
                eval(variable).push(currentCard);
                this.drawCounter--;
            }
        } 
        addCards()
        
    }
    selectCardFromDeck(){
            if(this.drawCounter > 0){
                this.cards[this.drawCounter-1].select = true;
                // highlight this card in css
                
                if (selectPlace){
                    this._placeCard(selectPlace); 
                        // Set to either columns/sorted suits/or draw deck}
                }
            }
            else{
                console.log('No Cards Drawn')
            }
    }
    _placeCard(place){

        if(this._canPlaceCard(place)){
            let currentCard = this.cards[this.drawCounter-1];
            this.cards.splice(this.drawCounter-1, 1);
            currentCard.faceUp = true;
            currentCard.select = false;
            place.push(currentCard);
            this.drawCounter--;
        }else{
            this.cards[this.drawCounter-1].select = false;
        }   
   }  
    _canPlaceCard(place){
        if (place == column1 || place == column2 || place == column3 || place == column4 || place == column5 || place == column6 || place == column7){
            if (place == false || this.cards[this.drawCounter-1].color != place[place.length-1].color && rank.indexOf(this.cards[this.drawCounter-1].rank) == rank.indexOf(place[place.length-1].rank) - 1){
                return true;
            }
        }else if(place == sortSuit1 || place == sortSuit2 || place == sortSuit3 || place == sortSuit4){
            if (place == false && this.cards[this.drawCounter-1].rank == 'A'){
                return true;
            }else if (place == true && this.cards[this.drawCounter-1].suit == place[place.length-1].suit && rank.indexOf(this.cards[this.drawCounter-1].rank) == rank.indexOf(place[place.length-1].rank) + 1){
                return true;
            }
        }
        return false
    }
}

let mainDeck = document.querySelector('.main-deck');
let drawDiv = document.querySelector('.draw-deck');
let sortingDeck = document.querySelectorAll('.sorting');

console.log(sortingDeck)

// Card Face Info and Deck Instance
const suit = ['H', 'S', 'C', 'D',];
const rank = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K',];

let solitaireDeck = new Deck([]);

// Main table columns
let column1 = []
let column2 = []
let column3 = []
let column4 = []
let column5 = []
let column6 = []
let column7 = []
let sortSuit1 = []
let sortSuit2 = []
let sortSuit3 = []
let sortSuit4 = []

sortingArrayColumns = [sortSuit1, sortSuit2, sortSuit3, sortSuit4, column1, column2, column3, column4, column5, column6, column7,]

let selectPlace = null

// 52 Card Instances and added to Deck
for (let i=0; i<suit.length; i++){
    for (let j=0; j<rank.length; j++){
        if(suit[i] == 'H' || suit[i] == 'D'){
            let card = new Card(suit[i], rank[j], 'Red', false, false);
            solitaireDeck.cards.push(card);
        }else{
            let card = new Card(suit[i], rank[j], 'Black', false, false);
            solitaireDeck.cards.push(card);
        }
    }
}


// let gameActive = true;
solitaireDeck.shuffle();
solitaireDeck.setUp();








function addCards() {
    
    for (let i=4; i<sortingArrayColumns.length;i++){
        for (let j=0; j<sortingArrayColumns[i].length; j++){
            console.log(sortingArrayColumns[i])
                let tempElem = document.createElement('div')
                if (sortingArrayColumns[i][j].faceUp == false){
                    tempElem.innerText = `Face Down`
                }else{
                    tempElem.innerText = `${sortingArrayColumns[i][j].suit}${sortingArrayColumns[i][j].rank}`; 
            }
            sortingDeck[i].appendChild(tempElem);
        }
            
        
    
        
    }
}




// add event listeners to have draw() run if user clicks main deck div
mainDeck.addEventListener('click', () =>{
    solitaireDeck.draw()
    drawDiv.innerText = `${solitaireDeck.cards[solitaireDeck.drawCounter].suit}${solitaireDeck.cards[solitaireDeck.drawCounter].rank}`
});

// add event listener to have select() run if user clicks draw deck div
drawDiv.addEventListener('click', () =>{
    solitaireDeck.selectCardFromDeck()
});

sortingDeck.forEach(sort => {
    sort.addEventListener('click', (e) => {
        let place = e.target.className.split(' ')[1]
        console.log(place)
        switch(place){
            case 'sort-suit1':
                selectPlace = sortSuit1;
                break;
            case 'sort-suit2':
                selectPlace = sortSuit2;
                break;
            case 'sort-suit3':
                selectPlace = sortSuit3;
                break;
            case 'sort-suit4':
                selectPlace = sortSuit4;
                break;
            case 'column1':
                selectPlace = column1;
                break;
            case 'column2':
                selectPlace = column2;
                break; 
            case 'column3':
                selectPlace = column3;
                break;
            case 'column4':
                selectPlace = column4;
                break; 
            case 'column5':
                selectPlace = column5;
                break; 
            case 'column6':
                selectPlace = column6;
                break; 
            case 'column7':
                selectPlace = column7;
                break;      
        }
        if (solitaireDeck.cards[solitaireDeck.drawCounter].select = true){
            solitaireDeck.selectCardFromDeck();
            console.log(selectPlace)
            console.log(solitaireDeck.cards[solitaireDeck.drawCounter])
            selectPlace = null;
        }
    });
});

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