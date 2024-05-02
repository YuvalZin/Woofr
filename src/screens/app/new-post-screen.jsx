import React, { useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

//Create a random UUID
import uuid from "react-native-uuid";

//Redux handler state management
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";

//Import image picker
import * as ImagePicker from "expo-image-picker";

//Snack bar to show user information
import { Snackbar } from "react-native-paper";

//Api handler from different files
import { uploadImage } from "../../utils/api/image";
import { insertPost } from "../../utils/api/posts";

//Importing app color palate
import { colorPalate } from "../../utils/ui/colors";

//Custom components
import GoBackButton from "../../components/buttons/go-back/go-back-button";
import RegularButton from "../../components/buttons/regular-button/regular-button";
import LoadingIndicator from "../../components/animation/loading-indicator/loading-indicator";
import BigTextBold from "../../components/texts/big-text/big-text-bold";

const NewPostScreen = () => {
  //Navigation handler
  const navigation = useNavigation();

  // Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  //State to store post data
  const [post, setPost] = useState({
    id: uuid.v4().toString(),
    userId: myUser.id,
    content: "",
    createdAt: new Date(),
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

  // Function to handle Snackbar
  const showSnackbar = (message, duration) => {
    setSnackBarText(message);
    setSnackbarOpen(true);

    // Close the snackbar after the specified duration
    setTimeout(() => {
      setSnackbarOpen(false);
    }, duration);
  };

  // Updated uploadPost function
  const uploadPost = async () => {
    Keyboard.dismiss();

    if (post.content.length < 10) {
      showSnackbar("פוסט חייב להכיל לפחות 10 תווים", 3000);
      return;
    }

    // Set the screen to loading state
    setLoading(true);

    var imgLink = "null";

    if (selectedImage) {
      imgLink = await uploadImage(
        selectedImage,
        `posts/${myUser.id}/${post.id}`
      );
    }

    const newPost = {
      id: post.id,
      content: post.content,
      userId: post.userId,
      mediaUrl: imgLink,
      createdAt: post.createdAt,
    };

    //API post method to upload the image
    const res = await insertPost(newPost);

    if (res) {
      showSnackbar("הפוסט עלה בהצלחה", 1500);
      navigation.goBack();
    } else {
      setLoading(false);
      showSnackbar("משהו לא עבד נסה שוב", 3000);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView style={styles.container}>
          <View style={styles.header}>
            <GoBackButton
              onPress={() => {
                navigation.goBack();
              }}
            />
            <View>
              <BigTextBold text={"צור פוסט חדש"} />
            </View>
          </View>
          {!loading ? (
            <>
              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInput}
                  multiline
                  placeholder="הזן תוכן לפוסט..."
                  value={post.content}
                  onChangeText={(value) => setPost({ ...post, content: value })}
                />
                {selectedImage && (
                  <View style={styles.imagePreview}>
                    <Image
                      source={{ uri: selectedImage }}
                      style={styles.previewImage}
                    />
                  </View>
                )}
              </View>

              <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                  <RegularButton
                    text={"בחר תמונה"}
                    onPress={pickImage}
                    color={colorPalate.primaryLight}
                    iconName={"image"}
                  />
                </View>

                <View style={styles.buttonContainer}>
                  <RegularButton
                    text={"פרסם"}
                    onPress={uploadPost}
                    color={colorPalate.primary}
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
        </KeyboardAvoidingView>
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
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    padding: 8,
    width: "100%",
    alignItems: "center",
  },
  textInputContainer: {
    borderColor: "#e8e8e8",
    borderRadius: 5,
    borderWidth: 2,
    width: "95%",
    padding: 12,
  },
  textInput: {
    height: 150,
    textAlign: "right",
    padding: 3,
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",

    gap: 30,
    padding: 12,
    marginTop: 10,
  },

  previewImage: {
    width: "100%",
    height: 200,
    borderRadius: 5,
  },
});

export default NewPostScreen;
