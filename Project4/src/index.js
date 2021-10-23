import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
// import App from './App';
import AppWithContext from './AppWithContext';
import { AuthContextProvider } from './store/auth-context';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
  <AuthContextProvider>
    <AppWithContext />
  </AuthContextProvider>,
  document.getElementById('root')
);
