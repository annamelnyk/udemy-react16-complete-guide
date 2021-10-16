import React, { useState } from "react";

import ExpenseDate from './ExpenseDate/ExpenseDate';
import Card from '../Card/Card';

import './ExpenseItem.css';

function ExpenseItem({ expenseDate, expenseTitle, expenseAmount }) {
  const [title, setTitle] = useState(expenseTitle);
  const clickHandler = () => setTitle('Updated');
  
  return (
    <Card className="expense-item">
      <ExpenseDate date={expenseDate}/>
      <div className="expense-item__description">
        <h2>{title}</h2>
        <div className="expense-item__price">${expenseAmount}</div>
      </div>
      <button onClick={clickHandler}>Change title</button>
    </Card>
  );
}

export default ExpenseItem;
