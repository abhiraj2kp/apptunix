import React, {Component} from 'react';
import {Images, Colors} from '../../constants';
import RouteName from '../../../src/navigator/RouteName';
import {View, StyleSheet, Animated, StatusBar} from 'react-native';

/**
 *
 * @description Defining all required props
 */
interface Props {
  navigation: any;
}

/**
 *
 * @description Defining internal state
 */
interface State {
  animatedValue: Animated.Value;
}

/**
 * @class SplashScreen
 * @description Creating SplashScreen Component
 */
export class SplashScreen extends Component<Props, State> {
  /**
   * @param props
   * @description Initilizing the states value.
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      animatedValue: new Animated.Value(0),
    };
  }

  /**
   *
   * @description Mounting phase, Start animation.
   * @memberof Splash
   */

  componentDidMount() {
    this.startAnimation();
  }

  /**
   * @function startAnimation
   * @description Initilize an animation and start.
   */
  startAnimation = () => {
    Animated.timing(this.state.animatedValue, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        this.props.navigation.navigate(RouteName.Stack.HomeStack);
      }, 1500);
    });
  };
  render() {
    /** creating animation style for scaling image size*/
    const scaleImage = this.state.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [50, 100, 200],
    });

    const logoStyle = [
      styles.imageStyle,
      {
        width: scaleImage,
        height: scaleImage,
        opacity: this.state.animatedValue,
      },
    ];
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.transparent}
        />
        <Animated.Image source={Images.apptunixIcon} style={logoStyle} />
      </View>
    );
  }
}

/**
 *
 * @description Defining styles for Splash screen
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  imageStyle: {resizeMode: 'contain'},
});
