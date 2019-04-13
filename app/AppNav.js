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

const SettingsNavigator = createStackNavigator({

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
       tabBarLabel:"SWIPE",
       tabBarIcon: ({ tintColor }) => (
         <Icon name="share" size={25} color="#F15A24" />
       )
     },
    },
  Settings: {
    screen: SettingsNav,
    navigationOptions: {
       tabBarLabel:"PROFILE",
       tabBarIcon: ({ tintColor }) => (
         <Icon name="user" size={25} color="#F15A24" />
       )
     },
  },

  chat: {
    screen: Chat,
    navigationOptions: {
       tabBarLabel:"CHATS",
       tabBarIcon: ({ tintColor }) => (
         <Icon name="comment" size={25} color="#F15A24" />
       )
     },
  }
},
{
tabBarOptions: {
  showIcon: true
},}
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
