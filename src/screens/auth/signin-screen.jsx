// SigninScreen.js
import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
//Navigation handler
import { useNavigation } from "@react-navigation/native";
//Store package for react native expo
import * as SecureStore from "expo-secure-store";
//Custom components
import BigText from "../../components/texts/big-text/big-text";
import RegularButton from "../../components/buttons/regular-button/regular-button";
import RegularText from "../../components/texts/regular-text/regular-text";
//Redux handler state management
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { Snackbar } from "react-native-paper";
import { loginUser, GetUserData } from "../../utils/api/user";
import { colorPalate } from "../../utils/ui/colors";

const SigninScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    email: "benyyoulove@gmail.com",
    password: "Aa123456",
  });

  // State for managing the snackbar: storing text content to be displayed and controlling visibility
  const [snackBarText, setSnackBarText] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleLoginEvent = async () => {
    try {
      const token = await loginUser(loginData);
      if (token) {
        SecureStore.setItem("token", token); // Store the JSON string
        const userData = await GetUserData(token);
        dispatch(login(JSON.stringify(userData)));
      } else {
        // Close the snackbar after 3 seconds
        setSnackbarOpen(true);
        setSnackBarText("סיסמא או איימל לא נכונים");
        setTimeout(() => {
          setSnackbarOpen(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error saving token:", error);
    }
  };

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
          <TextInput
            value={loginData.email}
            placeholder="איימל"
            style={styles.input}
            onChangeText={(value) => {
              setLoginData({ ...loginData, email: value });
            }}
          />
          <TextInput
            value={loginData.password}
            placeholder="סיסמא"
            style={styles.input}
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
