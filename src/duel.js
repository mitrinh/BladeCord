// Michael Trinh
// BladeCord

const Deck = require('./deck');
const Player = require('./player');
const Hand = require('./hand');

const cardTypes = 11; // 1-7, bolt, mirror, blast, force
const numOfCopies = 4 // number of copies of each card in deck
const startHandQuantity = 10; // number of cards a player has a start of game

// class for duel object
class duel {
    // initalize the duel
    constructor() {
        // status flag returns status of a duel
        this.status = "not accepted";
        this.createObjects();
        this.initializeField();
    } // end constructor

    // creates all of the objects for the duel
    createObjects() {
        // makes deck for duel
        this.deck = new Deck(cardTypes, numOfCopies);
        // create both players
        // makes hands for duel, pass the array of deck not the object
        this.player1 = new Player(new Hand(this.deck.contents, startHandQuantity));
        this.player2 = new Player(new Hand(this.deck.contents, startHandQuantity));
    } // end createObjects

    // put the top card of the deck to each side of the field as the first card
    initializeField() {
        // initial values are 0, if value of both fields are equal do again
        while(this.player1.field.value == this.player2.field.value) {
            this.player1.field.clear();
            this.player2.field.clear();
            // iterate adding a card to each field, return draw if deck is empty
            for(var i = 0; i < 2 && !this.deck.empty(); i++) {
                // top card is cloned to field 
                if(i == 0) this.player1.field.startAdd(
                    this.deck.contents[this.deck.contents.length-1]);
                else if(i == 1) this.player2.field.startAdd(
                    this.deck.contents[this.deck.contents.length-1]);
                else {
                    this.status = "draw";
                }
                // discard card from deck
                this.deck.contents.pop();
            }
        }
        // gets the player who goes first
        this.playerTurn = (this.player1.field.value < this.player2.field.value) ? 1 : 2;
    } // end initializeField

}

module.exports = duel;