import React, { useState } from "react";

import ExpensesFilter from "../ExpensesFilter/ExpensesFilter";
import ExpensesList from "../ExpensesList/ExpensesList";
import ExpensesChart from "../Chart/ExpensesChart";

import './Expenses.css'

function ExpenseItemsList({ list }) {
 const [filteredYear, setFilteredYear] = useState('2021'); 
 const changeExpensesFilterHandler = (selectedYear) => {
  setFilteredYear(selectedYear);
 }

 const filteredExpenses = list.filter(listItem => {
  return listItem.expenseDate.getFullYear() === Number(filteredYear)
});

 return(
   <div className="expense-items-list">
    <ExpensesFilter
      onChangeExpensesFilter={changeExpensesFilterHandler}
      selectedYear={filteredYear}
    />
    <ExpensesChart expenses={filteredExpenses} />
    <ExpensesList list={filteredExpenses} />
   </div>
 )
}

export default ExpenseItemsList;