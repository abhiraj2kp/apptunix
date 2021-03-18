import ActionType from '../actions/ActionType';
import {ProductListingModal} from '../models/';

/**
 * @description initilize initial values for Product listing reducer
 */
const initialState: ProductListingModal = {
  productListing: [],
};

/**
 * @description Creating a reducer and update it's value based on specific types
 * @function ProductListingReducer
 * @param state
 * @param action
 */
const ProductListingReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.UPDATE_PRODUCT_IN_LIST:
      return {...state, ...action.payload};
    default: {
      return state;
    }
  }
};

/**
 * @exports ProductListingReducer
 */

export default ProductListingReducer;
