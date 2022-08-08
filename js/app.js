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
            console.log(this.cards[this.drawCounter]);
            this.drawCounter++;
        }
    }
    selectCard(){
            if(this.drawCounter > 0){
                this.cards[this.drawCounter-1].select = true;
                // highlight this card in css
                this._placeCard(column1); // Set to either columns/sorted suits/or draw deck
                // addEventListener to get place
            }
            else{
                console.log('No Cards to select')
            }
    }
    _placeCard(place){

        // If div clicked is draw deck mark as unselected and keep in deck
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
            if (this.cards[this.drawCounter-1].color != place[place.length-1].color && rank.indexOf(this.cards[this.drawCounter-1].rank) == rank.indexOf(place[place.length-1].rank) - 1){
                return true;
            }
        }else if(place == hearts || place == spades || place == clubs || place == diamonds){
            if (this.cards[this.drawCounter-1].suit == place[place.length-1].suit && rank.indexOf(this.cards[this.drawCounter-1].rank) == rank.indexOf(place[place.length-1].rank) + 1){
                return true;
            }
        }
        return false
    }
}

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
let hearts = []
let spades = []
let clubs = []
let diamonds = []

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

// If user clicks main deck div, then draw a card 

solitaireDeck.shuffle()
// console.log(solitaireDeck)

// for(let i =0; i<56; i++){
//     solitaireDeck.draw()
//     console.log(i)
// }

// If User clicks card on draw deck div, mark that card as selected
// run select card

// If same card is selected marks as not selected 
// run place card


// solitaireDeck.selectCard()
// solitaireDeck.selectCard()
// solitaireDeck.selectCard()

// console.log(column1)

let testCard1 = new Card('H', '5', 'Red', false, false)
let testCard2 = new Card('S', '10', 'Black', false, false)

// console.log(testCard)
column1.push(testCard1)
column1.push(testCard2)

console.log(column1)

solitaireDeck.draw()
solitaireDeck.draw()
solitaireDeck.draw()
solitaireDeck.draw()
solitaireDeck.draw()
solitaireDeck.draw()
solitaireDeck.selectCard()
solitaireDeck.selectCard()
solitaireDeck.selectCard()

console.log(column1)