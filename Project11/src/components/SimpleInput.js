import { useRef } from "react";

import useInput from "../hooks/use-input";

const checkEnteredNameIsValid = (inputValue) => inputValue.trim() !== '';
  const checkEnteredEmailIsValid = (inputValue) => inputValue.trim() !== '' && inputValue.includes('@');

const SimpleInput = () => {
  const nameInputRef = useRef();

  const {
    enteredInputValueIsValid: enteredNameIsValid,
    enteredInputValueIsInvalid: enteredNameIsInvalid,
    valueInputClasses: nameInputClasses,
    inputValueBlurHandler: nameInputBlurHandler,
    inputValueChangeHandler: nameInputChangeHandler,
    resetInputValues: resetNameInputValues,
  } = useInput(checkEnteredNameIsValid);

  const {
    enteredInputValueIsValid: enteredEmailIsValid,
    enteredInputValueIsInvalid: enteredEmailIsInvalid,
    valueInputClasses: emailInputClasses,
    inputValueBlurHandler: emailInputBlurHandler,
    inputValueChangeHandler: emailInputChangeHandler,
    resetInputValues: resetEmailInputValues,
  } = useInput(checkEnteredEmailIsValid);

  const formSubmittionHandler = (e) => {
    e.preventDefault();

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    // console.log('enteredName ', enteredName);
    // const enteredValue = nameInputRef.current.value;

    resetNameInputValues();
    resetEmailInputValues();
  }

  return (
    <form onSubmit={formSubmittionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          ref={nameInputRef}
          type='text'
          id='name'
          onChange={nameInputChangeHandler}
          onFocus={nameInputBlurHandler}
        />
        {enteredNameIsInvalid && <p className="error-text">Name must not be empty!</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='email'>Your Email</label>
        <input
          type='text'
          id='email'
          onChange={emailInputChangeHandler}
          onFocus={emailInputBlurHandler}
        />
        {enteredEmailIsInvalid && <p className="error-text">Email must not be empty!</p>}
      </div>
      <div className="form-actions">
        <button
          type="submit"
          disabled={enteredNameIsInvalid || enteredEmailIsInvalid}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default SimpleInput;
