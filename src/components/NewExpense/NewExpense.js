import React from "react";

import ExpenseForm from './ExpenseForm/ExpenseForm';
import './NewExpense.css';

const NewExpense = ({ onAddNewExpenseData }) => {
  return (
    <div className="new-expense">
       <ExpenseForm onSaveExpensedData={onAddNewExpenseData} /> 
    </div>
  )
}

export default NewExpense;