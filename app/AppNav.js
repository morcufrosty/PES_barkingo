import {createStackNavigator, createAppContainer} from 'react-navigation';
import Register from "./Components/register";
import Login from "./Components/login"


const MainNavigator = createStackNavigator({
  Register: {screen: Register},
  Login: {screen: Login},

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
