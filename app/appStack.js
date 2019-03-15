import React from 'react';
import Register from "./Components/register";
import Login from "./Components/login"
import { createStackNavigator, createAppContainer}  from 'react-navigation';
import { StyleSheet, Text, View,
    ScrollView,
    TextInput,
    Button
}  from 'react-native';

const AppNavigator = createStackNavigator({
  RegisterScreen: { screen: Register },
  LoginScreen: { screen: Login }
});
  
const AppStack = createAppContainer(AppNavigator);

export default AppStack;
