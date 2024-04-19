import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, TextInput, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

//Create a random UUID
import uuid from "react-native-uuid";

//Import image picker
import * as ImagePicker from "expo-image-picker";

//Snack bar to show user information
import { Snackbar } from "react-native-paper";

//Fire store config
import { imageDB } from "../../utils/api/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

//Custom components
import GoBackButton from "../../components/buttons/go-back/go-back-button";
import BigText from "../../components/texts/big-text/big-text";
import RegularButton from "../../components/buttons/regular-button/regular-button";
import LoadingIndicator from "../../components/animation/loading-indicator/loading-indicator";

import { colorPalate } from "../../utils/ui/colors";

const NewPostScreen = () => {
  //Navigation handler
  const navigation = useNavigation();

  //State to store post data
  const [post, setPost] = useState({
    id: uuid.v4().toString(),
    ownerEmail: "",
    text: "",
    img: "",
    timestamp: new Date(),
  });

  //State to store image
  const [selectedImage, setSelectedImage] = useState(null);

  //State to show loading screen when action occur
  const [loading, setLoading] = useState(false);

  // State for storing text to be displayed in the and visibility of the snackbar
  const [snackBarText, setSnackBarText] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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
      setSelectedImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (selectedImage) {
      // Create a reference to the Firebase Storage location where you want to store the image
      const storageRef = ref(imageDB, `posts/${post.id}`);

      try {
        // Convert the image URI to a Blob
        const response = await fetch(selectedImage);
        const blob = await response.blob();

        // Upload the image blob to Firebase Storage
        await uploadBytes(storageRef, blob);

        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(storageRef);

        if (downloadURL) {
          return downloadURL;
        } else {
          return null;
        }
      } catch (error) {
        console.error("Error uploading image: ", error);
        // Handle any errors that occur during the upload process
      }
    }
  };

  const moveBack = () => {
    navigation.goBack();
  };

  const uploadPost = async () => {
    if (post.text.length < 10) {
      setSnackBarText("פוסט חייב להכיל לפחות 10 תווים");
      setSnackbarOpen(true);
      // Close the snackbar after 3 seconds
      setTimeout(() => {
        setSnackbarOpen(false);
      }, 3000);
      return;
    }

    setLoading(true);
    const imgLink = await uploadImage();
    if (imgLink) {
      setPost({ ...post, img: imgLink });
    }
    //Some api post method to upload the image
    const req = true;

    if (req) {
      setSnackBarText("הפוסט עלה בהצלחה");
      setSnackbarOpen(true);
      // Close the snackbar after 3 seconds
      setTimeout(() => {
        setSnackbarOpen(false);
      }, 1500);
      moveBack();
    } else {
      setLoading(false);
      setSnackBarText("משהו לא עבד נסה שוב");
      setSnackbarOpen(true);
      // Close the snackbar after 3 seconds
      setTimeout(() => {
        setSnackbarOpen(false);
      }, 3000);
      return;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <GoBackButton onPress={moveBack} />

        <View style={styles.header}>
          <BigText text={"צור פוסט חדש"} />
        </View>

        {!loading ? (
          <>
            <View style={styles.textInputContainer}>
              {selectedImage && (
                <View style={styles.imagePreview}>
                  <Image
                    source={{ uri: selectedImage }}
                    style={styles.previewImage}
                  />
                </View>
              )}

              <TextInput
                style={styles.textInput}
                multiline
                placeholder="הזן תוכן לפוסט..."
                value={post.text}
                onChangeText={(value) => setPost({ ...post, text: value })}
              />
            </View>

            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <RegularButton
                  text={"בחר תמונה"}
                  onPress={pickImage}
                  color={colorPalate.primary}
                  iconName={"camera-outline"}
                />
              </View>

              <View style={styles.buttonContainer}>
                <RegularButton
                  text={"העלאה"}
                  onPress={uploadPost}
                  color={colorPalate.primary}
                  iconName={"cloud-upload-outline"}
                />
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
          </>
        ) : (
          <LoadingIndicator />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    padding: 8,
    width: "100%",
    alignItems: "flex-end",
  },
  textInputContainer: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 12,
    width: "95%",
    padding: 12,
  },
  textInput: {
    height: 100,
    fontSize: 16,
    textAlign: "right",
    padding: 3,
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 30,
    padding: 12,
    marginTop: 10,
  },
  buttonContainer: {
    width: 180,
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});

export default NewPostScreen;
