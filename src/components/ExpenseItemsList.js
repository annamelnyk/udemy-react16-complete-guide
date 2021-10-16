import React, { useState } from "react";

import ExpenseItem from './ExpenseItem/ExpenseItem';
import Card from './Card/Card';
import ExpensesFilter from "./ExpensesFilter/ExpensesFilter";

import './ExpenseItemsList.css'

function ExpenseItemsList({ list }) {
 const [filteredYear, setFilteredYear] = useState('2021'); 
 const changeExpensesFilterHandler = (selectedYear) => {
  setFilteredYear(selectedYear);
 }

 return(
   <div className="expense-items-list">
    <ExpensesFilter
      onChangeExpensesFilter={changeExpensesFilterHandler}
      selectedYear={filteredYear}
    />
    {list
      .filter(listItem => filteredYear && listItem.expenseDate.getFullYear() === Number(filteredYear))
      .map(listItem => {
        return (
          <Card key={listItem.id}>
            <ExpenseItem {...listItem}  />
          </Card>
        )}
    )}
   </div>
 )
}

export default ExpenseItemsList;