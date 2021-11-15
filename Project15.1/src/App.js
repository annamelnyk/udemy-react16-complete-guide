import { useRoutes, Outlet } from 'react-router-dom';

import AllQuotes from './pages/AllQuotes'; 
import NewQuote from './pages/NewQuote';
import QuoteDetail from './pages/QuoteDetail';
import Comments from './components/comments/Comments';
import Layout from './components/layout/Layout';
import NotFound from './pages/NotFound';

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

  return <Layout children={element} />;
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
