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
            card = deck[deck.length-1];
            this.contents.push(card);
            deck.pop();
        }
    } // end create

    // check if hand is empty
    empty() {
        return (this.contents === undefined || this.contents.length == 0)
    } // end empty

    // print the hand
    print() {
        var output;
        // check if hand is empty or not
        if(!this.empty()){
            output = this.contents[0].cardType;
            const length = this.contents.length;
            for (var i = 1; i < length; i++) {
                output += ', ' + this.contents[i].cardType;
            }
        }
        else {
            output = "empty";
        }
        console.log("\t hand: " + output);
        return output;
    } // end print

} // end hand

module.exports = hand;