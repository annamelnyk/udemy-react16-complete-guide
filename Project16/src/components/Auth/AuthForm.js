import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext, API_KEY } from '../../store/auth-context';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const credentials = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
      returnSecureToken: true
    };

    let url;
    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        url,
        {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      const formattedResp = await response.json();
      console.log('formattedResp ', formattedResp);
      setIsLoading(false);

      const expirationTime = new Date(new Date().getTime() + Number(formattedResp.expiresIn) * 1000);
      authCtx.login(formattedResp.idToken, expirationTime);
      history.replace('/');

      console.error(formattedResp?.error?.message);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input ref={emailInputRef} type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input ref={passwordInputRef} type='password' id='password' required />
        </div>
        <div className={classes.actions}>
        {isLoading 
          ? <h4>Loading...</h4>
          : <button>{isLogin ? 'Login' : 'Create Account'}</button>
        }
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
