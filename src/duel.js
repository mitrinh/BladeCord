// Michael Trinh
// BladeCord

const Deck = require('./deck');
const Field = require('./field');
const Hand = require('./hand');

const cardTypes = 11; // 1-7, bolt, mirror, blast, force
const numOfCopies = 4 // number of copies of each card in deck
const startHandQuantity = 10; // number of cards a player has a start of game

// class for duel object
class duel {

    // initalize the duel
    constructor() {
        // makes deck for duel
        this.deck = new Deck(cardTypes, numOfCopies);
        // makes hands for duel, pass the array of deck not the object
        this.hand1 = new Hand(this.deck.contents, startHandQuantity);
        this.hand2 = new Hand(this.deck.contents, startHandQuantity);
    } // end constructor

    // prints the deck
    printDeck() {
        return this.deck.print();
    } // end printDeck

    // prints hand1
    printHand1() {
        return this.hand1.print();
    } // end printHand1

    // prints hand2
    printHand2() {
        return this.hand2.print();
    } // end printHand2

}

module.exports = duel;