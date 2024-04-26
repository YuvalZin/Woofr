import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

//Custom components
import BigText from "../../components/texts/big-text/big-text";
import RegularButton from "../../components/buttons/regular-button/regular-button";
import GoBackButton from "../../components/buttons/go-back/go-back-button";
import PostSlider from "../../components/scroll/posts-slider/post-slider";
import SmallText from "../../components/texts/small-text/small-text";
import LoadingIndicator from "../../components/animation/loading-indicator/loading-indicator";

//App color palate
import { colorPalate } from "../../utils/ui/colors";

//Create a random UUID
import uuid from "react-native-uuid";

//Redux state management
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";

//Importing function from the API file
import { GetUserInfo, getFollowData } from "../../utils/api/user";
import { startChat } from "../../utils/api/chat";
import { getUserPosts } from "../../utils/api/posts";

const UserProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  // Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  const [userProfile, setUserProfile] = useState(null);

  const [posts, setPosts] = useState([]);
  const [userFollows, setUsrFollows] = useState({
    following: 0,
    followers: 0,
  });

  const fetchUserData = async () => {
    const response = await GetUserInfo(id);
    setUserProfile(response);
  };

  const fetchUserPosts = async () => {
    const response = await getUserPosts(id);
    setPosts(response);
  };

  const loadFollowData = async () => {
    const res = await getFollowData(myUser.token);
    const followData = res.toString().split(",");
    setUsrFollows({
      ...userFollows,
      following: followData[1],
      followers: followData[0],
    });
  };

  useEffect(() => {
    fetchUserData();
    loadFollowData();
    fetchUserPosts();
  }, [id]);

  const moveBack = () => {
    navigation.goBack();
  };

  const moveToChat = async () => {
    //API CALL TO FIND IF THERE IS CHAT ALREADY
    const newChat = {
      chatID: uuid.v4(),
      participant1ID: myUser.id,
      participant2ID: userProfile.id,
      participant1UnreadCount: 0,
      participant2UnreadCount: 0,
      lastMessage: "",
    };

    const res = await startChat(newChat);
    if (res) {
      navigation.navigate("chat", { data: res });
    } else {
      Alert.alert("משהו השתבש", "לא ניתן ליצור צ'אט", [
        {
          text: "שחרר",
          style: "cancel",
        },
      ]);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GoBackButton onPress={moveBack} />
      {userProfile ? (
        <ScrollView style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: userProfile.profilePictureUrl }}
              style={styles.profileImage}
            />
            <BigText
              text={`${userProfile.firstName} ${userProfile.lastName}`}
            />
            <View style={styles.followingContainer}>
              <SmallText text={`עוקב אחרי ${userFollows.followers}`} />
              <SmallText text={`עוקב אחרי ${userFollows.following} `} />
            </View>
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
  followingContainer: {
    flexDirection: "row",
    gap: 30,
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
