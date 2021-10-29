import React, { useState, useContext } from "react";

import CartProvider from "./store/cartProvider";
import Header from "./components/Layout/Header";
import Meals from './components/Meals/Meals';
import Cart from "./components/Cart/Cart";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const closeCardHandler = (e) => {
    console.log(e);
    if (e.keyCode === 27) {
      setCartIsShown(false);
      
      return;
    }
    setCartIsShown(false);
  }

  const showCardHandler = () => {
    setCartIsShown(true);
  }

  return (
    <CartProvider>
      {cartIsShown &&
        <Cart
          onClose={closeCardHandler}
          onOpen={showCardHandler}
        />
      }
      <Header 
        onCartModalShow={showCardHandler}
      />
      <main>
        <Meals />
      </main>
    </CartProvider>  
  );
}

export default App;
