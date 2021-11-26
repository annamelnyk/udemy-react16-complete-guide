import React, { useState, useEffect, useCallback } from "react";

export const API_KEY = 'AIzaSyBf7gBzeku0WMoIemBrnhnXcEGJ0KOcJY4';

let logoutTimer;

export const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
}

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationTime = localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationTime);

  if (remainingTime <= 3600) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');  

    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
}

const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken;

  if (tokenData) {
    initialToken = tokenData.token
  }
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;

  const loggedOutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);
  const loggedInHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', expirationTime);
    
    const remainingTime = calculateRemainingTime(expirationTime);
    
    logoutTimer = setTimeout(loggedOutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      console.log('tokenData.duration ', tokenData.duration);
      logoutTimer = setTimeout(loggedOutHandler, tokenData.duration);
    }
  }, [tokenData, loggedOutHandler]);

  const contextValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    login: loggedInHandler,
    logout: loggedOutHandler
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;