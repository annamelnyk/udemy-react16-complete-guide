import { useReducer } from 'react';

const initialInputState = {
  value: '',
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  switch(action.type) {
    case 'INPUT':
      return {
        value: action.value,
        isTouched: state.isTouched,
      };
    case 'BLUR':
      return { isTouched: true };
    case 'RESET':
      return initialInputState;
    
    default:  
      return initialInputState;
  }
};

const useInput = (validationFn) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);

  const enteredInputValueIsValid = validationFn(inputState.value);
  const enteredInputValueIsInvalid = !enteredInputValueIsValid && inputState.isTouched;

  const inputValueChangeHandler = (e) => {
    dispatch({
      type: 'INPUT',
      value: e.target.value,
    })
  }

  const inputValueBlurHandler = () => {
    dispatch({type: 'BLUR'})
  }

  const resetInputValues = () => {
    dispatch({type: 'RESET'})
  }

  return {
    enteredInputValue: inputState.value,
    enteredInputValueIsValid,
    enteredInputValueIsInvalid,
    inputValueBlurHandler,
    inputValueChangeHandler,
    resetInputValues,
  }
}

export default useInput;