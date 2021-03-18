import {
  View,
  Image,
  Text,
  ViewStyle,
  TextStyle,
  ImageStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Colors} from '../../constants';
import {normalize} from '../../utils/Dimension';

/**
 *
 * @description Defining all required props
 */

interface Props {
  title: string;
  leftIcon?: any;
  rightIcon?: any;
  leftIconPress?: Function;
  righIconPress?: Function;
  leftIconStyle?: ImageStyle;
  extraTitleStyle?: TextStyle;
  extraContainerStyle?: ViewStyle;
}

/**
 *
 * @description Creating the CustomHeader Component
 */

export const CustomHeader = React.memo(function CustomHeader({
  title = '',
  leftIcon,
  rightIcon,
  leftIconStyle,
  extraTitleStyle,
  extraContainerStyle,
  leftIconPress = () => {},
  righIconPress = () => {},
}: Props) {
  return (
    <View style={[styles.parentContainer, extraContainerStyle]}>
      {leftIcon ? (
        <TouchableOpacity onPress={() => leftIconPress()}>
          <Image
            source={leftIcon}
            resizeMode="contain"
            style={[styles.leftIconStyle, leftIconStyle]}
          />
        </TouchableOpacity>
      ) : (
        <View />
      )}
      <Text
        numberOfLines={1}
        ellipsizeMode="clip"
        style={[styles.title, extraTitleStyle]}>
        {title}
      </Text>
      {rightIcon ? (
        <TouchableOpacity onPress={() => righIconPress()}>
          <Image
            source={rightIcon}
            resizeMode="contain"
            style={styles.rightIconStyle}
          />
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
});

/**
 *
 * @description Defining styles for CustomHeader Component
 */
const styles = StyleSheet.create({
  title: {
    fontWeight: '600',
    fontSize: normalize(20),
    marginHorizontal: normalize(30),
  },
  leftIconStyle: {
    width: normalize(20),
    height: normalize(20),
  },
  rightIconStyle: {
    width: normalize(20),
    height: normalize(20),
  },
  parentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: normalize(50),
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
  },
});
