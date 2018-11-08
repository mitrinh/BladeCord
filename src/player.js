// Michael Trinh
// BladeCord

const Field = require('./field');

// class for player object
class player {
    
    constructor(hand) {
        this.createObjects();
        this.hand = hand;
    } // end constructor

    // creates all of the objects for the duel
    createObjects() {
        this.field = new Field();
    } // end createObjects

    // set the player to a discordId
    setId(id){
        this.id = id;
    } // end setId

} // end player

module.exports = player;