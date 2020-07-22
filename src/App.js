import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useSwipeable} from 'react-swipeable';


function Square(props){
  const colors = {
    2:"#bada55",
    4:"#ffa500",
    8:"#aaa3a7",
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
      history: [{
        values: Array(16).fill(null)
      }],
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

  upSwipeSwapSquare(i, copyvalues){
    if(copyvalues[i] === null){
      return
    }
    if(copyvalues[i] === copyvalues[i+4]){
      // if adjacent square are same add both value and put to second square, nullify first
      copyvalues[i]+= copyvalues[i+4];
      copyvalues[i+4] = null;
      i+=4;
    }
  }
  downSwipeSwapSquare(i, copyvalues){
    if(copyvalues[i] === null){
      return
    }
    if(copyvalues[i] === copyvalues[i-4]){
      // if adjacent square are same add both value and put to second square, nullify first
      copyvalues[i]+= copyvalues[i-4];
      copyvalues[i-4] = null;
      i-=4;
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
  
  squaresUpShift(i, k, copyvalues){
    for(i; i<k; i+=4){
      if(copyvalues[i] === null){
        for(let j = i+4; j<=k; j+=4){
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
  
  squaresDownShift(i, k, copyvalues){
    for(i; i>k; i-=4){
      if(copyvalues[i] === null){
        for(let j = i-4; j>=k; j-=4){
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
    
    
    const history = this.state.history;
    

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

        
        this.squarenewvalue(copyvaluesforright);
        this.setState({
          values:copyvaluesforright,
          history: history.concat([{
            values: copyvaluesforright
          }]),
        });
        break;
      case "Up":
        // copy values
        let copyvaluesforup = this.state.values.slice();
        
        for (let i = 0; i<12; i+=4){
          this.upSwipeSwapSquare(i, copyvaluesforup);
        }
        for (let i = 1; i<13; i+=4){
          this.upSwipeSwapSquare(i, copyvaluesforup);
        }
        for (let i = 2; i<14; i+=4){
          this.upSwipeSwapSquare(i, copyvaluesforup);
        }
        for (let i = 3; i<15; i+=4){
          this.upSwipeSwapSquare(i, copyvaluesforup);
        }
        this.squaresUpShift(0,12, copyvaluesforup);
        this.squaresUpShift(1,13, copyvaluesforup);
        this.squaresUpShift(2,14, copyvaluesforup);
        this.squaresUpShift(3,15, copyvaluesforup);

        this.squarenewvalue(copyvaluesforup);
        this.setState({
          values:copyvaluesforup,  
          history: history.concat([{
            values: copyvaluesforup
          }]),
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

        this.squarenewvalue(copyvaluesforleft);
        this.setState({
          values:copyvaluesforleft,  
          history: history.concat([{
            values: copyvaluesforleft
          }]),
        });
        break;
      case "Down":
        // copy values
        let copyvaluesforDown = this.state.values.slice();
        
        for (let i = 12; i>0; i--){
          this.downSwipeSwapSquare(i, copyvaluesforDown);
        }
        for (let i = 13; i>1; i--){
          this.downSwipeSwapSquare(i, copyvaluesforDown);
        }
        for (let i = 14; i>2; i--){
          this.downSwipeSwapSquare(i, copyvaluesforDown);
        }
        for (let i = 15; i>3; i--){
          this.downSwipeSwapSquare(i, copyvaluesforDown);
        }
        this.squaresDownShift(12,0, copyvaluesforDown);
        this.squaresDownShift(13,1, copyvaluesforDown);
        this.squaresDownShift(14,2, copyvaluesforDown);
        this.squaresDownShift(15,3, copyvaluesforDown);

        this.squarenewvalue(copyvaluesforDown);
        this.setState({
          values:copyvaluesforDown,  
          history: history.concat([{
            values: copyvaluesforDown
          }]),
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
  has2048(){
    if(this.state.values.includes(2048)){
      return true;
    }
    return false;
  }
  hasMoves(){
    if(this.state.values.includes(null)){
      return true;
    }
    return false;
  }
  
  goTo(move){
    
    this.setState({
      values: this.state.history[move].values
    });
  }
  render(){
    
    let status;
    let totalnumberofsteps
    if(!this.hasMoves()){
      status = "No empty Square";
    }

    if (this.has2048()) {
      status = '2048 Won';
    } 
    const moves = this.state.history.map((step, move) => {
      totalnumberofsteps = move;
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <small onClick={() => this.goTo(move)}>{desc}</small>
        </li>
      );
    });
    return <div className="board">
              <table className="table disable-select">
                <tbody>
                  <tr className="board-row">
                    <td>{this.renderSquare(0)}</td>
                    <td>{this.renderSquare(1)}</td>
                    <td>{this.renderSquare(2)}</td>
                    <td>{this.renderSquare(3)}</td>
                  </tr>
                  <tr className="board-row">
                    <td>{this.renderSquare(4)}</td>
                    <td>{this.renderSquare(5)}</td>
                    <td>{this.renderSquare(6)}</td>
                    <td>{this.renderSquare(7)}</td>
                  </tr>
                  <tr className="board-row">
                    <td>{this.renderSquare(8)}</td>
                    <td>{this.renderSquare(9)}</td>
                    <td>{this.renderSquare(10)}</td>
                    <td>{this.renderSquare(11)}</td>
                  </tr>
                  <tr className="board-row">
                    <td>{this.renderSquare(12)}</td>
                    <td>{this.renderSquare(13)}</td>
                    <td>{this.renderSquare(14)}</td>
                    <td>{this.renderSquare(15)}</td>
                  </tr>
                </tbody>
              </table>
              <div className="status">
                <button onClick={()=>{this.setState({
                                            values : Array(16).fill(null),
                                            history: [{
                                              values: Array(16).fill(null)
                                            }],
                                          } )}}
                      >Reset</button>
                      <p>Total Steps: {totalnumberofsteps}</p>
                <p>{status}</p>
                <ol>{moves}</ol>
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
