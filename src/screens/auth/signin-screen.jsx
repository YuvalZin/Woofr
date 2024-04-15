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

import { fakeLogin } from "../../utils/api/fake";
import { Snackbar } from "react-native-paper";

const SigninScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    email: "amandawilson@example.com",
    password: "world123",
  });

  // State for managing the snackbar: storing text content to be displayed and controlling visibility
  const [snackBarText, setSnackBarText] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleLoginEvent = async () => {
    try {
      const token = await fakeLogin(loginData.email, loginData.password);
      if (token.status) {
        SecureStore.setItem("token5", token.value);
        dispatch(login(token));
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
          <RegularButton text={"התחבר"} onPress={handleLoginEvent} />
          <View style={styles.divider}></View>
          <RegularButton text={"הירשם"} onPress={moveToSignup} />
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
