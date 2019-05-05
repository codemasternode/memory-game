import shuffle from 'shuffle-array';


class Cards {
  constructor() {
    this.cards = [];
  }

  createCardSet(level) {
    this.cards = [];
    let id = 1;
    this.level = level
    for(let i = 1; i <= level; i++) {
      let card1 = {
        id: id,
        image: i,
        imageUp: false,
        matched: false
      };
      id++;
      let card2 = {
        id: id,
        image: i,
        imageUp: false,
        matched: false
      };
      this.cards.push(card1);
      this.cards.push(card2);
      id++;
    }

    shuffle(this.cards);  
  }

  getCard(id) {
    for(let i = 0; i < 2 * this.level; i++) {
      if (this.cards[i].id === id) {
        return this.cards[i];
      }
    };
  }

  flipCard(id, imageUp) {
    this.getCard(id).imageUp = imageUp;
  }

  setCardAsMatched(id, matched) {
    this.getCard(id).matched = matched;
  }

  theSameCards(id1, id2) {
    if (this.getCard(id1).image === this.getCard(id2).image) {
      return true;
    } else {
      return false;
    }
  }

};

export default Cards;
