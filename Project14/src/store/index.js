import { createStore } from 'redux';

export const ACTION = {
  SHOW_CARD: 'SHOW_CARD',
  ADD_TO_CARD: 'ADD_TO_CARD',
  INCREMENT_QUANTITY: 'INCREMENT_QUANTITY',
  DECREMENT_QUANTITY: 'DECREMENT_QUANTITY', 
};

const initialState = {
  showCard: true,
  products: [{
    title: 'Test',
    price: 6,
    description: 'This is a first product - amazing!',
  },
  {
    title: 'Book',
    price: 12,
    description: 'This is a second product - wow!',
  }],
  cardItems: [{
    title: 'Test',
    price: 6,
    description: 'This is a first product - amazing!',
    quantity: 3,
    total: 18,
  }],
};

const reducerFn = (state = initialState, action) => {
  switch(action.type) {
    case ACTION.SHOW_CARD:
      return {
        ...state,
        showCard: !state.showCard
      };
    case ACTION.ADD_TO_CARD:
      const existedItem = state.cardItems.find((foundItem) => foundItem.title === action.product.title)
        if (!existedItem) {
          return state.cardItems.push({
            ...action.product,
            quantity: 1,
            total: action.product.price
          });
        } else {
          return {
            ...action.product,
            quantity: existedItem.quantity + 1,
            total: action.product.price * (existedItem.quantity + 1)
          }
        }
    case ACTION.INCREMENT_QUANTITY:
      return {
        ...state,
        cardItems: state.cardItems.map(cardItem => {
          return {
            ...cardItem,
            ...action.item,
            quantity: action.item.quantity + 1,
            total: (action.item.quantity + 1) * action.item.price,
          }
        })
      };
      case ACTION.DECREMENT_QUANTITY:
        return {
          ...state,
          cardItems: state.cardItems.map(cardItem => {
            return {
              ...cardItem,
              ...action.item,
              quantity: action.item.quantity - 1,
              total: (action.item.quantity - 1) * action.item.price,
            }
          })
        };    
    default:
      return state;
  }
};

const store = createStore(reducerFn);

const subscriber = () => store.getState();
store.subscribe(subscriber);

export default store;