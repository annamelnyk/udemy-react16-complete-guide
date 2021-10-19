import React, { useState } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import classes from './AddUser.module.css';

const AddUser = ({ onAddUser }) => {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  }

  const ageHandler = (e) => {
    setAge(e.target.value);
  }

  const addUserHandler = (event) => {
    event.preventDefault();

    const user = {
      name: username, 
      age,
      id: `${username}${age}` 
    };

    console.log('user', user);

    onAddUser(user);
  };

  return (
    <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" onChange={usernameHandler} />
        <label htmlFor="age">Age (Years)</label>
        <input id="age" type="number" onChange={ageHandler} />
        <Button type="submit">Add User</Button>
      </form>
    </Card>
  );
};

export default AddUser;
