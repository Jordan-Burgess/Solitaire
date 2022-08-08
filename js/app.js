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
}

const suit = ['H', 'S', 'C', 'D',];
const rank = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K',];
let solitaireDeck = new Deck([]);

for (let i=0; i<suit.length; i++){
    for (let j=0; j<rank.length; j++){
        let card = new Card(suit[i], rank[j], false, false);
        solitaireDeck.cards.push(card);
    }
}

// If user clicks main deck div, then draw a card 

solitaireDeck.shuffle()
console.log(solitaireDeck)

for(let i =0; i<56; i++){
    solitaireDeck.draw()
    console.log(i)
}