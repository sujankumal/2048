import React from 'react';
import logo from './logo.svg';
import './App.css';

class Square extends React.Component {
  render() {
    // You can use them as regular CSS styles
    return  <button className="square">
              {this.props.value}
            </button>;
  }
}

class Board extends React.Component {
  constructor(props){
    super(props);
    let datas = Array(16).fill(null);
    datas[this.props.i] = 2;
    this.state = {
      values : datas,
    }
    console.log("value: ", datas);
    
    
  }

  renderSquare(i) {
   return <Square value={this.state.values[i]}/>;
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
