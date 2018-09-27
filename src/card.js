// Michael Trinh
// BladeCord

/* a card object; requires being set, else default */
function card(bolted, cardType, value) {
    // true when hit by bolt
    this.bolted = bolted;
    // 0 = regCard, 1 = bolt, 2 = mirror, 3 = blast, 4 = force; this replaces name
    this.cardType = cardType;
    // regCard: 1-7, 1 for rest
    this.value = value;
    // returns true if the card is regular
    this.isRegularCard = function() {
        return this.cardType == 0;
    }
} // end card constructor

module.exports = card;