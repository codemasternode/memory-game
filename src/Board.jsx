import React from 'react';
import './Game.css';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (!this.props.matched && !this.props.imageUp) {
      this.props.onClick(this.props.id, this.props.image);      
    }
  }

  // Set path to images if they are up
  render() {
    let imagePath = './images/';
    if (this.props.imageUp) {
      imagePath = imagePath + this.props.image + '.png';
    } else {
      imagePath = imagePath + 'back.png';
    }

    let className='Card';
    if (this.props.matched) {
      className = className + ' Matched';
    }

    return (
        <img className={className} src={require(`${imagePath}`)} alt='' onClick={this.onClick}/>
    );      
  };
};

export default Board;
