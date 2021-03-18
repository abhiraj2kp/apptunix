import {combineReducers} from 'redux';
import CartReducer from './CartReducer';
import ProductListingReducer from './ProductListingReducer';

/**
 * @description Combining all reducers into single one
 *
 */
const rootReducer = combineReducers({
  CartReducer,
  ProductListingReducer,
});

/**
 * @exports rootReducer rootReducer
 */
export default rootReducer;
