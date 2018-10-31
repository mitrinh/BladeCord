// Michael Trinh
// BladeCord

// class for card object
class card {
    
    // initialize a card
    constructor(bolted, cardType, value) {
        // true when hit by bolt
        this.bolted = bolted;
        // 0 = regCard, 1 = bolt, 2 = mirror, 3 = blast, 4 = force; this replaces name
        this.cardType = cardType;
        // returns true if the card is regular
        this.value = value;
    } // end constructor

    // returns true if card is regular
    isRegularCard() {
        return this.cardType == 0;
    } // end isRegularCard

} // end card

module.exports = card;