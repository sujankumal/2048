import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useSwipeable} from 'react-swipeable';


function Square(props){
  const colors = {
    2:"#bada55",
    4:"#ffa500",
    8:"#133337",
    16:"#065535",
    32:"#c0c0c0",
    64:"#5ac18e",
    128:"#666666",
    256:"#cbcba9",
    512:"#407294",
    1024:"#ff80ed",
    2048:"#ff0000",
    4096:"#ff7373",
    8192:"#003366",
    16384:"#800000"
  }

  let buttonStyle = {
    backgroundColor: colors[props.value]
  }

  const config =  {
    delta: 10,                             // min distance(px) before a swipe starts
    preventDefaultTouchmoveEvent: true,   // preventDefault on touchmove, *See Details*
    trackTouch: true,                      // track touch input
    trackMouse: true,                     // track mouse input
    rotationAngle: 0,                      // set a rotation angle
  }
  
  const handlers = useSwipeable({ onSwiped: (eventData) => props.handleSwipe(eventData.dir), ...config })  
  return  <button 
              className="square"
              style={buttonStyle}
              {...handlers}
            >
            {props.value}
          </button>;
}

class Board extends React.Component {
  constructor(props){
    super(props);
    let datas = Array(16).fill(null);
    datas[this.props.i] = 2;
    this.state = {
      values : datas,
    } 
  }

  handleSwipe(direction){
    
    switch(direction){
      case "Right":
        
        break;
      case "Up":
        
        break;
      case "Left":
        
        break;
      case "Down":
        
        break;
      default:

    }
  }

  renderSquare(i) {
   return <Square 
            value={this.state.values[i]}
            handleSwipe={(direction)=>this.handleSwipe(direction)}
          />;
  }
  render(){

    return <div className="board">
              <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
                {this.renderSquare(3)}
              </div>
              <div className="board-row">
                {this.renderSquare(4)}
                {this.renderSquare(5)}
                {this.renderSquare(6)}
                {this.renderSquare(7)}
              </div>
              <div className="board-row">
                {this.renderSquare(8)}
                {this.renderSquare(9)}
                {this.renderSquare(10)}
                {this.renderSquare(11)}
              </div>
              <div className="board-row">
                {this.renderSquare(12)}
                {this.renderSquare(13)}
                {this.renderSquare(14)}
                {this.renderSquare(15)}
              </div>
            </div>;
  }
}

function App() {
  const i = Math.floor(Math.random() * Math.floor(16));
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <Board i={i}/>
      </header>
    </div>
  );
}

export default App;
