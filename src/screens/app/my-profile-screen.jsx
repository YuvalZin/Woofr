import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  RefreshControl,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

//Store user data handler
import * as SecureStore from "expo-secure-store";

//Redux state management
import { useSelector } from "react-redux";
import authSlice, { selectAuth } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

//Importing function from the API file
import { getUserFollowers, getUserFollowings } from "../../utils/api/user";
import { getUserPosts } from "../../utils/api/posts";

//App color palate
import { colorPalate } from "../../utils/ui/colors";

//Custom components
import BigText from "../../components/texts/big-text/big-text";
import SmallText from "../../components/texts/small-text/small-text";
import RegularButton from "../../components/buttons/regular-button/regular-button";
import RegularButtonSmall from "../../components/buttons/regular-button/regular-button-small";
import EmptyCard from "../../components/cards/empty-card/empty-card";
import PostSlider from "../../components//scroll/posts-slider/post-slider";
import AddPost from "../../components/buttons/add-post/add-post";
import RegularTextBold from "../../components/texts/regular-text/regular-text -bold";
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
  };

  // Execute the provided callback when the component gains focus
  useFocusEffect(
    useCallback(() => {
      setMyPosts([]);
      fetchUserData();
    }, [refreshing])
  );

  // Function to handle the refresh action
  const onRefresh = () => {
    // Set refreshing to true immediately
    setMyPosts([]);
    setRefreshing(true);
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
              <View>
                <View style={{ marginBottom: 10 }}>
                  <RegularTextBold text={`${myUser.firstName} ${myUser.lastName}`} />
                </View>
                <Image
                  source={{ uri: myUser.profilePictureUrl }}
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
            <AddPost
              onPress={() => {
                navigation.navigate("profile-post");
              }}
            />
            <View style={styles.postsArea}>

              {myPosts.length > 0 && (
                <PostSlider
                  arr={myPosts}
                  onImgPress={() => { }}
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
    marginTop: 20,
    flex: 1,
  },
  postsArea:{
    width:"100%",
    backgroundColor:"#f5f5f5",
    paddingBottom:30,
  },
  header: {
    paddingHorizontal: 25,
    paddingBottom: 15,
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
    paddingBottom: 5,
    gap: 30,
  },
  profileImage: {
    width: 92,
    height: 92,
    resizeMode: "cover",
    borderRadius: 80,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginBottom: 10,
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
