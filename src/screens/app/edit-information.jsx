import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

//Redux state management
import { useSelector } from "react-redux";
import { login, selectAuth } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

//Snack bar to show user information
import { Snackbar } from "react-native-paper";

//Import app color palate
import { colorPalate } from "../../utils/ui/colors";

//Store user data handler
import * as SecureStore from "expo-secure-store";

//Import image picker
import * as ImagePicker from "expo-image-picker";

//Custom components
import GoBackButton from "../../components/buttons/go-back/go-back-button";
import BigText from "../../components/texts/big-text/big-text";
import CustomTextInput from "../../components/inputs/custom-text-input/custom-text-input";
import PasswordInput from "../../components/inputs/password-input/password-input";
import RegularButton from "../../components/buttons/regular-button/regular-button";
import RegularText from "../../components/texts/regular-text/regular-text";
import LoadingIndicator from "../../components/animation/loading-indicator/loading-indicator";

//Importing function from the API file
import { editProfile, GetUserData, uploadImageURL } from "../../utils/api/user";
import { uploadImage } from "../../utils/api/image";

const EditInformation = () => {
  //Set state to store image
  const [image, setImage] = useState(null);

  // State for storing text to be displayed in the and visibility of the snackbar
  const [snackBarText, setSnackBarText] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  //State to show loading screen when action occur
  const [loading, setLoading] = useState(false);

  // Importing the useNavigation hook from React Navigation to access navigation prop
  const navigation = useNavigation();

  //Width for the form
  const formWidth = 290;

  // Use useSelector to access the Redux store state
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);
  const [userData, setUserData] = useState({
    firstName: myUser.firstName,
    lastName: myUser.lastName,
    password: myUser.password,
    profileImage: myUser.profileImage,
  });

  const pickImage = async () => {
    // Launch the image library and await the result
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // Check if the user canceled the image selection
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Function to move back using navigation.goBack()
  const moveBack = () => {
    navigation.goBack();
  };

  // Function to handle Snackbar
  const showSnackbar = (message, duration) => {
    setSnackBarText(message);
    setSnackbarOpen(true);

    // Close the snackbar after the specified duration
    setTimeout(() => {
      setSnackbarOpen(false);
    }, duration);
  };

  const handelUpdate = async () => {
    setLoading(true);
    let updatedUser = {
      id: myUser.id,
      email: myUser.email,
      password: userData.password,
      gender: myUser.gender,
      profilePictureUrl: myUser.profilePictureUrl,
      birthday: myUser.birthday,
      firstName: userData.firstName,
      lastName: userData.lastName,
      token: myUser.token,
    };

    if (image) {
      const url = await uploadImage(image, `profile/${myUser.id}`);
      const imageUpdate = await uploadImageURL(myUser.id, url);

      if (!imageUpdate) {
        // If authentication fails, display a snackbar with an error message
        setLoading(false);
        showSnackbar("הייתה בעיה להעלות את התמונה", 3000);
        return;
      }

      // Update profilePictureUrl in updatedUser with the newly uploaded image URL
      updatedUser.profilePictureUrl = url;
    }

    const editRes = await editProfile(updatedUser);

    if (editRes) {
      const user = await GetUserData(SecureStore.getItem("token"));

      if (user) {
        dispatch(login(JSON.stringify(user)));
        moveBack();
      }
    } else {
      // If authentication fails, display a snackbar with an error message
      setLoading(false);
      showSnackbar("הייתה בעיה לעדכן את הפרופיל", 3000);
    }
  };

  const deleteUser = () => {
    setLoading(true);

    //Api call using to delete account
    //
    //

    // Delete the authentication token from SecureStore
    SecureStore.deleteItemAsync("token");
    // Dispatch the logout action to the Redux store
    setLoading(false);
    dispatch(logout());
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{ flex: 1 }}>
        {!loading ? (
          <KeyboardAvoidingView style={styles.container}>
            <GoBackButton onPress={moveBack} />
            <View style={styles.header}>
              <BigText text={"עדכן את הפרטים שלך"} />
            </View>
            <View style={styles.formScroll}>
              <View style={styles.circleContainer}>
                {image ? (
                  <TouchableOpacity onPress={pickImage}>
                    <Image
                      source={{ uri: image }}
                      style={styles.imagePreview}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.circle} onPress={pickImage}>
                    <RegularText text={"בחר תמונה"} />
                  </TouchableOpacity>
                )}
              </View>
              <CustomTextInput
                value={userData.firstName}
                placeholder="שם פרטי"
                width={formWidth}
                onChangeText={(value) => {
                  setUserData({ ...userData, firstName: value });
                }}
              />
              <CustomTextInput
                value={userData.lastName}
                placeholder="שם משפחה"
                width={formWidth}
                onChangeText={(value) => {
                  setUserData({ ...userData, lastName: value });
                }}
              />

              <PasswordInput
                value={userData.password}
                placeholder="סיסמא"
                width={formWidth}
                onChangeText={(value) => {
                  setUserData({ ...userData, password: value });
                }}
              />
            </View>
            <View style={styles.buttonContainer}>
              <RegularButton
                text={"עדכן"}
                color={colorPalate.primary}
                onPress={handelUpdate}
              />
            </View>

            <View style={styles.buttonContainer}>
              <RegularButton
                text={"מחיקת משתמש"}
                color={colorPalate.warning}
                onPress={deleteUser}
              />
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
          </KeyboardAvoidingView>
        ) : (
          <LoadingIndicator />
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    width: "100%",
    padding: 6,
  },
  formScroll: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
    padding: 8,
  },
  circleContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colorPalate.white,
    borderColor: colorPalate.primary,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: colorPalate.primary,
    borderWidth: 1,
  },
  buttonContainer: {
    marginTop: 10,
    width: 260,
  },
});

export default EditInformation;
