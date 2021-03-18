/**
 * @interface ProductDetail Create a modal interface for product details
 */
export interface ProductDetail {
  id: string;
  name: string;
  image: string;
  price: number;
  brandName: string;
  actualPrice: number;
  isCartItem: boolean;
  totalQuantity: number;
  selectedQuantity: number;
}

/**
 * @interface ProductListingModal Create a modal interface for product listing reducer
 */
export interface ProductListingModal {
  productListing: Array<ProductDetail>;
}

/**
 * @interface CartListingModal Create a modal interface for Cart listing reducer
 */
export interface CartListingModal {
  cartListing: Array<ProductDetail>;
}

/**
 * @interface ReducerModal Create a modal interface for All Reducer
 */
export interface ReducerModal {
  CartReducer: CartListingModal;
  ProductListingReducer: ProductListingModal;
}
