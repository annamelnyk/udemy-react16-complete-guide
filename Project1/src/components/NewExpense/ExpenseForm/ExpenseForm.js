import React, { useState } from "react";

import './ExpenseForm.css';

const EMPTY_VALUE = '';

const ExpenseForm = ({ onSaveExpensedData, onCancelFormShowing }) => {
  const [title, setTitle] = useState(EMPTY_VALUE);
  const [amount, setAmount] = useState(EMPTY_VALUE);
  const [date, setDate] = useState(EMPTY_VALUE);

  const onChangeTitleHandler = (e) => {
    setTitle(e.target.value);
  }

  const onChangeAmountHandler = (e) => {
    setAmount(e.target.value);
  }

  const onChangeDateHandler = (e) => {
    setDate(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();

    const expenseDate = {
      expenseTitle: title,
      expenseAmount: amount,
      expenseDate: new Date(date),
    };

    console.log('expenseDate ', expenseDate);

    setTitle(EMPTY_VALUE);
    setAmount(EMPTY_VALUE);
    setDate(EMPTY_VALUE);

    return onSaveExpensedData(expenseDate);
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={onChangeTitleHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            min="0.01"
            step="0.01"
            onChange={onChangeAmountHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            value={date}
            min="2019-01-01" 
            max="2022-12-31" 
            onChange={onChangeDateHandler} 
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button
          type="button"
          onClick={onCancelFormShowing}
        >
          Cancel
        </button>
        <button type="submit">Add Expense</button>
      </div>
    </form>
  )
}

export default ExpenseForm;
