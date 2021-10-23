import React, { useState, useEffect } from 'react';

// import Login from './components/Login/Login';
import LoginWIthUseReducer from './components/Login/LoginWIthUseReducer';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import { AuthContext } from './store/auth-context';

function App() {
  const storedUserLoggedIn = localStorage.getItem('isLoggedIn');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log('Effect running!');
  }, []);

  useEffect(() => {
    if(storedUserLoggedIn === '1') {
      console.log('here');
      setIsLoggedIn(true);
    }
  }, [storedUserLoggedIn]);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler
     }}
    >
      <MainHeader />
      <main>
        {!isLoggedIn && <LoginWIthUseReducer onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
