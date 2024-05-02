//Navigation handlers
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import icons from Expo
import { MaterialCommunityIcons } from "@expo/vector-icons";

//Stack navigation
import chatStack from "./chat-stack";
import HomeStack from "./home-stack";
import ProfileStack from "./profile-stack";
import SearchStack from "./search-stack";

//Create Bottom tab navigation
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const iconSize = 26;

  return (
    <Tab.Navigator
    
      initialRouteName="home-stack"
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          color: "black",
          fontSize: 15,
        },
      }}
    >
      <Tab.Screen
        name="home-stack"
        component={HomeStack}
        options={{
          tabBarLabel: "בית",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={iconSize} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="chat-stack"
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
        name="search-stack"
        component={SearchStack}
        options={{
          tabBarLabel: "חיפוש",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="search-web"
              size={iconSize}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="profile-stack"
        component={ProfileStack}
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
