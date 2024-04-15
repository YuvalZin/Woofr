//auth-navigation.jsx

// Navigation handlers
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import WelcomeScreen from "../screens/auth/welcome-screen";
import SigninScreen from "../screens/auth/signin-screen";
import SignupScreen from "../screens/auth/signup-screen";
import ImageScreen from "../screens/auth/image-screen";

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Welcome"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Image" component={ImageScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
