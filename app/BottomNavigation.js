import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Settings from "./Components/settings";
import Chat from "./Components/chat"
import swipeScreen from "./Components/swipeScreen"


const TabNavigator = createBottomTabNavigator({
  Swipe: {screen: swipeScreen},
  Settings: {screen: Settings},
  Chat: {screen: Chat}
});


const BottomNavigation = createAppContainer(TabNavigator);

export default BottomNavigation;
