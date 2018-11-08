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
        // result flag returns whether player 1 inGame, won, lost, or draw
        this.result = "inProgress";
        this.createObjects();
        this.initializeField();
    } // end constructor

    // creates all of the objects for the duel
    createObjects() {
        // makes deck for duel
        this.deck = new Deck(cardTypes, numOfCopies);
        // makes hands for duel, pass the array of deck not the object
        this.hand1 = new Hand(this.deck.contents, startHandQuantity);
        this.hand2 = new Hand(this.deck.contents, startHandQuantity);
        this.field1 = new Field();
        this.field2 = new Field();
    } // end create

    // put the top card of the deck to each side of the field as the first card
    initializeField() {
        // initial values are 0, if value of both fields are equal do again
        while(this.field1.value == this.field2.value) {
            this.field1.clear();
            this.field2.clear();
            // iterate adding a card to each field, return draw if deck is empty
            for(var i = 0; i < 2 && !this.deck.empty(); i++) {
                // top card is cloned to field 
                if(i == 0) this.field1.startAdd(this.deck.contents[this.deck.contents.length-1]);
                else if(i == 1) this.field2.startAdd(this.deck.contents[this.deck.contents.length-1]);
                else {
                    this.result = "draw";
                }
                // discard card from deck
                this.deck.contents.pop();
            }
        }
        // gets the player who goes first
        this.playerTurn = (this.field1.value < this.field2.value) ? 1 : 2;
    } // end start

}

module.exports = duel;