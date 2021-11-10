const redux = require('redux');

const couterReducer = (state = { counter: 0 }, action) => {
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1
    }
  }

  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1
    }
  }

  return state;
};

const store = redux.createStore(couterReducer);

console.log('store.getState();', store.getState());

const counterSubscriber = () => {
  const latestState = store.getState();
  console.log('latestState', latestState); 
};

store.subscribe(counterSubscriber);

store.dispatch({ type: 'increment'});
store.dispatch({ type: 'decrement'});