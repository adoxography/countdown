import React, { createContext, useReducer, useContext } from 'react';

/* Action types */
const SET_COLOUR = 'SET_COLOUR';

const GlobalStateContext = createContext();

const initialState = {
  colour: '#4FD1C5'
};

const globalStateReducer = (state, action) => {
  switch (action.type) {
    case SET_COLOUR:
      return {
        ...state,
        colour: action.payload
      };
    default:
      return state;
  }
};

export const GlobalStateProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(globalStateReducer, initialState);

  return (
    <GlobalStateContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const [ state, dispatch ] = useContext(GlobalStateContext);

  const setColour = colour => {
    console.log(colour);
    dispatch({
      type: SET_COLOUR,
      payload: colour
    });
  };

  return {
    setColour,
    colour: state.colour
  };
};
