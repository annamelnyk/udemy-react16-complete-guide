import { useDispatch } from 'react-redux';

import { ACTION } from '../../store';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';

const ProductItem = (props) => {
  const { title, price, description } = props;
  const dispatch = useDispatch();

  const addToCardHandler = () => dispatch({
    type: ACTION.ADD_TO_CARD,
    product: {
      title,
      price,
      description
    }
  });

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCardHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
