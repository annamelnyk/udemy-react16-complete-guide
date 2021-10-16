import React from "react";

import './ExpenseDate.css';

function ExpenseDate({ date }) {
  const [year, month, day] = [
    date.getFullYear(),
    date.toLocaleString('default', { month: 'long' }),
    date.toLocaleString('default', { day: '2-digit' }),
  ];

  return(
    <div className="expense-date">
      <div className="expense-month">{month}</div>
      <div className="expense-year">{year}</div>
      <div className="expense-day">{day}</div>
    </div>
  )
}

export default ExpenseDate;