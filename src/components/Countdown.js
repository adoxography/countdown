import React from 'react';
import MaterialIcon from 'material-icons-react';
import Clock from './Clock';
import { scaleToWindow, units } from '../util';
import './Countdown.css';

/**
 * A self-contained timer. Allows time to be set and counts off time when it's
 * started.
 */
class Countdown extends React.Component {
  constructor(props) {
    super(props);

    this.el = React.createRef(null);
    this.startEl = React.createRef(null);

    this.state = {
      time: 0,
      running: false,
      interval: null
    };
  }

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    this.stop();
  }

  /**
   * Resizes the component to fit the screen
   */
  resize = () => {
    if (this.el.current) {
      scaleToWindow(this.el.current, 1, true);
    }
  }

  /**
   * Resizes the component to fit the screen
   */
  resize = () => {
    if (this.el.current) {
      scaleToWindow(this.el.current, 1, true);
    }
  }

  /**
   * Responds to the wheel being scrolled
   *
   * @param e       The event that was fired
   * @param amount  The amount, in seconds, to adjust the time by
   */
  handleWheel = (e, { amount }) => {
    if (e.deltaY < 0) {  // Scrolling down
      this.decrement(amount);
    } else if (e.deltaY > 0) {  // Scrolling up
      this.increment(amount)
    }
  }

  /**
   * Responds to a key being pressed
   *
   * The space bar starts the timer. Up and down arrow keys add and remove
   * time, respectively.
   * 
   * @param e       The even that was fired
   * @param amount  The amount, in seconds, to adjust the time by
   */
  handleKeyDown = (e, { amount }) => {
    switch (e.keyCode) {
      case 32:  // space bar
        this.start();
        break;
      case 38:  // up arrow
      case 75:  // k key
        this.increment(amount);
        break;
      case 40:  // down arrow
      case 74:  // j key
        this.decrement(amount);
        break;
      default:
        break;
    }
  }

  /**
   * Responds to the value of a number being changed
   */
  handleChange = (e, { delta, amount }) => {
    this.addTime(delta * amount);
  }

  /**
   * Responds to the value of a number being changed
   */
  handleChange = (e, { delta, amount }) => {
    this.addTime(delta * amount);
  }

  /**
   * Starts the timer
   *
   * The timer will run until it gets to 0.
   */
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

  /**
   * Stops the timer
   */
  stop = () => {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.setState(() => ({ running: false }));
  }

  /**
   * Brings the timer back to 0
   */
  reset = () => {
    this.setState(() => ({ time: 0, running: false }));
  }

  /**
   * Adds `amount` to the time
   */
  increment = (amount = units.SECOND) => {
    this.addTime(amount);
  }

  /**
   * Subtracts `amount` from the time
   */
  decrement = (amount = units.SECOND) => {
    this.addTime(-amount);
  }

  /**
   * Adds time to `time`, ensuring that if it wraps around after `units.DAY` seconds
   */
  addTime = amount => {
    this.setState(state => {
      let time = state.time + amount;

      // wrap around if it's too high or low
      time = (time + units.DAY) % units.DAY;

      return { time };
    });
  }

  handleBlurOut = () => {
    this.startEl.current.focus();
  }

  render() {
    const { time, running } = this.state;

    return (
      <div className="countdown" ref={this.el}>
        <Clock
          time={time}
          disabled={running}
          onWheel={this.handleWheel}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
          onBlurOut={this.handleBlurOut}
        />

        <input aria-label="remaining seconds" type="hidden" value={time} />

        <div className="control-buttons">
          <button
            aria-label="start"
            ref={this.startEl}
            disabled={time === 0}
            className={`button ${running ? 'is-red' : 'is-green'}`}
            onClick={running ? this.stop : this.start}
          >
            <MaterialIcon key={`button-${running ? 'red' : 'green'}`} icon={running ? 'stop' : 'play_arrow'} />
          </button>
          <button
            disabled={running || time === 0}
            className="button is-red"
            onClick={this.reset}
          >
            <MaterialIcon icon="refresh" />
          </button>
        </div>
      </div>
    );
  }
}

export default Countdown;
