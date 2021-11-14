import { useSelector } from 'react-redux';

import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const cardItems = useSelector(state => state.cardItems);
  console.log('cardItems ', cardItems);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cardItems.map(cardItem => (
          <>{cardItem.quantity > 0
              ? <CartItem
                  key={cardItem.description}
                  item={{
                    title: cardItem.title,
                    quantity: cardItem.quantity,
                    total: cardItem.total,
                    price: cardItem.price
                  }}
                />
              : null
            }
          </>
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
