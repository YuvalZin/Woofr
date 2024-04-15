//app-navigation.jsx

//Navigation handlers
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Screens
import HomeScreen from "../screens/app/home-screen";
import ProfileScreen from "../screens/app/profile-screen";

//Create Bottom tab navigation
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
