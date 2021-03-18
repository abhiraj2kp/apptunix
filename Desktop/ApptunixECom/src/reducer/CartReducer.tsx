import {CartListingModal} from '../models/';
import ActionType from '../actions/ActionType';

/**
 * @description initilize initial values for cart listing reducer
 */
const initialState: CartListingModal = {
  cartListing: [],
};

/**
 * @description Creating a reducer and update it's value based on specific types
 * @function CartReducer
 * @param state
 * @param action
 */
const CartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.ADD_PRODUCT_IN_CART:
      return {...state, ...action.payload};
    case ActionType.REMOVE_PRODUCT_FROM_CART:
      return {...state, ...action.payload};
    default: {
      return state;
    }
  }
};

/**
 * @exports CartReducer
 */
export default CartReducer;
