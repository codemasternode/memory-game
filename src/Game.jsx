import React from "react";
import "./Game.css";
import Board from "./Board.jsx";
import shuffle from "shuffle-array";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.onCardClicked = this.onCardClicked.bind(this);
    this.lvlCreate = this.lvlCreate.bind(this);
    this.cards = [];
  }

  componentWillMount() {
    this.lvlCreate(6);
  }

  createCardSet(level) {
    this.cards = [];
    let id = 1;
    this.level = level;
    for (let i = 1; i <= level; i++) {
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
    for (let i = 0; i < 2 * this.level; i++) {
      if (this.cards[i].id === id) {
        return this.cards[i];
      }
    }
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

  // Set view of the game board
  getCardViews() {
    let cardViews = [];
    let onClick = this.onCardClicked;
    this.cards.forEach(c => {
      let cardView = (
        <Board
          key={c.id}
          id={c.id}
          image={c.image}
          imageUp={c.imageUp}
          matched={c.matched}
          onClick={onClick}
        />
      );
      cardViews.push(cardView);
    });
    return cardViews;
  }

  // No pair found within a turn
  clearCards(id1, id2) {
    if (this.state.clicksInATurn !== 2) {
      return;
    }
    this.flipCard(this.state.firstId, false);
    this.flipCard(this.state.secondId, false);
    this.setState({
      firstId: undefined,
      secondId: undefined,
      clicksInATurn: 0,
      turnsCounter: this.state.turnsCounter + 1
    });
  }

  // Set game logic if a card was clicked
  onCardClicked(id, image) {
    if (this.state.clicksInATurn === 0 || this.state.clicksInATurn === 2) {
      if (this.state.clicksInATurn === 2) {
        clearTimeout(this.timeout);
        this.clearCards(this.state.firstId, this.state.secondId);
      }
      this.flipCard(id, true);
      this.setState({
        firstId: id,
        clicksInATurn: 1
      });
    } else if (this.state.clicksInATurn === 1) {
      this.flipCard(id, true);
      this.setState({
        secondId: id,
        clicksInATurn: 2
      });

      if (this.theSameCards(id, this.state.firstId)) {
        this.setCardAsMatched(this.state.firstId, true);
        this.setCardAsMatched(id, true);
        this.setState({
          pairsCounter: this.state.pairsCounter + 1,
          firstId: undefined,
          secondId: undefined,
          turnsCounter: this.state.turnsCounter + 1,
          clicksInATurn: 0
        });
      } else {
        this.timeout = setTimeout(() => {
          this.clearCards(this.state.firstId, this.state.secondId);
        }, 2000);
      }
    }
  }

  lvlCreate(level) {
    this.createCardSet(level);
    this.setState({
      turnsCounter: 1,
      pairsCounter: 0,
      clicksInATurn: 0,
      firstId: undefined,
      secondId: undefined
    });
  }

  // Show game score
  render() {
    let gameBoard = this.getCardViews();
    let gameStatus = (
      <div className="Game-status">
        <div>Turns: {this.state.turnsCounter}</div>
        <div>Pairs found: {this.state.pairsCounter}</div>
      </div>
    );

    return (
      <div className="Game-board">
        <header className="Game-header">
          <div className="Game-title">
            Find all pairs of cards to win the game!
          </div>
        </header>
        <div>{gameStatus}</div>
        <div className="Lvl-button">
          <button id="easy" onClick={() => this.lvlCreate(6)}>
            Easy
          </button>
          <button id="medium" onClick={() => this.lvlCreate(8)}>
            Medium
          </button>
          <button id="hard" onClick={() => this.lvlCreate(10)}>
            Hard
          </button>
        </div>
        <div className="Card-container">{gameBoard}</div>
      </div>
    );
  }
}

export default Game;
