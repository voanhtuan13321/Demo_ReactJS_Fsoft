/**
 * Create a reducer for storing cart items.
 *
 * @param {state} []
 * @param {action} {type, data}
 * @returns state
 */
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const { id } = action.data;
      const cartIndex = state.findIndex((item) => item.id === id);

      if (cartIndex === -1) {
        // don't have in cart, add new
        return [...state, { ...action.data, quantity: 1 }];
      } else {
        // have in cart, update quantity
        const updatedState = [...state];
        updatedState[cartIndex] = {
          ...updatedState[cartIndex],
          quantity: updatedState[cartIndex].quantity + 1,
        };
        return updatedState;
      }
    }

    case 'REMOVE': {
      return state.filter((item) => item.id !== action.data.id);
    }

    case 'INCREASE': {
      const { id } = action.data;

      const newState = state.map((item) => {
        // update quantity if id is matched
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      return newState;
    }

    case 'REDUCE': {
      const { id } = action.data;

      const newState = state.map((item) => {
        // update quantity if id is matched and if quantity > 1
        if (item.id === id && item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });
      return newState;
    }

    default:
      return state;
  }
};

export { cartReducer };
