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

  squarenewvalue(copyvalues){
    // add new square
    
    // all squares are filled
    if(!copyvalues.includes(null)){
      return ;
    }
    // random index
    let index = Math.floor(Math.random() * Math.floor(16));
    
    // put value only if null
    while(copyvalues[index] != null){
      index = Math.floor(Math.random() * Math.floor(16));
    }
    copyvalues[index] = 2;
    return ;
  }
  
  rightSwipeSwapSquare(i, copyvalues){
    if(copyvalues[i] === null){
      return
    }
    if(copyvalues[i] === copyvalues[i-1]){
      // if adjacent square are same add both value and put to second square, nullify first
      copyvalues[i-1]+= copyvalues[i];
      copyvalues[i] = null;
      i--;
    }
  }
  leftSwipeSwapSquare(i, copyvalues){
    if(copyvalues[i] === null){
      return
    }
    if(copyvalues[i] === copyvalues[i+1]){
      // if adjacent square are same add both value and put to second square, nullify first
      copyvalues[i]+= copyvalues[i+1];
      copyvalues[i+1] = null;
      i++;
    }
  }
  squaresRightShift(i, k, copyvalues){
    for(i; i>k; i--){
      if(copyvalues[i] === null){
        for(let j = i-1; j>=k; j--){
          if(copyvalues[j] === null){
            continue;
          }
          copyvalues[i] = copyvalues[j];
          copyvalues[j] = null;
          break;
        }
      }
    }
  }
  squaresLeftShift(i, k, copyvalues){
    for(i; i<k; i++){
      if(copyvalues[i] === null){
        for(let j = i+1; j<=k; j++){
          if(copyvalues[j] === null){
            continue;
          }
          copyvalues[i] = copyvalues[j];
          copyvalues[j] = null;
          break;
        }
      }
    }
  }
  handleSwipe(direction){
    
    switch(direction){
      case "Right":
        // copy values
        let copyvaluesforright = this.state.values.slice();
        
        for (let i = 3; i>0; i--){
          this.rightSwipeSwapSquare(i, copyvaluesforright);
        }
        for (let i = 7; i>4; i--){
          this.rightSwipeSwapSquare(i, copyvaluesforright);
        }
        for (let i = 11; i>8; i--){
          this.rightSwipeSwapSquare(i, copyvaluesforright);
        }
        for (let i = 15; i>12; i--){
          this.rightSwipeSwapSquare(i, copyvaluesforright);
        }
        this.squaresRightShift(3,0, copyvaluesforright);
        this.squaresRightShift(7,4, copyvaluesforright);
        this.squaresRightShift(11,8, copyvaluesforright);
        this.squaresRightShift(15,12, copyvaluesforright);

        console.log(copyvaluesforright);

        this.squarenewvalue(copyvaluesforright);
        this.setState({
          values:copyvaluesforright
        });
        break;
      case "Up":
        // copy values
        let copyvaluesforup = this.state.values.slice();
        
        for (let i = 3; i>0; i--){
          this.rightSwipeSwapSquare(i, copyvaluesforup);
        }
        for (let i = 7; i>4; i--){
          this.rightSwipeSwapSquare(i, copyvaluesforup);
        }
        for (let i = 11; i>8; i--){
          this.rightSwipeSwapSquare(i, copyvaluesforup);
        }
        for (let i = 15; i>12; i--){
          this.rightSwipeSwapSquare(i, copyvaluesforup);
        }
        this.squaresRightShift(3,0, copyvaluesforup);
        this.squaresRightShift(7,4, copyvaluesforup);
        this.squaresRightShift(11,8, copyvaluesforup);
        this.squaresRightShift(15,12, copyvaluesforup);

        console.log(copyvaluesforup);

        this.squarenewvalue(copyvaluesforup);
        this.setState({
          values:copyvaluesforup
        });
        break;
      case "Left":
        // copy values
        let copyvaluesforleft = this.state.values.slice();
        
        for (let i = 0; i<3; i++){
          this.leftSwipeSwapSquare(i, copyvaluesforleft);
        }
        for (let i = 4; i<7; i++){
          this.leftSwipeSwapSquare(i, copyvaluesforleft);
        }
        for (let i = 8; i<11; i++){
          this.leftSwipeSwapSquare(i, copyvaluesforleft);
        }
        for (let i = 12; i<15; i++){
          this.leftSwipeSwapSquare(i, copyvaluesforleft);
        }
        this.squaresLeftShift(0,3, copyvaluesforleft);
        this.squaresLeftShift(4,7, copyvaluesforleft);
        this.squaresLeftShift(8,11, copyvaluesforleft);
        this.squaresLeftShift(12,15, copyvaluesforleft);

        console.log(copyvaluesforleft);

        this.squarenewvalue(copyvaluesforleft);
        this.setState({
          values:copyvaluesforleft
        });
        break;
      case "Down":
        // copy values
        let copyvaluesforDown = this.state.values.slice();
        
        for (let i = 3; i>0; i--){
          this.rightSwipeSwapSquare(i, copyvaluesforDown);
        }
        for (let i = 7; i>4; i--){
          this.rightSwipeSwapSquare(i, copyvaluesforDown);
        }
        for (let i = 11; i>8; i--){
          this.rightSwipeSwapSquare(i, copyvaluesforDown);
        }
        for (let i = 15; i>12; i--){
          this.rightSwipeSwapSquare(i, copyvaluesforDown);
        }
        this.squaresRightShift(3,0, copyvaluesforDown);
        this.squaresRightShift(7,4, copyvaluesforDown);
        this.squaresRightShift(11,8, copyvaluesforDown);
        this.squaresRightShift(15,12, copyvaluesforDown);

        console.log(copyvaluesforDown);

        this.squarenewvalue(copyvaluesforDown);
        this.setState({
          values:copyvaluesforDown
        });
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
