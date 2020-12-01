import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Light(props) {
  return (
    <button className={"light " + props.value} onClick={props.onClick}>
    </button>
  );
}

class Board extends React.Component {
  renderLight(i) {
    return (
      <Light
        value={this.props.lights[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {

    return (
      <div>
        <div className="board-row">
          {this.renderLight(0)}
          {this.renderLight(1)}
          {this.renderLight(2)}
          {this.renderLight(3)}
          {this.renderLight(4)}
        </div>
        <div className="board-row">
          {this.renderLight(5)}
          {this.renderLight(6)}
          {this.renderLight(7)}
          {this.renderLight(8)}
          {this.renderLight(9)}
        </div>
        <div className="board-row">
          {this.renderLight(10)}
          {this.renderLight(11)}
          {this.renderLight(12)}
          {this.renderLight(13)}
          {this.renderLight(14)}
        </div>
        <div className="board-row">
          {this.renderLight(15)}
          {this.renderLight(16)}
          {this.renderLight(17)}
          {this.renderLight(18)}
          {this.renderLight(19)}
        </div>
        <div className="board-row">
          {this.renderLight(20)}
          {this.renderLight(21)}
          {this.renderLight(22)}
          {this.renderLight(23)}
          {this.renderLight(24)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          lights: Array(25).fill("on")
        }
      ],
      stepNumber: 0,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const lights = current.lights.slice();
    const offsets = [-5, -1, 0, 1, 5];
    offsets.forEach((offset) => {
      let j = i + offset;
      let oob = j < 0 || j > 24;
      let different_row = Math.floor(i/5) !== Math.floor(j/5)

      if (oob || (Math.abs(offset) === 1 && different_row)) {
        return;
      }
      lights[j] = lights[j] === "off" ? "on" : "off";      
    })
    this.setState({
      history: history.concat([
        {
          lights: lights
        }
      ]),
      stepNumber: history.length,
    });
  }

  undo() {
    if (this.state.stepNumber < 1) return;
    const history = this.state.history.slice(0, this.state.stepNumber);
    this.setState({
      history: history,
      stepNumber: this.state.stepNumber - 1
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    let lightsRemaining = current.lights.reduce((accum, value) => {
      return accum + (value == "on" ? 1 : 0);
    }, 0);
    let status = lightsRemaining.toString() + " ON lights remaining";

    return (
      <div className="game">
        <div className="game-board">
          <Board
            lights={current.lights}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>Move {this.state.stepNumber + 1}</div>
          <div><button onClick={() => this.undo()}>Undo</button>
          </div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));



