import React from "react";

import ExpenseItem from "../ExpenseItem/ExpenseItem";

import './ExpensesList.css'

const ExpensesList = ({ list }) => {
  if (!list.length) {
    return <h2 className="expenses-list__fallback">No expenses found!</h2>
  }

  return (
    <ul className="expenses-list">
      {list.map(listItem => {
          return (
            <ExpenseItem
              key={listItem.id}
              {...listItem}
            />
          )
        })
      }
    </ul>
  )
}

export default ExpensesList;