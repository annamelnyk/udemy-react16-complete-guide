import { useState } from 'react';

const useInput = (validationFn) => {
  const [enteredInputValue, setEnteredInputValue] = useState('');
  const [enteredInputValueIsTouched, setEnteredInputValueIsTouched] = useState(false);

  const enteredInputValueIsValid = validationFn(enteredInputValue);
  const enteredInputValueIsInvalid = !enteredInputValueIsValid && enteredInputValueIsTouched;

  const inputValueChangeHandler = (e) => {
    setEnteredInputValue(e.target.value);
  }

  const inputValueBlurHandler = () => {
    setEnteredInputValueIsTouched(true);
  }

  const resetInputValues = () => {
    setEnteredInputValue('');
    setEnteredInputValueIsTouched(false); 
  }

  const valueInputClasses = !enteredInputValueIsValid || !enteredInputValueIsTouched ? "form-control" : "form-control invalid"

  return {
    enteredInputValue,
    enteredInputValueIsValid,
    enteredInputValueIsInvalid,
    valueInputClasses,
    inputValueBlurHandler,
    inputValueChangeHandler,
    resetInputValues,
  }
}

export default useInput;