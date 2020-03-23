import React from 'react';
import MaterialIcon from 'material-icons-react';
import './App.css';
import Countdown from './components/Countdown';

const { remote } = require('electron');

const close = () => remote.getCurrentWindow().close();

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <button className="button close-button" onClick={close}>
          <MaterialIcon icon="close" />
        </button>

        <Countdown />
      </div>
    );
  }
}

export default App;
