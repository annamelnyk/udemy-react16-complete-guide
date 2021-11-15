import QuoteForm from "../components/quotes/QuoteForm";

const NewQuote = () => {
  const addQuoteHandler = (qouteData) => {
    console.log(qouteData);
  }
  return <QuoteForm onAddQuote={addQuoteHandler} />
};

export default NewQuote;
