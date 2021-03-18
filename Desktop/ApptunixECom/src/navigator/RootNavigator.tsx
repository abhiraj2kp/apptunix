import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import RouteName from './RouteName';
import {NavigationContainer} from '@react-navigation/native';
import {Cart, ProductListing, SplashScreen} from '../screens';

/**
 *
 * @description Creating stack navigator for Splash, Home, Root
 */
const RootStack = createStackNavigator();
const HomeStack = createStackNavigator();
const SplashStack = createStackNavigator();

/**
 *
 * @description Creating Splash navigaor
 * @function SplashNavigator
 */
const SplashNavigator = () => {
  return (
    <SplashStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
      headerMode="none"
      initialRouteName={RouteName.Screens.SplashScreen}>
      <SplashStack.Screen
        name={RouteName.Screens.SplashScreen}
        component={SplashScreen}
      />
    </SplashStack.Navigator>
  );
};

/**
 *
 * @description Creating Home navigaor for Home
 * @function HomeNavigator
 */

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      headerMode="none"
      screenOptions={{
        gestureEnabled: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      initialRouteName={RouteName.Screens.ProductListing}>
      <HomeStack.Screen
        component={ProductListing}
        name={RouteName.Screens.ProductListing}
      />
      <HomeStack.Screen component={Cart} name={RouteName.Screens.Cart} />
    </HomeStack.Navigator>
  );
};

/**
 *
 * @class RootNavigator
 * @description Creating Root Navigator for containing all navigators and screens
 * @function RootNavigator
 */

export class RootNavigator extends React.PureComponent {
  render() {
    return (
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            gestureEnabled: false,
          }}
          initialRouteName={RouteName.Stack.SplashStack}
          headerMode={'none'}>
          <RootStack.Screen
            component={SplashNavigator}
            name={RouteName.Stack.SplashStack}
          />
          <RootStack.Screen
            component={HomeNavigator}
            name={RouteName.Stack.HomeStack}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}
