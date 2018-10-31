// Michael Trinh
// BladeCord

const Card = require('./card');
const Randomizer = require('underscore');

/* class for a deck object */
class deck {

    // initialize and create a deck
    constructor(cardTypes, numOfCopies) {
        this.contents = new Array();
        this.create(cardTypes, numOfCopies);
    } // end constructor

    // creates a shuffled deck
    create(cardTypes, numOfCopies) {  
        // adds each type of card in the deck
        for (var i = 0; i < cardTypes; i++) {
            // adds a number of copies of each card in the deck
            for(var j = 0; j < numOfCopies; j++) {
                // adds in regular cards
                if (i < 7) {
                    this.contents.push(new Card(false, 'card' + (i+1).toString(), i+1));
                } 
                // adds in special cards
                else {
                    switch(i) {
                        case 7:
                            this.contents.push(new Card(false, 'bolt', 1));
                            break;
                        case 8:
                            this.contents.push(new Card(false, 'mirror', 1));
                            break;
                        case 9:
                            this.contents.push(new Card(false, 'blast', 1));
                            break;
                        case 10:
                            this.contents.push(new Card(false, 'force', 1));
                            break;
                        default:
                            console.log("Out of cards.");
                    }
                }
            }
        }
        // shuffle the deck
        this.setDeck(Randomizer.shuffle(this.contents));
    } // end create

    // set the deck to a deck, used for workaround intellisense bug in vscode
    setDeck(deck) {
        this.contents = deck;
    } // end setDeck

    // print the deck
    print() {
        var output = this.contents[0].cardType + ', ';
        const length = this.contents.length;
        for(var i = 1; i < length; i++) {
            if (i == length-1) output += this.contents[i].cardType;
            else output += this.contents[i].cardType + ', ';
        }
        console.log("deck: " + output);
        return output;
    } // end print

} // end deck

module.exports = deck;