import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';

const NewQuote = () => {
  const { sendRequest, status } = useHttp(addQuote);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'comleted') {
      navigate('/quotes');
    }
  }, [status, navigate]);

  const addQuoteHandler = (qouteData) => {
    console.log(qouteData);
    sendRequest(qouteData);
  }
  return <QuoteForm
    onAddQuote={addQuoteHandler}
    isLoading={status === 'pending'}
   />
};

export default NewQuote;
