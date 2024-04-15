//image-screen.tsx

import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
} from "react-native";

//Import image picker
import * as ImagePicker from "expo-image-picker";

//Store user data handler
import * as SecureStore from "expo-secure-store";

//Redux handler state management
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";

//Custom components
import BigText from "../../components/texts/big-text/big-text";
import RegularText from "../../components/texts/regular-text/regular-text";
import SmallText from "../../components/texts/small-text/small-text";
import RegularButton from "../../components/buttons/regular-button/regular-button";
import { fakeLoginWithToken } from "../../utils/api/fake";

const ImageScreen = ({}) => {
  //State to save the image
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const token = SecureStore.getItem("token");
      const req = await fakeLoginWithToken(token);
      if (req.status) {
        setUser(req.value);
      }
    };

    fetchData();
  }, []);

  const pickImage = async () => {
    // Launch the image library and await the result
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Specify that only images are allowed
      allowsEditing: true, // Allow the user to edit the selected image
      aspect: [4, 3], // Set the aspect ratio for the cropped image
      quality: 1, // Set the quality of the selected image
    });

    // Check if the user canceled the image selection
    if (!result.canceled) {
      // If the image selection was not canceled, set the image URI in state
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) return;

    try {
      // Fetch the image data
      const response = await fetch(image);
      const blob = await response.blob();

      // Convert blob to base64 string
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64data = reader.result;
        // Save base64 data to SQL table
      };
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const skipImageUpload = () => {
    dispatch(login(user));
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
          <RegularButton text={"הוסף"} onPress={uploadImage} />
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
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
  imagePreview: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  skip: {
    marginVertical: 13,
  },
});

export default ImageScreen;
