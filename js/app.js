class Card {
    constructor(suit, rank, faceUp, select){
        this.suit = suit;
        this.rank = rank;
        this.faceUp = faceUp;
        this.select = select;
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
                this.placeCard('column1'); // Set to either columns/sorted suits/or draw deck
                // addEventListener to get place
            }
            else{
                console.log('No Cards to select')
            }
    }
    placeCard(place){

        // If div clicked is draw deck mark as unselected and keep in deck
        if (place == 'deck div'){ //==deck div
            this.cards[this.drawCounter-1].select = false;
        }
        // Else Remove card from deck and add to one of the table columns
        else{
            let currentCard = this.cards[this.drawCounter-1];
            this.cards.splice(this.drawCounter-1, 1);
            currentCard.select = false
            column1.push(currentCard);
            this.drawCounter--;
        }
        
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

for (let i=0; i<suit.length; i++){
    for (let j=0; j<rank.length; j++){
        let card = new Card(suit[i], rank[j], false, false);
        solitaireDeck.cards.push(card);
    }
}

// If user clicks main deck div, then draw a card 

solitaireDeck.shuffle()
console.log(solitaireDeck)

// for(let i =0; i<56; i++){
//     solitaireDeck.draw()
//     console.log(i)
// }

// If User clicks card on draw deck div, mark that card as selected
// run select card

// If same card is selected marks as not selected 
// run place card

// solitaireDeck.draw()
// solitaireDeck.draw()
// solitaireDeck.selectCard()
// solitaireDeck.selectCard()
// solitaireDeck.selectCard()

// console.log(column1)