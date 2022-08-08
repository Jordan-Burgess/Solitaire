class Card {
    constructor(suit, rank, faceUp, select){
        this.suit = suit;
        this.rank = rank;
        this.faceUp = faceUp;
        this.select = select;
    }
}

class Deck {
    constructor (length, cards){
        this.length = length;
        this.cards = cards;
    }
    shuffle(){
        let currentIndex = this.cards.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [this.cards[currentIndex], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[currentIndex]];
        }
    }
}

const suit = ['H', 'S', 'C', 'D',];
const rank = ['A', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K',];
let solitaireDeck = new Deck(52, []);

for (let i=0; i<suit.length; i++){
    for (let j=0; j<rank.length; j++){
        let card = new Card(suit[i], rank[j], false, false);
        solitaireDeck.cards.push(card);
    }
}