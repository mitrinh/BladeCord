// Michael Trinh
// BladeCord

const Card = require('./card.js');
const Randomizer = require('underscore');

function deck(cardTypes, numOfCopies) {
    // creates a shuffled deck
    this.create = function() {
        this.contents = new Array();    
        // adds each type of card in the deck
        for (i = 0; i < cardTypes; i++) {
            // adds a number of copies of each card in the deck
            for(j = 0; j < numOfCopies; j++) {
                if (i < 7) this.contents[j+(i*numOfCopies)] = new Card(false, 0, i+1);
                // this happens when i >= 7 for each special card
                else this.contents[j+(i*numOfCopies)] = new Card(false, i-6, 1)
            }
        }
        // shuffle the deck
        this.contents = Randomizer.shuffle(this.contents);
    } // end create
} // end deck



module.exports = deck;