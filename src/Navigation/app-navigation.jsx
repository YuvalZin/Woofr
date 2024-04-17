//app-navigation.jsx

//Navigation handlers
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import icons from Expo
import { MaterialCommunityIcons } from "@expo/vector-icons";

//Screens
import HomeScreen from "../screens/app/home-screen";
import ProfileScreen from "../screens/app/profile-screen";

//Stack navigation
import chatStack from "./chat-stack";

//Create Bottom tab navigation
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const iconSize = 26;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          color: "black",
          fontSize: 15,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "בית",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={iconSize} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ChatsStack"
        component={chatStack}
        options={{
          tabBarLabel: "שיחות",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="message"
              size={iconSize}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "פרופיל",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account"
              size={iconSize}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
