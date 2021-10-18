import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '../../UI/Button/Button';

const FormControl = styled.div`
  margin: 0.5rem 0;

  & label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
  }

  & input {
    display: block;
    width: 100%;
    border: 1px solid #ccc;
    font: inherit;
    line-height: 1.5rem;
    padding: 0 0.25rem;
  }

  & input:focus {
    outline: none;
    background: #fad0ec;
    border-color: #8b005d;
  }

  &.invalid input {
    border-color: red;
    background: #ffd7d7;
  }

  &.invalid label {
    color: red;
  }
`;

const CourseInput = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isValid, setIsValid] = useState(true); 

  const goalInputChangeHandler = event => {
    if (event.target.value.trim().length) {
      setIsValid(true);
    }

    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = event => {
    event.preventDefault();
    if (!enteredValue.trim().length) {
      setIsValid(false);
      return;      
    }

    props.onAddGoal(enteredValue);
  };
  const labelStyle = {color: isValid ? 'black' : 'red'};
  const inputStyle = {
    borderColor: isValid ? '#8b005d' : 'red',
    backgroundColor: isValid ? '#fad0ec' : 'salmon'
  };

  const invalidClasses = !isValid ? 'invalid' : '';

  return (
    <form onSubmit={formSubmitHandler}>
      <FormControl className={invalidClasses}>
        <label>Course Goal</label>
        <input
          type="text"
          onChange={goalInputChangeHandler}
        />
      </FormControl>
      <Button type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;
