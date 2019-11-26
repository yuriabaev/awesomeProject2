/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React  from 'react'
import { Root } from "native-base";
import HomeScreen from './src/Screens/HomeScreen'
import Settings from './src/Screens/Settings'


import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Settings: {screen: Settings},
},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  });

const App = createAppContainer(MainNavigator);

export default () =>
  <Root>
    <App />
  </Root>;