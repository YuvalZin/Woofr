import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

//Custom components
import BigText from "../../components/texts/big-text/big-text";
import RegularButton from "../../components/buttons/regular-button/regular-button";
import GoBackButton from "../../components/buttons/go-back/go-back-button";
import PostSlider from "../../components/scroll/posts-slider/post-slider";

import { users } from "../../utils/data/users";
import { posts } from "../../utils/data/posts";
import { colorPalate } from "../../utils/ui/colors";
import LoadingIndicator from "../../components/animation/loading-indicator/loading-indicator";

//Create a random UUID
import uuid from "react-native-uuid";

//Redux state management
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";

const UserProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params;

  // Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  const [userProfile, setUserProfile] = useState(null);

  // useEffect(() => {
  //   // Simulate fetching user data based on the userId
  //   // Replace this with your actual API call or data retrieval method
  //   const fetchUserData = async () => {
  //     // Example fetch from API
  //     // const response = await fetch(`https://api.example.com/users/${userId}`);
  //     // const data = await response.json();

  //     // Simulated data for testing
  //     const data = userData; // Replace with actual fetched data
  //     setUserProfile(data);
  //   };

  //   fetchUserData();
  // }, [userId]);

  useEffect(() => {
    users.forEach((user) => {
      if (user.email === email) {
        setUserProfile(user);
      }
    });
  }, []);

  const moveBack = () => {
    navigation.goBack();
  };
  const moveToChat = async () => {
    var chatData;

    //Do api read to see if there is chat already if use give it and skip the creation of new chat object

    const newId = await uuid.v4().toString();
    chatData = {
      id: newId,
      lastMessage: "",
      user1: userProfile.email,
      user2: myUser.email,
    };

    navigation.navigate("home-chat", { data: chatData });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GoBackButton onPress={moveBack} />
      {userProfile ? (
        <ScrollView style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: userProfile.img }}
              style={styles.profileImage}
            />
            <BigText
              text={`${userProfile.firstName} ${userProfile.lastName}`}
            />
          </View>

          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <RegularButton
                text={`עקוב`}
                width={120}
                color={colorPalate.primary}
                iconName={"person-add-outline"}
                onPress={() => {}}
              />
            </View>
            <View style={styles.buttonContainer}>
              <RegularButton
                text={"שלח הודעה"}
                width={120}
                color={colorPalate.primary}
                iconName={"mail-outline"}
                onPress={() => {
                  moveToChat(userProfile.email);
                }}
              />
            </View>
          </View>
          <PostSlider arr={posts} onImgPress={() => {}} />
        </ScrollView>
      ) : (
        <LoadingIndicator />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 160,
    height: 160,
    resizeMode: "cover",
    borderRadius: 80,
  },
  buttonsContainer: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  buttonContainer: {
    width: 180,
  },
  buttonItem: {
    flex: 1,
    alignItems: "center",
  },
  bio: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default UserProfileScreen;
