import {
  Text,
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {ReducerModal} from '../../models';
import {ProductDetail} from '../../models';
import {ProductItem} from '../../components';
import {CustomHeader} from '../../components';
import {ProductListAction} from '../../actions';
import {Colors, Strings} from '../../constants';
import {normalize} from '../../utils/Dimension';
import RouteName from '../../navigator/RouteName';
//@ts-ignore
import {useDispatch, useSelector} from 'react-redux';

/**
 * @interface Props
 * @description Defining all required props
 */

interface Props {
  navigation: any;
}

/**
 *
 * @description Creating the ProductItem Component
 */

export const ProductListing = function name({navigation}: Props) {
  /**
   *
   * @function dispatch
   * @description Creating dispatch action's creator
   */
  const dispatch = useDispatch();

  /**
   *
   * @description getting product list from Product listing reducer
   */
  const {productListing} = useSelector(
    (state: ReducerModal) => state.ProductListingReducer,
  );

  /**
   * @hook useEffect
   * @description fetching and storing product listing into reducer when component mount successfully
   */
  useEffect(() => {
    dispatch(
      ProductListAction.updateProductIntoList(
        ProductListAction.getProductLists(),
      ),
    );
  }, []);

  /**
   *
   * @description Creating a function to update quantity of the product item
   * @function onQuantityPress
   * @param productId
   * @param quantity
   */
  const onQuantityPress = (productId: string, quantity: number) => {
    const cpyProducts = productListing;
    const index = cpyProducts.findIndex(
      (item: ProductDetail) => item.id === productId,
    );
    if (index !== -1) {
      cpyProducts[index] = {
        ...cpyProducts[index],
        ...{selectedQuantity: quantity},
      };
      dispatch(ProductListAction.updateProductIntoList(cpyProducts.splice(0)));
    }
  };

  /**
   * @description Creating a function to Adding item into cart and remove item from cart
   * @function onAddToCartPress
   * @param productId
   * @param isCartItem
   */
  var onAddToCartPress = (productId: string, isCartItem: boolean) => {
    const cpyProducts = productListing;
    const index = cpyProducts.findIndex(
      (item: ProductDetail) => item.id === productId,
    );
    if (index !== -1) {
      cpyProducts[index] = {
        ...cpyProducts[index],
        ...{isCartItem: !isCartItem},
      };
      dispatch(ProductListAction.updateProductIntoList(cpyProducts.splice(0)));
    }
  };

  /**
   * @description Creating a function to show each product item
   * @function renderItem
   * @param item
   */
  const renderItem = ({item}: {item: ProductDetail}) => {
    return (
      <ProductItem
        id={item.id}
        name={item.name}
        image={item.image}
        price={item.price}
        isViewableItem={false}
        brandName={item.brandName}
        isCartItem={item.isCartItem}
        actualPrice={item.actualPrice}
        onQuantityPress={onQuantityPress}
        totalQuantity={item.totalQuantity}
        onAddToCartPress={onAddToCartPress}
        selectedQuantity={item.selectedQuantity}
      />
    );
  };

  /**
   *
   * @description Creating a function for uniquely identifying each product item
   * @function keyExtractor
   * @param item
   */
  const keyExtractor = (item: ProductDetail) => {
    return item.id;
  };

  /**
   * @function itemSeparator
   * @description Creating a function for showing separotor between two product item
   */
  const itemSeparator = () => {
    return <View style={styles.separator} />;
  };

  /**
   * @function onCheckoutPress
   * @description Creating a function to navigate to cart screen when user proceed to checkout
   */
  const onCheckoutPress = () => {
    dispatch(
      ProductListAction.addProductInCart(() =>
        navigation.navigate(RouteName.Screens.Cart),
      ),
    );
  };

  /**
   * @description
   * @function enableForCheckout Creating a function to check whether item added into cart and update UI
   */
  const enableForCheckout = () => {
    return (
      productListing.filter((item: ProductDetail) => item.isCartItem).length > 0
    );
  };

  /**
   * @description Returing the whole Product listing screen
   */
  return (
    <SafeAreaView style={styles.parentContainer}>
      <CustomHeader title={Strings.products} />
      <FlatList
        data={productListing}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={itemSeparator}
        contentContainerStyle={styles.containerStyle}
      />
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onCheckoutPress}
        disabled={!enableForCheckout()}
        style={
          enableForCheckout()
            ? styles.checkoutContainer
            : styles.disableCheckoutContainer
        }>
        <Text style={styles.checkout}>{Strings.checkout}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

/**
 *
 * @description Defining styles for ProductItem Component
 */
const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  containerStyle: {
    paddingBottom: normalize(50),
  },
  checkoutContainer: {
    height: normalize(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalize(25),
    marginBottom: normalize(20),
    marginHorizontal: normalize(20),
    backgroundColor: Colors.darkBlue,
  },
  disableCheckoutContainer: {
    opacity: 0.5,
    height: normalize(50),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(20),
    borderRadius: normalize(25),
    marginHorizontal: normalize(20),
    backgroundColor: Colors.darkBlue,
  },
  checkout: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.white,
  },
  separator: {
    height: 0.5,
    marginTop: normalize(16),
    marginBottom: normalize(24),
    backgroundColor: Colors.brownishGray,
  },
});
