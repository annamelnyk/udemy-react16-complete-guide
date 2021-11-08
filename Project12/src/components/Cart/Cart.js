import { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const url = 'https://react-http-2cdd5-default-rtdb.firebaseio.com/orders.json';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [showAdressForm, setShowAdressForm] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const showAdressFormHandler = (e) => {
    setShowAdressForm(true);
  }

  const submitOrderHandler = async (userData) => {
    setIsSubmiting(true);

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
      })
    });

    if (response.ok) {
      setDidSubmit(true);
      setIsSubmiting(false);
      cartCtx.clearItem();
    }
  }

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showAdressForm &&
        <Checkout
          onConfirm={submitOrderHandler}
          onCancel={props.onClose}
        />
      }
      {!showAdressForm && 
        <div className={classes.actions}>
          <button className={classes['button--alt']} onClick={props.onClose}>
            Close
          </button>
          {hasItems && <button className={classes.button} onClick={showAdressFormHandler}>Order</button>}
        </div>
      }
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = <p>Successfully sent the order!</p>;

  return (
    <Modal onClose={props.onClose}>
      {!isSubmiting && cartModalContent}
      {isSubmiting && isSubmittingModalContent}
      {didSubmit && !isSubmiting && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
