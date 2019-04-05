import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import Register from "./Components/register";
import Login from "./Components/login"
import swipeScreen from "./Components/swipeScreen"
import Ionicons from 'react-native-vector-icons/Ionicons';
//import AppAfterLogin from "./AppAfterLogin"

import Icon from 'react-native-vector-icons/FontAwesome';
import Settings from "./Components/settings";
import Chat from "./Components/chat"
import perfilAnimal from "./Components/perfilAnimal"
import formNewOffer from "./Components/formNewOffer"


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
    },
  Settings: {
    screen: Settings
  },

  formNewOffer: {
    screen: formNewOffer
  }
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
