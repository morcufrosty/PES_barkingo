import {createStackNavigator, createAppContainer} from 'react-navigation';
import Register from "./Components/register";
import Login from "./Components/login"
import GoogleLogin from "./Components/googleLogin"


const MainNavigator = createStackNavigator({
  Register: {screen: Register},
  Login: {screen: Login},
  GoogleLogin: {screen: GoogleLogin}

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
