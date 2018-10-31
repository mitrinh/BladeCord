// Michael Trinh
// BladeCord

// class for hand object
class hand {
    // initialize the hand
    constructor(deck, quantity) {
        this.contents = new Array();
        this.regularCards = 0;
        this.specialCards = 0;
        this.create(deck,quantity);
    } // end constructor

    // create a hand of a number of cards
    create(deck, quantity) {
        var card;
        for(var i = 0; i < quantity; i++){
            card = deck[deck.length-1]
            this.contents.push(card);
            deck.pop();
        }
    } // end create

    // print the hand
    print() {
        var output = this.contents[0].cardType + ', ';
        const length = this.contents.length;
        for (var i = 1; i < length; i++) {
            if (i == length-1) output += this.contents[i].cardType;
            else output += this.contents[i].cardType + ', ';
        }
        console.log("hand: " + output);
        return output;
    } // end print

} // end hand

module.exports = hand;