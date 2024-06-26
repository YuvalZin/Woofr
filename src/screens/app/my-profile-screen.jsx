import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  RefreshControl,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

//Store user data handler
import * as SecureStore from "expo-secure-store";

//Redux state management
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

//Importing function from the API file
import { getUserFollowers, getUserFollowings } from "../../utils/api/user";
import { getUserPosts } from "../../utils/api/posts";

//App color palate
import { colorPalate } from "../../utils/ui/colors";
import { getProById } from "../../utils/api/pro";
import ProfessionalProfile from "../../components/cards/professional-profile/professional-profile"
//Custom components
import RegularButtonSmall from "../../components/buttons/regular-button/regular-button-small";
import EmptyCard from "../../components/cards/empty-card/empty-card";
import PostSlider from "../../components//scroll/posts-slider/post-slider";
import AddPost from "../../components/buttons/add-post/add-post";
import RegularTextBold from "../../components/texts/regular-text/regular-text-bold";
import RegularText from "../../components/texts/regular-text/regular-text";

const ProfileScreen = () => {
  //Navigation handler
  const navigation = useNavigation();

  // Use useSelector to access the Redux store state
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  // Initialize state variables for following and followers
  const [following, setFollowing] = useState([]);
  const [followers, setFollower] = useState([]);

  // Initialize state for storing the user's posts
  const [myPosts, setMyPosts] = useState([]);

  const [proData, setProData] = useState([]);

  // Initialize state for handling the refreshing state of the posts (e.g., when pulling down to refresh)
  const [refreshing, setRefreshing] = useState(false);

  // Function to logout the user
  const logoutUser = () => {
    // Delete the authentication token from SecureStore
    SecureStore.deleteItemAsync("token");
    // Dispatch the logout action to the Redux store
    dispatch(logout());
  };

  const fetchUserData = async () => {
    // Retrieve user posts and set the values
    const posts = await getUserPosts(myUser.id);
    setMyPosts(posts);

    // Retrieve user following data and set the values
    const fetchFollowings = await getUserFollowings(myUser.id);
    setFollowing(fetchFollowings);

    // Retrieve user follower data and set the values
    const fetchFollowers = await getUserFollowers(myUser.id);
    setFollower(fetchFollowers);

    const proData = await getProById(myUser.id);
    setProData(proData);
  };

  // Execute the provided callback when the component gains focus
  useFocusEffect(
    useCallback(() => {
      setMyPosts([]);
      fetchUserData();
    }, [refreshing])
  );

  const moveToRating = (id) => {
      navigation.navigate("home-rating", { data: proData});
  };

  // Function to handle the refresh action
  const onRefresh = () => {
    // Set refreshing to true immediately
    setMyPosts([]);
    setRefreshing(true);
  };

  //Function to move to follow screen
  const moveToFollows = (arr, title) => {
    navigation.navigate("profile-follows", { arr: arr, title: title });
  };

  useEffect(() => {
    // Fetch user data when the refreshing state changes
    if (refreshing) {
      fetchUserData().then(() => {
        // After fetching data, set refreshing to false
        setRefreshing(false);
      });
    }
  }, [refreshing]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SafeAreaView>
        <StatusBar backgroundColor={"black"} />
      </SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colorPalate.primary]}
          />
        }
      >
        {myUser ? (
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={{ alignItems: "center", marginTop: 5 }}>
                <Image
                  source={{ uri: myUser.profilePictureUrl }}
                  style={styles.profileImage}
                />
                <View>
                  <RegularTextBold
                    text={`${myUser.firstName} ${myUser.lastName}`}
                  />
                </View>
              </View>
              <View style={styles.followingContainer}>
                <TouchableOpacity
                  style={{ flexDirection: "column", alignItems: "center" }}
                  onPress={() => {
                    moveToFollows(followers, "העוקבים שלי");
                  }}
                >
                  <RegularTextBold text={`${followers.length}`} />
                  <RegularText text={`עוקבים`} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    moveToFollows(following, "הנעקבים שלי");
                  }}
                  style={{ flexDirection: "column", alignItems: "center" }}
                >
                  <RegularTextBold text={`${following.length}`} />
                  <RegularText text={`במעקב`} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonView}>
                <RegularButtonSmall
                  text={"עריכת פרופיל"}
                  color={"#e6e6e6"}
                  iconName={"create-outline"}
                  onPress={() => {
                    navigation.navigate("profile-edit");
                  }}
                />
              </View>
              <View style={styles.buttonView}>
                <RegularButtonSmall
                  text={`התנתק`}
                  color={"#e6e6e6"}
                  iconName={"log-out-outline"}
                  onPress={() => logoutUser()}
                />
              </View>
            </View>
            {proData &&( 
            <ProfessionalProfile
              data={proData}
              onRatingPress={moveToRating}
            />)}
            <AddPost
              onPress={() => {
                navigation.navigate("profile-post");
              }}
            />
            <View style={styles.postsArea}>
              {myPosts.length > 0 && (
                <PostSlider
                  arr={myPosts}
                  onImgPress={() => {}}
                  setRender={onRefresh}
                />
              )}
            </View>
          </View>
        ) : (
          <EmptyCard
            text={"הייתה בעיה למצוא את הפרופיל לצערנו"}
            iconName={"sad-outline"}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 1,
    flex: 1,
  },
  postsArea: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    paddingBottom: 30,
  },
  header: {
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  followingContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "flex-end",
    paddingBottom: 20,
    gap: 30,
  },
  profileImage: {
    width: 78,
    height: 78,
    resizeMode: "cover",
    borderRadius: 80,
    marginBottom: 3,
    marginTop: 3,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginBottom: 15,
    paddingHorizontal: 29,
  },
  buttonView: {
    flex: 1,
    padding: 8,
  },
  buttonItem: {
    flex: 1,
    alignItems: "center",
  },
});

export default ProfileScreen;
