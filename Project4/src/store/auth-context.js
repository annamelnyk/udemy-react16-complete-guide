import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

const AuthContextProvider = (props) => {
  const storedUserLoggedIn = localStorage.getItem('isLoggedIn');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if(storedUserLoggedIn === '1') {
      console.log('here');
      setIsLoggedIn(true);
    }
  }, [storedUserLoggedIn]);

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  const loginHandler = (email, password) => {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
};

export {
  AuthContext,
  AuthContextProvider,
};
