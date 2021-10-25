import React, { useState, useEffect } from 'react';

import Card from '../UI/Card/Card';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

import classes from './Login.module.css';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('checking form validity');
      setFormIsValid(enteredEmail.includes('@') || enteredPassword.trim().length > 6);
    }, 500);

      return () => {
        console.log('CLEAN UP');
        clearTimeout(identifier);
      };
  }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={enteredEmail}
          onChangeHandler={emailChangeHandler}
          validateHandler={validateEmailHandler}
        />
        <Input
          isValid={passwordIsValid}
          label="Password"
          id="password"
          type="password"
          value={enteredPassword}
          onChangeHandler={passwordChangeHandler}
          validateHandler={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
