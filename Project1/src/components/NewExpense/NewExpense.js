import React, { useState } from "react";

import ExpenseForm from './ExpenseForm/ExpenseForm';

import './NewExpense.css';

const NewExpense = ({ onAddNewExpenseData }) => {
  const [isStartEditing, setStartEditing] = useState(false);

  const startEditingHandler = () => {
    setStartEditing(true);
  }

  const stopEditingHandler = () => {
    setStartEditing(false);
  }

  const saveExpensedData = (data) => {
    onAddNewExpenseData(data);
    stopEditingHandler();
  }

  return (
    <div className="new-expense">
      {isStartEditing 
        ? <ExpenseForm
            onSaveExpensedData={saveExpensedData}
            onCancelFormShowing={stopEditingHandler}
          /> 
        : <button onClick={startEditingHandler}>Add New Expense</button>
      }
    </div>
  )
}

export default NewExpense;