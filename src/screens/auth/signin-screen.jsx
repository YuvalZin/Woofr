import React, { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";

//Navigation handler
import { useNavigation } from "@react-navigation/native";

//Store package for react native expo
import * as SecureStore from "expo-secure-store";

// Importing the Snackbar component from the react-native-paper library
import { Snackbar } from "react-native-paper";

//Redux handler state management
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";

//Importing functions from the user API file
import { loginUser, GetUserData } from "../../utils/api/user";

//Importing app color palate
import { colorPalate } from "../../utils/ui/colors";

//Custom components
import BigText from "../../components/texts/big-text/big-text";
import RegularButton from "../../components/buttons/regular-button/regular-button";
import RegularText from "../../components/texts/regular-text/regular-text";
import CustomTextInput from "../../components/inputs/custom-text-input/custom-text-input";
import PasswordInput from "../../components/inputs/password-input/password-input";

const SigninScreen = () => {
  // Importing the useNavigation hook from React Navigation to access navigation prop
  const navigation = useNavigation();

  // Importing the useDispatch hook from react-redux to dispatch actions
  const dispatch = useDispatch();

  //State to store the login data
  const [loginData, setLoginData] = useState({
    email: "beny@gmail.com",
    password: "Aa123456",
  });

  // State for managing the snackbar: storing text content to be displayed and controlling visibility
  const [snackBarText, setSnackBarText] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  //Width for the form
  const formWidth = 290;

  // Function to handle the login event
  const handleLoginEvent = async () => {
    try {
      // Attempt to authenticate the user and retrieve a token
      const token = await loginUser(loginData);
      if (token) {
        // If a token is received, store it securely
        SecureStore.setItem("token", token);

        // Retrieve user data using the token and dispatch login action
        const userData = await GetUserData(token);
        dispatch(login(JSON.stringify(userData)));
      } else {
        // If authentication fails, display a snackbar with an error message
        setSnackbarOpen(true);
        setSnackBarText("סיסמא או איימל לא נכונים");

        // Close the snackbar after 3 seconds
        setTimeout(() => {
          setSnackbarOpen(false);
        }, 3000);
      }
    } catch (error) {
      // Log any errors that occur during the process
      console.error("Error saving token:", error);
    }
  };

  // Function to navigate to the Signup screen
  const moveToSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.header}>
          <BigText text={"היי כיף לראות שחזרת"} />
          <RegularText
            text={
              "אנחנו פה בשביל חיות המחמד שלך בלה בלה בלה להמשיך לעשות כיף פה"
            }
          />
        </View>

        <View>
          <CustomTextInput
            value={loginData.email}
            placeholder="איימל"
            style={styles.input}
            english={true}
            onChangeText={(value) => {
              setLoginData({ ...loginData, email: value });
            }}
          />
          <PasswordInput
            value={loginData.password}
            placeholder="סיסמא"
            style={[styles.input, { textAlign: "right" }]}
            width={formWidth}
            onChangeText={(value) => {
              setLoginData({ ...loginData, password: value });
            }}
          />
        </View>

        <View>
          <View style={{ width: 200 }}>
            <RegularButton
              text={"התחבר"}
              onPress={handleLoginEvent}
              color={colorPalate.primary}
              iconName={"log-in-outline"}
            />
          </View>
          <View style={styles.divider}></View>
          <View style={{ width: 200 }}>
            <RegularButton
              text={"הירשם"}
              onPress={moveToSignup}
              color={colorPalate.primary}
              iconName={"person-add-outline"}
            />
          </View>
        </View>
      </View>

      <Snackbar
        visible={snackbarOpen}
        onDismiss={() => {}}
        action={{
          label: "סגור",
          onPress: () => {
            setSnackbarOpen(false);
          },
        }}
      >
        {snackBarText}
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  header: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    direction: "rtl",
    textAlign: "left",
    paddingRight: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,

    marginVertical: 5,
    width: 300,
  },
  divider: {
    backgroundColor: "grey",
    height: 1,
    marginVertical: 10,
  },
});

export default SigninScreen;
