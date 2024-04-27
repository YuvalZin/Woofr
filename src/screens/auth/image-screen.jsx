//image-screen.tsx

import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
  Alert,
} from "react-native";

//Import image picker
import * as ImagePicker from "expo-image-picker";

//Store user data handler
import * as SecureStore from "expo-secure-store";

//Importing app color palate
import { colorPalate } from "../../utils/ui/colors";

//Redux handler state management
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";

//Importing function from the user API file
import { uploadImageURL } from "../../utils/api/user";
import { uploadImage } from "../../utils/api/image";

//Custom components
import BigText from "../../components/texts/big-text/big-text";
import RegularText from "../../components/texts/regular-text/regular-text";
import SmallText from "../../components/texts/small-text/small-text";
import RegularButton from "../../components/buttons/regular-button/regular-button";

const ImageScreen = ({}) => {
  //State to save the image
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

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

  const addImage = async () => {
    if (image) {
      const id = SecureStore.getItem("id");

      // Get the download URL of the uploaded image
      const downloadURL = await uploadImage(image, `profile/${id}`);

      if (downloadURL) {
        const updatedProfile = await uploadImageURL(id, downloadURL);
        if (updatedProfile) {
          SecureStore.deleteItemAsync("id");
          dispatch(login(JSON.stringify(updatedProfile)));
        } else {
          Alert.alert("משהו השתבש", "הייתה בעיה לעלות את התמונה", [
            {
              text: "שחרר",
              style: "cancel",
            },
          ]);
        }
      }
    } else {
      Alert.alert("חסרה תמונה", "על מנת לעלות תמונה צריך לבחור קודם תמונה", [
        {
          text: "שחרר",
          style: "cancel",
        },
      ]);
    }
  };

  // Function to skip image upload for a user
  const skipImageUpload = async () => {
    // Retrieve and delete user ID from SecureStore
    const id = SecureStore.getItem("id");

    // Default image URL in case of skipping image upload
    const noImage =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

    // Upload default image URL to update user's profile
    const updatedProfile = await uploadImageURL(id, noImage);

    //Remove user id from secure store
    SecureStore.deleteItemAsync("id");

    // Check if profile update was successful
    if (updatedProfile) {
      // Update user state in Redux
      dispatch(login(JSON.stringify(updatedProfile)));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.header}>
          <BigText text={"כותרת של הדף"} />
          <RegularText
            text={"תיאור קצר שמפרט על הדף ולמה להוסיף תמונה חשוב ביותר "}
          />
        </View>

        {image ? (
          <TouchableOpacity onPress={pickImage}>
            <Image source={{ uri: image }} style={styles.imagePreview} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.circle} onPress={pickImage}>
            <RegularText text={"בחר תמונה"} />
          </TouchableOpacity>
        )}

        <View style={styles.buttonContainer}>
          <RegularButton
            color={colorPalate.primary}
            text={"הוסף"}
            onPress={addImage}
          />
          <TouchableOpacity onPress={skipImageUpload} style={styles.skip}>
            <SmallText text={"דלג"} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    direction: "rtl",
    textAlign: "left",
    paddingRight: 20,
    paddingBottom: 20,
  },
  circle: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: colorPalate.white,
    borderColor: colorPalate.primary,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePreview: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderColor: colorPalate.primary,
    borderWidth: 1,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
  },
  skip: {
    marginVertical: 13,
  },
});

export default ImageScreen;
