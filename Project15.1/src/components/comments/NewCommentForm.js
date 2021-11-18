import { useRef, useEffect } from 'react';

import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';

import classes from './NewCommentForm.module.css';

const NewCommentForm = ({ quoteId, onAddedComment }) => {
  const { sendRequest, status, error } = useHttp(addComment);
  const commentTextRef = useRef();

  useEffect(() => {
    if (status === 'completed' && !error) {
      onAddedComment();
    }
  }, [status, error, onAddedComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    console.log('event ', commentTextRef.current.value); 
    sendRequest({ commentData: { text: commentTextRef.current.value }, quoteId });
    commentTextRef.current.value = '';
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === 'pending' && 
        <div className="centered"><LoadingSpinner /></div>
      }
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn' type="submit">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
