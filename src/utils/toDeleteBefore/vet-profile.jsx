import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

//App color palate
import { colorPalate } from "../../utils/ui/colors";

//Create a random UUID
import uuid from "react-native-uuid";

//Redux state management
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";

//Custom components
import BigText from "../../components/texts/big-text/big-text";
import RegularButton from "../../components/buttons/regular-button/regular-button";
import GoBackButton from "../../components/buttons/go-back/go-back-button";
import PostSlider from "../../components/scroll/posts-slider/post-slider";
import SmallText from "../../components/texts/small-text/small-text";
import LoadingIndicator from "../../components/animation/loading-indicator/loading-indicator";

const VetProfileScreen = () => {
  //const navigation = useNavigation();

  // Extracts the 'id' parameter from the current route.
  const route = useRoute();
  const { id } = route.params;

  // Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  // Define state variable 'userProfile' using the 'useState' hook, initialized as null.
  const [userProfile, setUserProfile] = useState(null);

  // Define state variable 'posts' using the 'useState' hook, initialized as an empty array.
  const [posts, setPosts] = useState([]);

  // State variable 'userFollows' initialization with 'useState': object with 'following' and 'followers' properties.
  const [userFollows, setUserFollows] = useState({
    following: 0,
    followers: 0,
  });

  // Initiates a new chat between the current user and the user profile being viewed.
  const moveToChat = async () => {
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
      // If the chat initiation is successful, navigate to the chat screen with the chat data.
      navigation.navigate("chat", { data: res });
    } else {
      // If there's an error, display an alert.
      Alert.alert("משהו השתבש", "לא ניתן ליצור צ'אט", [
        {
          text: "שחרר",
          style: "cancel",
        },
      ]);
    }
  };

  // Fetches user data, user posts, and follow data upon screen mount.
  useEffect(() => {
    // Asynchronously fetches user data based on the provided 'id' and updates the 'userProfile' state.
    const fetchUserData = async () => {
      const response = await GetUserInfo(id);
      setUserProfile(response);
    };

    // Asynchronously fetches user posts based on the provided 'id' and updates the 'posts' state.
    const fetchUserPosts = async () => {
      const response = await getUserPosts(id);
      setPosts(response);
    };

    // Asynchronously loads follow data for the current user and updates the 'userFollows' state.
    const loadFollowData = async () => {
      const res = await getFollowData(myUser.token);
      const followData = res.toString().split(",");
      setUserFollows({
        ...userFollows,
        following: followData[1],
        followers: followData[0],
      });
    };

    fetchUserData();
    loadFollowData();
    fetchUserPosts();
  }, [id]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GoBackButton
        onPress={() => {
          navigation.goBack();
        }}
      />
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

export default VetProfileScreen;
