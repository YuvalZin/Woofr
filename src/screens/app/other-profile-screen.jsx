import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

// Import necessary hooks from React Navigation
import { useNavigation, useRoute } from "@react-navigation/native";

//App color palate
import { colorPalate } from "../../utils/ui/colors";

//Create a random UUID
import uuid from "react-native-uuid";

//Redux state management
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";

//Importing function from the API file
import {
  GetUserInfo,
  followAction,
  getUserFollowers,
  getUserFollowings,
} from "../../utils/api/user";
import { startChat } from "../../utils/api/chat";
import { getUserPosts } from "../../utils/api/posts";
import { getProById } from "../../utils/api/pro";

//Custom components
import GoBackButton from "../../components/buttons/go-back/go-back-button";
import PostSlider from "../../components/scroll/posts-slider/post-slider";
import LoadingIndicator from "../../components/animation/loading-indicator/loading-indicator";
import RegularText from "../../components/texts/regular-text/regular-text";
import RegularTextBold from "../../components/texts/regular-text/regular-text-bold";
import RegularButtonSmall from "../../components/buttons/regular-button/regular-button-small";
import ProfessionalProfile from "../../components/cards/professional-profile/professional-profile";

const UserProfileScreen = () => {
  //Importing the useNavigation hook from React Navigation to access navigation prop
  const navigation = useNavigation();

  // Extracts the 'id' parameter from the current route.
  const route = useRoute();
  const { id } = route.params;

  // Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  // Define state variable 'userProfile' using the 'useState' hook, initialized as null.
  const [userProfile, setUserProfile] = useState(null);
  const [userType, setUserType] = useState("user");
  const [professional, setProfessional] = useState();

  // Define state variable 'posts' using the 'useState' hook, initialized as an empty array.
  const [posts, setPosts] = useState([]);

  // Initialize state variables for following and followers
  const [following, setFollowing] = useState([]);
  const [followers, setFollower] = useState([]);

  // State variable to track whether to follow a user or not
  const [followThis, setFollowThis] = useState(false);

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

  const moveToRating = (id) => {
    if (myUser.id !== id) {
      console.log(userProfile);
      professional.profileImage = userProfile.profilePictureUrl;
      navigation.navigate("home-rating", { data: professional });
    }
  };

  const followHandler = async () => {
    const res = await followAction(myUser.id, id);
    if (res === 1) {
      setFollowThis(false);
      setFollowThis(true);
    } else {
      setFollowThis(true);
      setFollowThis(false);
    }
  };

  // Asynchronously fetches user data based on the provided 'id' and updates the 'userProfile' state.
  const fetchUserData = async () => {
    const response = await GetUserInfo(id);
    setUserProfile(response);
    if (response.type == "commercial") {
      const proData = await getProById(id);
      setProfessional(proData);
    }
  };

  // Asynchronously fetches user posts based on the provided 'id' and updates the 'posts' state.
  const fetchUserPosts = async () => {
    const response = await getUserPosts(id);
    setPosts(response);
  };

  // Asynchronously loads follow data for the current user and updates the 'userFollows' state.
  const loadFollowData = async () => {
    // Retrieve user following data and set the values
    const fetchFollowings = await getUserFollowings(id);
    setFollowing(fetchFollowings);

    // Retrieve user follower data and set the values
    const fetchFollowers = await getUserFollowers(id);
    setFollower(fetchFollowers);

    fetchFollowers.forEach((follow) => {
      if (follow.id === myUser.id) {
        setFollowThis(true);
      }
    });
  };

  // Fetches user data, user posts, and follow data upon screen mount.
  useEffect(() => {
    fetchUserData();
    loadFollowData();
    fetchUserPosts();
  }, [followThis]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <GoBackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
        {userProfile && (
          <View>
            <RegularTextBold
              text={userProfile.firstName + " " + userProfile.lastName}
            />
          </View>
        )}
      </View>
      {userProfile ? (
        <ScrollView style={styles.container}>
          <View style={styles.topArea}>
            <View>
              <Image
                source={{ uri: userProfile.profilePictureUrl }}
                style={styles.profileImage}
              />
            </View>
            <View style={styles.followingContainer}>
              <RegularText text={`${following.length}\nעוקב`} />
              <RegularText text={`${followers.length}\nבמעקב`} />
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <View style={styles.buttonView}>
              <RegularButtonSmall
                text={followThis ? "הסר עוקב" : "עקוב"}
                width={120}
                color={colorPalate.primaryLight}
                textColor={"white"}
                iconName={"person-add-outline"}
                onPress={followHandler}
              />
            </View>
            <View style={styles.buttonView}>
              <RegularButtonSmall
                text={"שלח הודעה"}
                width={120}
                color={"#e6e6e6"}
                iconName={"mail-outline"}
                onPress={() => {
                  moveToChat(userProfile.email);
                }}
              />
            </View>
          </View>
          {professional && (
            <ProfessionalProfile
              data={professional}
              onRatingPress={moveToRating}
            />
          )}

          <View style={styles.postsArea}>
            <PostSlider arr={posts} onImgPress={() => {}} />
          </View>
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
  postsArea: {
    borderTopWidth: 0.5,
    borderTopColor: colorPalate.lightGrey,
    width: "100%",
    backgroundColor: "#f5f5f5",
    paddingBottom: 30,
  },
  topArea: {
    paddingHorizontal: 25,
    paddingBottom: 15,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  profileImage: {
    width: 92,
    height: 92,
    resizeMode: "cover",
    borderRadius: 80,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
  },
  followingContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "flex-end",
    paddingBottom: 5,
    gap: 30,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginBottom: 10,
    paddingHorizontal: 29,
  },
  buttonContainer: {
    width: 180,
  },
  buttonView: {
    flex: 1,
    padding: 8,
  },
  buttonItem: {
    flex: 1,
    alignItems: "center",
  },
  bio: {
    fontSize: 16,
    textAlign: "center",
  },
  header: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
  },
});

export default UserProfileScreen;
