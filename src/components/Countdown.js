import React from 'react';
import Clock from './Clock';
import './Countdown.css';

const unitAmounts = {
  'second': 1,
  'minute': 60,
  'hour': 3600
};

class Countdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 0,
      running: false,
      interval: null
    };
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  handleWheel = (e, unit) => {
    if (e.deltaY < 0) {  // Scrolling up
      this.increment(unit)
    } else if (e.deltaY > 0) {  // Scrolling down
      this.decrement(unit);
    }
  }

  handleKeyDown = (e, unit) => {
    switch (e.keyCode) {
      case 32:  // space bar
        this.start();
        break;
      case 38:  // up arrow
        this.increment(unit);
        break;
      case 40:  // down arrow
        this.decrement(unit);
        break;
      default:
        break;
    }
  }

  start = () => {
    this.interval = setInterval(() => {
      if (this.state.time > 0) {
        this.decrement();
      }
      if (this.state.time <= 0) {
        this.stop();
      }
    }, 1000);

    this.setState(() => ({ running: true }));
  }

  stop = () => {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.setState(() => ({ running: false }));
  }

  reset = () => {
    this.setState(() => ({ time: 0, running: false }));
  }

  increment = (unit = 'second') => {
    this.updateTime(unitAmounts[unit]);
  }

  decrement = (unit = 'second') => {
    this.updateTime(-unitAmounts[unit]);
  }

  updateTime = amount => {
    this.setState(state => ({ time: (state.time + amount + 86400) % 86400}));
  }

  render() {
    const { time, running } = this.state;

    return (
      <div className="countdown">
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
            onClick={this.reset}
          >
            Reset
          </button>
          <button
            disabled={time === 0}
            className={`button ${running ? 'is-red' : 'is-green'}`}
            onClick={running ? this.stop : this.start}
          >
            {running ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>
    );
  }
}

export default Countdown;
