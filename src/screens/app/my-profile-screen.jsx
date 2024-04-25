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
import { selectAuth } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

//Importing function from the user API file
import { getFollowData } from "../../utils/api/user";
import { getUserPosts } from "../../utils/api/posts";

//App color palate
import { colorPalate } from "../../utils/ui/colors";

//Custom components
import BigText from "../../components/texts/big-text/big-text";
import SmallText from "../../components/texts/small-text/small-text";
import RegularButton from "../../components/buttons/regular-button/regular-button";
import EmptyCard from "../../components/cards/empty-card/empty-card";
import PostSlider from "../../components//scroll/posts-slider/post-slider";
import AddPost from "../../components/buttons/add-post/add-post";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const [myUser, setMyUser] = useState(JSON.parse(auth.user));

  const [userFollows, setUsrFollows] = useState({
    following: 0,
    followers: 0,
  });
  const [myPosts, setMyPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUserData = async () => {
    const posts = await getUserPosts(myUser.id);
    setMyPosts(posts);
    const res = await getFollowData(myUser.token);
    const followData = res.toString().split(",");
    setUsrFollows({
      ...userFollows,
      following: followData[1],
      followers: followData[0],
    });
  };

  const logoutUser = () => {
    SecureStore.deleteItemAsync("token");
    dispatch(logout());
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchUserData();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colorPalate.primary]} // Customize the loading spinner color
          />
        }
      >
        {myUser ? (
          <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
              <View>
                <Image
                  source={{ uri: myUser.profilePictureUrl }}
                  style={styles.profileImage}
                />
              </View>
              <BigText text={`${myUser.firstName} ${myUser.lastName}`} />
              <View style={styles.followingContainer}>
                <SmallText text={`עוקב אחרי ${userFollows.followers}`} />
                <SmallText text={`עוקב אחרי ${userFollows.following} `} />
              </View>
            </View>
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonView}>
                <RegularButton
                  text={"עריכת פרופיל"}
                  color={colorPalate.primary}
                  iconName={"create-outline"}
                  onPress={() => {
                    navigation.navigate("profile-edit");
                  }}
                />
              </View>
              <View style={styles.buttonView}>
                <RegularButton
                  text={`התנתק`}
                  color={colorPalate.warning}
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
            {myPosts.length > 0 && (
              <PostSlider
                arr={myPosts}
                onImgPress={() => {}}
                setRender={onRefresh}
              />
            )}
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
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  followingContainer: {
    flexDirection: "row",
    gap: 30,
  },
  profileImage: {
    width: 160,
    height: 160,
    resizeMode: "cover",
    borderRadius: 80,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
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
