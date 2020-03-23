import React from 'react';
import MaterialIcon from 'material-icons-react';
import './App.css';
import Countdown from './components/Countdown';
import ColourSelect from './components/ColourSelect';
import { useGlobalState, GlobalStateProvider } from './hooks/useGlobalState';

const { remote } = require('electron');

const close = () => remote.getCurrentWindow().close();

const App = () => {
  const { colour, setColour } = useGlobalState();

  return (
    <div className="App">
      <button className="button close-button" onClick={close}>
        <MaterialIcon icon="close" />
      </button>

      <ColourSelect colour={colour} onChange={e => setColour(e.target.value)} />

      <Countdown />
    </div>
  );
};

const _App = () => {
  return (
    <GlobalStateProvider>
      <App />
    </GlobalStateProvider>
  );
};

export default _App;
