import React, { useRef } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import classes from './AddUser.module.css';

const AddUser = ({ onAddUser }) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredAge = ageInputRef.current.value;

    const user = {
      name: enteredName, 
      age: enteredAge,
      id: `${enteredName}${enteredAge}` 
    };

    console.log('user', user);

    onAddUser(user);
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
  };

  return (
    <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
        <input ref={nameInputRef} id="username" type="text" />
        <label htmlFor="age">Age (Years)</label>
        <input ref={ageInputRef} id="age" type="number" />
        <Button type="submit">Add User</Button>
      </form>
    </Card>
  );
};

export default AddUser;
