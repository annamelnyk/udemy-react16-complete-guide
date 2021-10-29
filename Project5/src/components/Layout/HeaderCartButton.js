import React, { useContext, useEffect, useState } from "react";

import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const numberOfCartItems = cartCtx.items.reduce((acc, item) => acc += item.amount, 0);
  const [btnHasAnimation, setBtnHasAnimation] = useState(false);
  const btnClasses = btnHasAnimation 
    ? `${classes.button} ${classes.bump}`
    : `${classes.button}`
  
  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }

    setBtnHasAnimation(true);

    const timer = setTimeout(() => setBtnHasAnimation(false), 300);

    // cleanup function
    return () => clearTimeout(timer);
  }, [cartCtx.items]);

  return (
    <button
      className={btnClasses}
      onClick={props.onClick}
    >
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton;
