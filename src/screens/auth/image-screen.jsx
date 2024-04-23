//image-screen.tsx

import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
} from "react-native";

import { imageDB } from "../../utils/api/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

  const uploadImage = async () => {
    if (image) {
      const id = SecureStore.getItem("id");
      SecureStore.deleteItemAsync("id");
      // Create a reference to the Firebase Storage location where you want to store the image
      const storageRef = ref(imageDB, `profile/${id}`);

      try {
        // Convert the image URI to a Blob
        const response = await fetch(image);
        const blob = await response.blob();

        // Upload the image blob to Firebase Storage
        await uploadBytes(storageRef, blob);

        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(storageRef);

        if (downloadURL) {
          const updatedProfile = await uploadImageURL(id, downloadURL);
          if (updatedProfile) {
            dispatch(login(JSON.stringify(updatedProfile))); // Update user state in Redux
          }
        }
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    }
  };

  // Function to skip image upload for a user
  const skipImageUpload = async () => {
    // Uploads a null image URL for the user
    const user = await uploadImageURL(id, null);
    // If user exists (image upload successful), dispatch login action
    if (user) {
      dispatch(login(JSON.stringify(user)));
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
            onPress={uploadImage}
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
