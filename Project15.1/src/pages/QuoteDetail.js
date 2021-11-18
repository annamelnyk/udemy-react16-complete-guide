import { useEffect } from 'react';
import { useParams, Link, useMatch } from 'react-router-dom';

import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';

const QuoteDetail = () => {
  // const match = useMatch();
  // console.log('match ', match);
  const { sendRequest, status, data: loadedQuote, error } = useHttp(getSingleQuote, true);
  const params = useParams();

  useEffect(() => {
    sendRequest(params.quoteId);
  }, [sendRequest, params.quoteId]);

  if (!loadedQuote) {
    return <p>No quote found!</p>
  }

  if (status === 'pending') {
    return <div className="centered focused"><LoadingSpinner /></div>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <div className='centered'>
      <Link className='btn-flat' to={`../quotes/${params.quoteId}/comments`}>Quote</Link>
      </div>
    </>  
  )
};

export default QuoteDetail;
