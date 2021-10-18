import React, { useState } from 'react';
import ExpenseItemsList from './components/Expenses/Expenses';
import Card from './components/Card/Card';
import NewExpense from './components/NewExpense/NewExpense';

const expenseItems = [
  {
    id: 'item1',
    expenseDate: new Date(2021, 10, 3),
    expenseTitle: 'Bread',
    expenseAmount: 36.8
  },
  {
    id: 'item2',
    expenseDate: new Date(2020, 1, 23),
    expenseTitle: 'Paper',
    expenseAmount: 236.3
  },
  {
    id: 'item3',
    expenseDate: new Date(2021, 4, 24),
    expenseTitle: 'Food',
    expenseAmount: 677.8
  },
  {
    id: 'item4',
    expenseDate: new Date(2021, 5, 2),
    expenseTitle: 'Staff',
    expenseAmount: 95.8
  },
];

function App() {
  const [items, setItems] = useState(expenseItems);


  const addNewExpenseData = (enteredExpensedData) => {
    expenseItems.push({
      ...enteredExpensedData,
      id: `item${expenseItems.length + 1}`,
    });
    const updatedExpenseItems = [...expenseItems];

    setItems(updatedExpenseItems);
  }

  return (
    <div className="App">
      <h2 className="App-header">Let's get started!</h2>
      <Card>
        <NewExpense onAddNewExpenseData={addNewExpenseData} />
        <ExpenseItemsList list={items} />
      </Card>  
    </div>
  );
}

export default App;
