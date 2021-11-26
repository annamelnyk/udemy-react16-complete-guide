import { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../store/auth-context';
import { API_KEY } from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const { token } = useContext(AuthContext);
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
        {
          method: 'POST',
          body: JSON.stringify({
            idToken: token,
            password: newPasswordInputRef.current.value,
            returnSecureToken: false,
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      history.replace('/');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input
          ref={newPasswordInputRef}
          minLength="7"
          type='password'
          id='new-password'
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
