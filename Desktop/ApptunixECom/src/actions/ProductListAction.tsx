import {Images} from '../constants';
import ActionType from './ActionType';
import {ProductDetail, ReducerModal} from '../models';

/**
 * @function getProductLists
 * @description create a dummy product listing data
 */
const getProductLists = () => {
  const productList: Array<ProductDetail> = [
    {
      id: '1',
      price: 3000,
      actualPrice: 3500,
      totalQuantity: 10,
      selectedQuantity: 1,
      isCartItem: false,
      brandName: 'Hanuman',
      image: Images.hanumanChalisa,
      name: 'Hanuman Chalisa Size A7 - Tatvayog',
    },
    {
      id: '2',
      price: 2000,
      actualPrice: 2200,
      totalQuantity: 7,
      selectedQuantity: 1,
      isCartItem: false,
      brandName: 'Saregama',
      image: Images.carvaan,
      name: 'Carvaan Audio Player With Remote - Saregama',
    },
    {
      id: '3',
      price: 1500,
      actualPrice: 1700,
      totalQuantity: 4,
      selectedQuantity: 1,
      isCartItem: false,
      brandName: 'Acoosta',
      image: Images.carvaan_mini_sc02_blue_1,
      name: 'Acoosta Suno Bhakti - Powered by Sony Music',
    },
    {
      id: '4',
      price: 2099,
      actualPrice: 2199,
      totalQuantity: 20,
      selectedQuantity: 1,
      isCartItem: false,
      brandName: 'Tatvayog',
      image: Images.bhagavadGita,
      name: 'Bhagavad Gita - Tatvayog',
    },
    {
      id: '5',
      price: 794,
      actualPrice: 799,
      totalQuantity: 20,
      selectedQuantity: 1,
      isCartItem: false,
      brandName: 'Shemaroo',
      image: Images.dhrisham,
      name: 'Drishyam - Shemaroo',
    },
    {
      id: '6',
      price: 999,
      actualPrice: 1199,
      totalQuantity: 12,
      selectedQuantity: 1,
      isCartItem: false,
      brandName: 'Tatvayog',
      image: Images.pillow,
      name: 'Pillow Massager',
    },
    {
      id: '7',
      price: 1789,
      totalQuantity: 9,
      brandName: 'Sen',
      actualPrice: 2200,
      isCartItem: false,
      selectedQuantity: 1,
      image: Images.bed_comfort_wedge,
      name: 'Bed Comfort Wedge (Blue)',
    },
    {
      id: '8',
      price: 699,
      actualPrice: 999,
      totalQuantity: 10,
      selectedQuantity: 1,
      isCartItem: false,
      brandName: 'Honeycomb',
      image: Images.honeycomb_cushion_with_cover_,
      name: 'Honeycomb Cushion With Cover',
    },
    {
      id: '9',
      price: 449,
      actualPrice: 699,
      totalQuantity: 5,
      selectedQuantity: 1,
      isCartItem: false,
      brandName: 'Sen',
      image: Images.mat,
      name: 'Anti-Slip Shower Mat',
    },
    {
      id: '10',
      price: 499,
      actualPrice: 600,
      totalQuantity: 5,
      selectedQuantity: 1,
      isCartItem: false,
      brandName: 'Generic',
      image: Images.car_handle1,
      name: 'Car Cane Portable Handle',
    },
  ];
  return productList;
};

/**
 * @action updateProductIntoList
 * @description
 * @param productList
 */
const updateProductIntoList = (productList: Array<ProductDetail>) => {
  return (dispatch: Function) => {
    dispatch({
      type: ActionType.UPDATE_PRODUCT_IN_LIST,
      payload: {productListing: productList},
    });
  };
};

/**
 * @action addProductInCart
 * @description Adding product into cart
 */
const addProductInCart = (success: Function) => {
  return (dispatch: Function, getState: Function) => {
    const {
      ProductListingReducer: {productListing},
    }: ReducerModal = getState();
    dispatch({
      type: ActionType.ADD_PRODUCT_IN_CART,
      payload: {cartListing: productListing.filter(item => item.isCartItem)},
    });
    success();
  };
};

/**
 * @action removeProductFromCart
 * @description removing product from cart
 * @param productId
 */
const removeProductFromCart = (productId: string) => {
  return (dispatch: Function, getState: Function) => {
    const {
      CartReducer: {cartListing},
    }: ReducerModal = getState();
    dispatch({
      type: ActionType.REMOVE_PRODUCT_FROM_CART,
      payload: {
        cartListing: cartListing.filter(item => item.id !== productId),
      },
    });
  };
};

/**
 * @exports export all created actions
 */
export default {
  getProductLists,
  addProductInCart,
  removeProductFromCart,
  updateProductIntoList,
};
