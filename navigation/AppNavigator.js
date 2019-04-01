import React from 'react';
import { Platform } from 'react-native';
import {
  createBottomTabNavigator,
  createAppContainer,
  createMaterialTopTabNavigator,
  createStackNavigator,
} from 'react-navigation';

import { TabBarIcon } from '../components';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import { theme, defaultNavigation } from '../theme';

const router = {
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ focused }) => Platform.OS === 'ios' && <TabBarIcon name="ios-home" focused={focused} />,
    },
  },
  NewDeck: {
    screen: LinksScreen,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ focused }) => Platform.OS === 'ios' && <TabBarIcon name="ios-add-circle" focused={focused} />,
    },
  },
};

const navigationOptions = {
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    animationEnabled: true,
    activeTintColor: Platform.OS === 'ios' ? theme.colors.purple : theme.colors.white,
    indicatorStyle: {
      backgroundColor: theme.colors.white,
      height: 4,
    },
    labelStyle: {
      fontSize: 16,
      fontFamily: 'product-sans',
      fontWeight: '200',
    },
    style: {
      height: Platform.OS === 'ios' ? 60 : 'auto',
      paddingTop: Platform.OS !== 'ios' ? 20 : 'auto',
      backgroundColor: Platform.OS === 'ios' ? theme.colors.white : theme.colors.purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 8,
      shadowOpacity: 1,
    },
  },
};

export default createAppContainer(
  createStackNavigator({
    Home: {
      screen:
        Platform.OS === 'ios'
          ? createBottomTabNavigator(router, navigationOptions)
          : createMaterialTopTabNavigator(router, navigationOptions),
    },
    Links: {
      screen: LinksScreen,
      navigationOptions: {
        title: 'Deck',
        ...defaultNavigation,
      },
    },
  })
);
