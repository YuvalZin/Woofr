//app-navigation.jsx

//Navigation handlers
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import icons from Expo
import { MaterialCommunityIcons } from "@expo/vector-icons";

//Screens
import HomeScreen from "../screens/app/home-screen";
import ProfileScreen from "../screens/app/profile-screen";
import ChatScreen from "../screens/app/chat-screen";

//Create Bottom tab navigation
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const iconColor = "#565AC8";
  const iconSize = 26;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          color: "black",
          fontSize: 14,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="home"
              color={iconColor}
              size={iconSize}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatScreen}
        options={{
          tabBarLabel: "Chats",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="message"
              color={iconColor}
              size={iconSize}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="account"
              color={iconColor}
              size={iconSize}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
