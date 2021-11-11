import { createStore, combineReducers } from 'redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {
  counter: 0,
  showCounter: true,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.amount;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  }
});

const counterActions = counterSlice.actions;

const reducerFn = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state, 
        counter: state.counter + 1
      }
    case 'DECREMENT':
      return {
        ...state, 
        counter: state.counter - 1
      }
    case 'INCREASE':
      return {
        ...state, 
        counter: state.counter + action.amount
      }

    case 'TOGGLE':
      return {
        ...state, 
        showCounter: !state.showCounter
      }  

    default:
      return state;  
  }
};

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
});
// const store = createStore(reducerFn);

export default store;

// const counterSubscriber = () => store.getState();

// store.subscribe(counterSubscriber);
// store.dipatch();
