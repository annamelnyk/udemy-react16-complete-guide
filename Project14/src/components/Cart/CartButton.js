import { useSelector, useDispatch } from 'react-redux';

import { ACTION } from '../../store';
import classes from './CartButton.module.css';

const CartButton = (props) => {
 const cardItems = useSelector(state => state.cardItems); 
 const dispatch = useDispatch();
 const showCardHandler = () => dispatch({ type: ACTION.SHOW_CARD }) 
  return (
    <button onClick={showCardHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{cardItems.length}</span>
    </button>
  );
};

export default CartButton;
