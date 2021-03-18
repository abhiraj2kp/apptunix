import {
  Text,
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {ReducerModal} from '../../models';
import {ProductDetail} from '../../models';
import {ProductItem} from '../../components';
import {CustomHeader} from '../../components';
import {normalize} from '../../utils/Dimension';
import {ProductListAction} from '../../actions';
//@ts-ignore
import {useSelector, useDispatch} from 'react-redux';
import {Colors, Images, Strings} from '../../constants';
import CommonFunction from '../../utils/CommonFunction';

/**
 * @interface Props
 * @description Defining all required props
 */
interface Props {
  navigation: any;
}

/**
 * @function Cart
 * @description Creating a cart screeen component
 */
export const Cart = React.memo(({navigation}: Props) => {
  /**
   *
   * @function dispatch
   * @description Creating dispatch action's creator
   */
  const dispatch = useDispatch();

  /**
   *
   * @description getting product list from Cart reducer
   */
  const cartListing = useSelector(
    (state: ReducerModal) => state.CartReducer.cartListing,
  );

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
        isViewableItem={true}
        brandName={item.brandName}
        isCartItem={item.isCartItem}
        actualPrice={item.actualPrice}
        totalQuantity={item.totalQuantity}
        selectedQuantity={item.selectedQuantity}
      />
    );
  };

  /**
   * @description navigation to back
   * @function onGoBack
   */

  const onGoBack = () => {
    navigation.goBack();
  };

  /**
   * @function onPayPress
   * @description pay amount
   */
  const onPayPress = () => {
    CommonFunction.showToast(Strings.thanksForPay);
    setTimeout(() => {
      dispatch(
        ProductListAction.updateProductIntoList(
          ProductListAction.getProductLists(),
        ),
      );
      onGoBack();
    }, 1500);
  };
  let totalPayableAmt = 0;
  cartListing.forEach((item: ProductDetail) => (totalPayableAmt += item.price));

  /**
   * @description Returing the whole Cart listing screen
   */
  return (
    <SafeAreaView style={styles.parentContainer}>
      <CustomHeader
        title={Strings.cart}
        leftIconPress={onGoBack}
        leftIcon={Images.backIcon}
      />
      <FlatList
        data={cartListing}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={itemSeparator}
        contentContainerStyle={styles.containerStyle}
      />
      <TouchableOpacity
        onPress={onPayPress}
        activeOpacity={0.5}
        style={styles.payableAmtContainer}>
        <Text style={styles.checkout}>
          {`${Strings.pay} `}
          <Text>{'\u20B9'}</Text> {totalPayableAmt}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
});

/**
 *
 * @description Defining styles for Cart Component
 */
const styles = StyleSheet.create({
  priceDetailContainer: {
    marginTop: normalize(20),
    marginHorizontal: normalize(20),
  },
  divider: {
    height: normalize(15),
    backgroundColor: Colors.liteWhiteGray,
  },
  containerStyle: {
    paddingBottom: normalize(50),
  },
  parentContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  priceDetails: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: normalize(20),
  },
  payableAmtContainer: {
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
