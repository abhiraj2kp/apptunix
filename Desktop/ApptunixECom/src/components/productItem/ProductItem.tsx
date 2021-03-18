import {
  View,
  Image,
  Text,
  TextStyle,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {normalize} from '../../utils/Dimension';
import {Colors, Images, Strings} from '../../constants';
import CommonFunction from '../../utils/CommonFunction';

/**
 * @interface Props
 * @description Defining all required props
 */

interface Props {
  id: string;
  image: any;
  name: string;
  price: number;
  brandName: string;
  actualPrice: number;
  isCartItem: boolean;
  totalQuantity: number;
  isViewableItem: boolean;
  selectedQuantity: number;
  onQuantityPress?: Function;
  onAddToCartPress?: Function;
}

/**
 * @function areEqual Creating a function for handling unnecessary rerending
 * @description Creating the ProductItem Component
 */
const areEqual = (prevProps: Props, nextProps: Props) => true;

/**
 * @function ProductItem
 * @description Creating the ProductItem Component
 */
export const ProductItem = React.memo(function productItem(props: Props) {
  /**
   *
   * @description Creating a function for showing product quantity
   * @function squareBox
   * @param title
   * @param titleColor
   * @param isTouchable
   * @param callBackFun
   * @param extraContainerStyle
   */
  const squareBox = (
    title: string,
    titleColor: TextStyle,
    callBackFun?: Function,
    extraContainerStyle?: ViewStyle,
  ) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => callBackFun && callBackFun()}
        style={[styles.squareBox, extraContainerStyle]}>
        {title === '-' ? (
          <View style={styles.minusViewStyle} />
        ) : (
          <Text style={[styles.quantity, titleColor]}>{title}</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={styles.container}>
        <Image style={styles.productImage} source={props.image} />
        <View style={styles.subContainer}>
          <Text style={styles.brandName}>{props.brandName}</Text>
          <Text style={styles.productName}>{props.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              <Text>{'\u20B9'}</Text>
              {props.price}
            </Text>
            {!props.isViewableItem ? (
              <Text style={styles.lineCutStyle}>
                <Text>{'\u20B9'}</Text>
                {props.actualPrice}
              </Text>
            ) : (
              <Text style={styles.lineCutStyle}>
                {`${Strings.quantity} ${props.selectedQuantity}`}
              </Text>
            )}
          </View>
        </View>
      </View>
      {!props.isViewableItem ? (
        <View style={styles.addToCartContainer}>
          <TouchableOpacity
            onPress={() =>
              props.onAddToCartPress &&
              props.onAddToCartPress(props.id, props.isCartItem)
            }
            style={styles.addCartContainer}>
            <Image
              resizeMode="contain"
              style={styles.cartIcon}
              source={Images.cartIcon}
            />
            <Text style={styles.addToCart}>
              {props.isCartItem ? Strings.removeFromCart : Strings.addToCart}
            </Text>
          </TouchableOpacity>
          <View style={styles.quantityBoxStyle}>
            {squareBox(
              '-',
              styles.incrementTextStyle,
              () => {
                if (props.selectedQuantity == 1) {
                  CommonFunction.showToast(`${Strings.need1Item}`);
                } else
                  props.onQuantityPress &&
                    props.onQuantityPress(props.id, props.selectedQuantity - 1);
              },
              undefined,
            )}
            {squareBox(
              `${props.selectedQuantity}`,
              styles.quantityAvail,
              undefined,
              styles.quantityBorderStyle,
            )}
            {squareBox(
              '+',
              styles.incrementTextStyle,
              () => {
                if (props.selectedQuantity == props.totalQuantity) {
                  CommonFunction.showToast(
                    `${Strings.cantAddMore} ${props.totalQuantity} ${Strings.item}`,
                  );
                } else
                  props.onQuantityPress &&
                    props.onQuantityPress(props.id, props.selectedQuantity + 1);
              },
              undefined,
            )}
          </View>
        </View>
      ) : null}
    </View>
  );
});

// export class ProductItem extends React.Component<Props> {
//   /**
//    *
//    * @description Creating a function for showing product quantity
//    * @function squareBox
//    * @param title
//    * @param titleColor
//    * @param isTouchable
//    * @param callBackFun
//    * @param extraContainerStyle
//    */
//   squareBox = (
//     title: string,
//     titleColor: TextStyle,
//     callBackFun?: Function,
//     extraContainerStyle?: ViewStyle,
//   ) => {
//     return (
//       <TouchableOpacity
//         activeOpacity={0.5}
//         onPress={() => callBackFun && callBackFun()}
//         style={[styles.squareBox, extraContainerStyle]}>
//         {title === '-' ? (
//           <View style={styles.minusViewStyle} />
//         ) : (
//           <Text style={[styles.quantity, titleColor]}>{title}</Text>
//         )}
//       </TouchableOpacity>
//     );
//   };
//   shouldComponentUpdate(nextProps: Props) {
//     const {id, isCartItem, selectedQuantity} = this.props;
//     if (
//       id !== nextProps.id ||
//       isCartItem !== nextProps.isCartItem ||
//       selectedQuantity !== nextProps.selectedQuantity
//     ) {
//       return true;
//     }
//     return false;
//   }
//   render() {
//     const {props} = this;
//     return (
//       <View>
//         <View style={styles.container}>
//           <Image style={styles.productImage} source={props.image} />
//           <View style={styles.subContainer}>
//             <Text style={styles.brandName}>{props.brandName}</Text>
//             <Text style={styles.productName}>{props.name}</Text>
//             <View style={styles.priceContainer}>
//               <Text style={styles.price}>
//                 <Text>{'\u20B9'}</Text>
//                 {props.price}
//               </Text>
//               {!props.isViewableItem ? (
//                 <Text style={styles.lineCutStyle}>
//                   <Text>{'\u20B9'}</Text>
//                   {props.actualPrice}
//                 </Text>
//               ) : (
//                 <Text style={styles.lineCutStyle}>
//                   {`${Strings.quantity} ${props.selectedQuantity}`}
//                 </Text>
//               )}
//             </View>
//           </View>
//         </View>
//         {!props.isViewableItem ? (
//           <View style={styles.addToCartContainer}>
//             <TouchableOpacity
//               onPress={() =>
//                 props.onAddToCartPress &&
//                 props.onAddToCartPress(props.id, props.isCartItem)
//               }
//               style={styles.addCartContainer}>
//               <Image
//                 resizeMode="contain"
//                 style={styles.cartIcon}
//                 source={Images.cartIcon}
//               />
//               <Text style={styles.addToCart}>
//                 {props.isCartItem ? Strings.removeFromCart : Strings.addToCart}
//               </Text>
//             </TouchableOpacity>
//             <View style={styles.quantityBoxStyle}>
//               {this.squareBox(
//                 '-',
//                 styles.incrementTextStyle,
//                 () => {
//                   if (props.selectedQuantity == 1) {
//                     CommonFunction.showToast(`${Strings.need1Item}`);
//                   } else
//                     props.onQuantityPress &&
//                       props.onQuantityPress(
//                         props.id,
//                         props.selectedQuantity - 1,
//                       );
//                 },
//                 undefined,
//               )}
//               {this.squareBox(
//                 `${props.selectedQuantity}`,
//                 styles.quantityAvail,
//                 undefined,
//                 styles.quantityBorderStyle,
//               )}
//               {this.squareBox(
//                 '+',
//                 styles.incrementTextStyle,
//                 () => {
//                   if (props.selectedQuantity == props.totalQuantity) {
//                     CommonFunction.showToast(
//                       `${Strings.cantAddMore} ${props.totalQuantity} ${Strings.item}`,
//                     );
//                   } else
//                     props.onQuantityPress &&
//                       props.onQuantityPress(
//                         props.id,
//                         props.selectedQuantity + 1,
//                       );
//                 },
//                 undefined,
//               )}
//             </View>
//           </View>
//         ) : null}
//       </View>
//     );
//   }
// }

/**
 *
 * @description Defining styles for ProductItem Component
 */
const styles = StyleSheet.create({
  price: {
    fontWeight: '600',
    fontSize: normalize(17),
  },
  incrementTextStyle: {
    color: Colors.green,
  },
  quantity: {
    fontSize: 20,
    color: Colors.liteBlack,
  },
  quantityAvail: {
    color: Colors.black,
  },
  addCartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: normalize(42),
    justifyContent: 'center',
    borderWidth: normalize(1),
    borderRadius: normalize(3),
    borderColor: Colors.liteWhite,
    paddingHorizontal: normalize(11),
  },
  quantityBoxStyle: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: normalize(3),
    borderColor: Colors.liteWhite,
  },
  addToCart: {
    color: Colors.black,
    fontSize: normalize(14),
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(20),
  },
  cartIcon: {
    width: normalize(24),
    height: normalize(24),
  },
  productImage: {
    width: normalize(125),
    height: normalize(125),
  },
  subContainer: {
    flex: 1,
    marginLeft: normalize(10),
  },
  brandName: {
    fontSize: 15,
    color: Colors.liteBlack,
  },
  productName: {
    fontSize: 18,
    color: Colors.black,
    marginTop: normalize(5),
  },
  container: {
    flexDirection: 'row',
    marginHorizontal: normalize(20),
  },
  addToCartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(25),
    justifyContent: 'space-between',
    marginHorizontal: normalize(20),
  },
  minusViewStyle: {
    width: normalize(8),
    height: normalize(2.5),
    backgroundColor: Colors.green,
  },
  quantityBorderStyle: {
    borderWidth: normalize(1),
    borderTopWidth: normalize(0),
    borderBottomWidth: normalize(0),
    borderLeftColor: Colors.liteWhite,
    borderRightColor: Colors.liteWhite,
  },
  squareBox: {
    width: normalize(41),
    alignItems: 'center',
    height: normalize(41),
    justifyContent: 'center',
  },
  lineCutStyle: {
    color: Colors.liteBlack,
    marginHorizontal: normalize(9),
    textDecorationLine: 'line-through',
    textDecorationColor: Colors.brownishGray,
  },
});
