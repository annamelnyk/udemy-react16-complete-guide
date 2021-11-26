import React, { Suspense } from 'react';
import { useRoutes, Outlet } from 'react-router-dom';

import Comments from './components/comments/Comments';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';

const NewQuote = React.lazy(() => import('./pages/NewQuote'));
const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const AllQuotes = React.lazy(() => import('./pages/AllQuotes'));

function App() {
  // with nested routes and nested UI

  // let element = useRoutes([
  //   { path: "/", element: <AllQuotes /> },
  //   {
  //     path: "quotes",
  //     element: <><AllQuotes /><Outlet /></>,
  //     children: [
  //       {
  //         path: ":quoteId",
  //         element: <><QuoteDetail /><Outlet /></>,
  //         children: [
  //           { path: 'comments', element: <><Comments /></>}
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     path: "new-quote",
  //     element: <NewQuote />,
  //   },
  //   { path: "*", element: <NotFound /> }
  // ]);

  let element = useRoutes([
    { path: "/", element: <AllQuotes /> },
    {
      path: "quotes",
      element: <AllQuotes />,
    },
    {
      path: "quotes/:quoteId",
      element: <QuoteDetail />,
    },
    { path: 'quotes/:quoteId/comments', element: <Comments />},
    {
      path: "new-quote",
      element: <NewQuote />,
    },
    { path: "*", element: <NotFound /> }
  ]);

  return <Suspense
      fallback={<div className="centered"><LoadingSpinner /></div>}
    >
      <Layout children={element} />
    </Suspense>;
  // return (
  //   <Routes>
  //     <Route path="/" element={<AllQuotes />} />
  //     <Route path="/quotes" element={<AllQuotes />} />
  //     <Route path="/quotes/:quoteId" element={<QuoteDetail />} />
  //     <Route path="/new-quote" element={<NewQuote />} />
  //   </Routes>
  // );
}

export default App;
