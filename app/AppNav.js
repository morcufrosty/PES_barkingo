import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import Register from "./Components/register";
import Login from "./Components/login"
import GoogleLogin from "./Components/googleLogin"
import swipeScreen from "./Components/swipeScreen"
import AppAfterLogin from "./AppAfterLogin"

import Icon from 'react-native-vector-icons/FontAwesome';



const TabNavigator = createBottomTabNavigator({
  Swipe: {screen: swipeScreen},

});


const BottomNavigation = createAppContainer(TabNavigator);

const MainNavigator = createStackNavigator({
  Register: {screen: Register},
  Login: {screen: Login},
  GoogleLogin: {screen: GoogleLogin},
  Swipe: {screen: swipeScreen},
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
