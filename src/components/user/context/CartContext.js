import { createContext, useReducer } from 'react';

import { cartReducer } from './CartReducer';

// Create a context
const CartContext = createContext();

// custom Provider of content provider
function CartProvider({ children }) {
  const [carts, cartsDispatch] = useReducer(cartReducer, []);
  const value = [carts, cartsDispatch];
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export { CartContext, CartProvider };
