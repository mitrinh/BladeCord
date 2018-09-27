// Michael Trinh
// BladeCord

const Card = require('./card.js');
const Randomizer = require('underscore');

/* class for a deck object */
class deck{

    // constructor
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
                    this.contents[j+(i*numOfCopies)] = new Card(false, 'card' + (i+1).toString(), i+1);
                } 
                // adds in special cards
                else {
                    switch(i) {
                        case 7:
                            this.contents[j+(i*numOfCopies)] = new Card(false, 'bolt', 1);
                            break;
                        case 8:
                            this.contents[j+(i*numOfCopies)] = new Card(false, 'mirror', 1);
                            break;
                        case 9:
                            this.contents[j+(i*numOfCopies)] = new Card(false, 'blast', 1);
                            break;
                        case 10:
                            this.contents[j+(i*numOfCopies)] = new Card(false, 'force', 1);
                            break;
                        default:
                            console.log("Out of cards.")
                    }
                }
            }
        }
        // shuffle the deck
        this.contents = Randomizer.shuffle(this.contents);
    } // end create

} // end deck

module.exports = deck;