import React, { useState, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import { AuthContext } from '../../store/auth-context';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val.includes('@'),
    }
  }

  if (action.type === 'INPUT_BLURED') {
    return {
      value: state.value,
      isValid: state.value.includes('@'),
    }
  }

  return {
    value: '',
    isValid: false,
  }
};
const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val.trim().length > 6,
    }
  }

  if (action.type === 'INPUT_BLURED') {
    return {
      value: state.value,
      isValid: state.value.trim().length > 6,
    }
  }

  return {
    value: '',
    isValid: false,
  }
};

const Login = (props) => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const ctx = useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(
    emailReducer,
    {
      value: '',
      isValid: false
    }
  );
  const [passwordState, dispatchPassword] = useReducer(
    passwordReducer,
    {
      value: '',
      isValid: false
    }
  );

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  const emailChangeHandler = (event) => {
    dispatchEmail({
      type: 'USER_INPUT',
      val: event.target.value
    });

    setFormIsValid(emailIsValid && passwordIsValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: 'USER_INPUT',
      val: event.target.value
    });

    setFormIsValid(passwordIsValid && emailIsValid);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLURED' });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLURED' })
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      ctx.onLogin(emailState.value, passwordState.value);
    } else  if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
      <Input
          ref={emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChangeHandler={emailChangeHandler}
          validateHandler={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          isValid={passwordIsValid}
          label="Password"
          id="password"
          type="password"
          value={passwordState.value}
          onChangeHandler={passwordChangeHandler}
          validateHandler={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
