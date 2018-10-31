// Michael Trinh
// BladeCord

// class for field object
class field {
    
    // initialize empty field for a player
    constructor() {
        this.contents = new Array();
        this.pile = 0;
    } // end constructor

    // clears all cards from the field
    clear() {
        while(!(this.contents === undefined || this.contents.length == 0)) {
            this.contents.pop();
        }
    } // end clear

} // end field

module.exports = field;