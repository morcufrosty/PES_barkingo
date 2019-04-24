import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import Register from "./Components/register";
import Login from "./Components/login"
import swipeScreen from "./Components/swipeScreen"
import Ionicons from 'react-native-vector-icons/Ionicons';
//import AppAfterLogin from "./AppAfterLogin"
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Settings from "./Components/settings";
import Chat from "./Components/chat"
import perfilAnimal from "./Components/perfilAnimal"
import formNewOffer from "./Components/formNewOffer"
import TabIcon from './TabIcon';

const SettingsNavigator = createStackNavigator({
  LoginScreen:{screen: Login},

    SettingsScreen:{screen: Settings},
    formNewOffer: {
      screen: formNewOffer
    }},
    {
      initialRouteName: 'SettingsScreen',
      headerMode: 'none',
      navigationOptions: {
          headerVisible: false,
      }

});

const SettingsNav = createAppContainer(SettingsNavigator);



const SwipeNavigator = createStackNavigator({

    SwipeScreen:{screen: swipeScreen},
    perfilAnimal:{screen: perfilAnimal}},
    {
      initialRouteName: 'SwipeScreen',
      headerMode: 'none',
      navigationOptions: {
          headerVisible: false,
      }

});

const SwipeNav = createAppContainer(SwipeNavigator);

const TabNavigator = createBottomTabNavigator(
  {
  Swipe: {
    screen: SwipeNav,
    navigationOptions: {
       tabBarLabel:"",
       tabBarIcon: ({ focused, tintColor }) => (
         <TabIcon
             iconDefault='paw'
             iconFocused='paw'
             focused={focused}
             tintColor={tintColor}
         />
       )
     },
    },
  Settings: {
    screen: SettingsNav,
    navigationOptions: {
       tabBarLabel:"",
       tabBarIcon: ({focused, tintColor }) => (
         <TabIcon
             iconDefault='user'
             iconFocused='user'
             focused={focused}
             tintColor={tintColor}
         />
       )
     },
  },

  chat: {
    screen: Chat,
    navigationOptions: {
       tabBarLabel:"",
       tabBarIcon: ({focused, tintColor }) => (
         <TabIcon
             iconDefault='comment'
             iconFocused='comment'
             focused={focused}
             tintColor={tintColor}
         />       )
     },
  }
},
{
tabBarOptions: {
  showLabel: false,
  showIcon: true,
  activeTintColor: "#F15A24",
  inactiveTintColor: "#858585",
},

}
);


const BottomNavigation = createAppContainer(TabNavigator);

const MainNavigator = createStackNavigator({
  Register: {screen: Register},
  Login: {screen: Login},
  AppAfterLogin:{screen: BottomNavigation}
},
{
  initialRouteName: 'Login',
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  }
});

const AppNav = createAppContainer(MainNavigator);

export default AppNav;
