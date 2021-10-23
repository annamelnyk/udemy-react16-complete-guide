import React, { useState } from 'react';

import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';
import ErrorModal from './components/UI/ErrorModal';

function App() {
  const [users, setUsers] = useState([]);
  const [showErrorModal, setShowErrorModal] = useState({
    show: false,
    title: 'Invalid input',
    message: ''
  });

  const addUserHandler = (user) => {
    if (user.name && user.age > 0) {
      setUsers([...users, user]);
    }

    if (!user.name || !user.age){
      setShowErrorModal({
        ...showErrorModal,
        show: true,
        message: 'Please enter a valid name and age (non-empty values)'
      });
    }
    
    if (user.age < 0) {
      setShowErrorModal({
        ...showErrorModal,
        show: true,
        message: 'Please enter a valid age (> 0)'
      });
    }
  }

  const closeModalHandler = () => {
    setShowErrorModal({
      ...showErrorModal,
      show: false,
    });
  }

  return (
    <>
      <AddUser onAddUser={addUserHandler} />
      {users.length && <UsersList users={users} />}
      {showErrorModal.show && 
        <ErrorModal
          title={showErrorModal.title}
          message={showErrorModal.message}
          onCloseModal={closeModalHandler}
        />
      }
    </>
  );
}

export default App;
