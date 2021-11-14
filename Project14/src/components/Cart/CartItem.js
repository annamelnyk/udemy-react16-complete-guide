import { useDispatch } from 'react-redux';

import { ACTION } from '../../store';
import classes from './CartItem.module.css';

const CartItem = (props) => {
  const { title, quantity, total, price } = props.item;
  const dispatch = useDispatch();

  const incrementQuantityHandler = () => dispatch({
    type: ACTION.INCREMENT_QUANTITY,
    item: {...props.item }
  });
  const decrementQuantityHandler = () => dispatch({
    type: ACTION.DECREMENT_QUANTITY,
    item: {...props.item }
  });

  return (
    <li className={classes.item}>
      <header>
        <h3>{`${title} Item`}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={decrementQuantityHandler}>-</button>
          <button onClick={incrementQuantityHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
