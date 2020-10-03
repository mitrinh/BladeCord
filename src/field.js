// Michael Trinh
// BladeCord

// class for field object
class field {

  // initialize empty field for a player
  constructor() {
    this.contents = [];
    this.value = 0;
  } // end constructor

  // add card to field and add its value
  startAdd(card) {
    this.contents.push(card);
    this.value += card.value;
  } // end add

  // check if field is empty
  empty() {
    return (this.contents === undefined || this.contents.length === 0)
  } // end empty

  // clears all cards from the field
  clear() {
    while (!this.empty()) {
      this.contents.pop();
    }
    this.value = 0;
  } // end clear

  // print the field
  print() {
    var output;
    if (!this.empty()) {
      output = this.contents[0].cardType;
      const length = this.contents.length;
      for (var i = 1; i < length; i++) {
        output += ', ' + this.contents[i].cardType;
      }
      output += ', value: ' + this.value;
    } else {
      output = "empty, value: " + this.value;
    }
    console.log("\t field: " + output);
    return output;
  } // end print
} // end field

module.exports = field;