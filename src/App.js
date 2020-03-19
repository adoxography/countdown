import React from 'react';
import './App.css';
import Clock from './components/Clock';

const { remote } = require('electron');

const close = () => remote.getCurrentWindow().close();

const unitAmounts = {
  'second': 1,
  'minute': 60,
  'hour': 3600
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 0,
      running: false,
      interval: null
    };
  }

  startTimer = () => {
    this.interval = setInterval(() => {
      if (this.state.time > 0) {
        this.decrement();
        if (this.state.time <= 0) {
          this.stopTimer();
        }
      }
    }, 1000);
    this.setState(() => ({ running: true }));
  }

  stopTimer = () => {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.setState(() => ({ running: false }));
  }

  handleWheel = (e, unit) => {
    if (e.deltaY < 0) {
      // Scrolling up
      this.increment(unit);
    } else if (e.deltaY > 0) {
      // Scrolling down
      this.decrement(unit);
    }
  }

  handleKeyDown = (e, unit) => {
    if (e.keyCode === 38) {
      // up arrow
      this.increment(unit);
    } else if (e.keyCode === 40) {
      // down arrow
      this.decrement(unit);
    } else if (e.keyCode === 32) {
      // space
      this.startTimer();
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  updateTime = amount => {
    this.setState(state => ({ time: (state.time + amount + 86400) % 86400 }));
  }

  increment = unit => {
    const amount = unitAmounts[unit] || 1;
    this.updateTime(amount);
  }

  decrement = unit => {
    const amount = unitAmounts[unit] || 1;
    this.updateTime(-amount);
  }

  resetTimer = () => {
    this.setState(() => ({ time: 0 }));
  }

  render() {
    const { time, running } = this.state;

    return (
      <div className="App">
        <button className="button close-button" onClick={close}>X</button>

        <Clock
          time={time}
          disabled={running}
          onWheel={this.handleWheel}
          onKeyDown={this.handleKeyDown}
        />

        <div className="control-buttons">
          <button
            disabled={running || time === 0}
            className="button is-red"
            onClick={this.resetTimer}
          >
            Reset
          </button>

          <button
            disabled={time === 0}
            className={`button ${running ? 'is-red' : 'is-green'}`}
            onClick={running ? this.stopTimer : this.startTimer}
          >
            {running ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>
    );
  }
}

export default App;
