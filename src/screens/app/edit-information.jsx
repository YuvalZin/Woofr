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
import { selectAuth } from "../../redux/authSlice";

//Snack bar to show user information
import { Snackbar } from "react-native-paper";

//Import app color palate
import { colorPalate } from "../../utils/ui/colors";

//Import image picker
import * as ImagePicker from "expo-image-picker";

//Fire store config
import { imageDB } from "../../utils/api/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

//Custom components
import GoBackButton from "../../components/buttons/go-back/go-back-button";
import BigText from "../../components/texts/big-text/big-text";
import CustomTextInput from "../../components/inputs/custom-text-input/custom-text-input";
import PasswordInput from "../../components/inputs/password-input/password-input";
import RegularButton from "../../components/buttons/regular-button/regular-button";
import RegularText from "../../components/texts/regular-text/regular-text";
import LoadingIndicator from "../../components/animation/loading-indicator/loading-indicator";

import { uploadImageURL } from "../../utils/api/user";

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

  // Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);
  const [userData, setUserData] = useState({
    firstName: myUser.firstName,
    lastName: myUser.lastName,
    email: myUser.email,
    password: myUser.password,
    profileImage: myUser.profileImage,
  });

  const uploadImage = async () => {
    if (image) {
      // Create a reference to the Firebase Storage location where you want to store the image
      const storageRef = ref(imageDB, `profile/${myUser.id}`);

      try {
        // Convert the image URI to a Blob
        const response = await fetch(image);
        const blob = await response.blob();

        // Upload the image blob to Firebase Storage
        await uploadBytes(storageRef, blob);

        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(storageRef);

        if (downloadURL) {
          return downloadURL;
        }
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    }
    return null;
  };

  // Function to move back using navigation.goBack()
  const moveBack = () => {
    navigation.goBack();
  };

  const handelUpdate = async () => {
    setLoading(true);

    if (image) {
      const url = await uploadImage();
      const updatedProfile = await uploadImageURL(myUser.id, url);
    }

    // Add API call instead
    const req = true;

    setTimeout(() => {
      if (req) {
        navigation.goBack();
      } else {
        setLoading(false);
        setSnackBarText("פוסט חייב להכיל לפחות 10 תווים");
        setSnackbarOpen(true);
      }
    }, 2000);
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
              <CustomTextInput
                value={userData.email}
                placeholder="איימל"
                width={formWidth}
                onChangeText={(value) => {
                  setUserData({ ...userData, email: value });
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
