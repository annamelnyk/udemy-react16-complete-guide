import { useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
  const showCard = useSelector(state => state.showCard);

  return (
    <Layout>
      {showCard && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
