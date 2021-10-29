import React, { useRef, useState } from "react";

import Input from "../../UI/Input";
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const amountInputRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredAmount = Number(amountInputRef.current.value);
    console.log('enteredAmount ', enteredAmount);

    if (enteredAmount === 0 || enteredAmount < 0 || enteredAmount > 5) {
      setAmountIsValid(false);
      return;
    }

    
    props.onAddToCart(enteredAmount);
    setAmountIsValid(true);

    return enteredAmount;
  }

  return (
    <form
      onSubmit={submitHandler}
      className={classes.form}
    >
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: 'amount',
          type: "number",
          step: '1',
          defaultValue: '1'
        }}
      />
      <button
        type="submit"
        disabled={!amountIsValid}
      >
        + Add
      </button>
      {!amountIsValid && 
        <p>Please enter a valid amount(1-5)</p>
      }
    </form>
  )
}

export default MealItemForm;