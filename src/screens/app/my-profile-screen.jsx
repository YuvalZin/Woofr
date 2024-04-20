import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

//Redux state management
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";

//Custom components
import BigText from "../../components/texts/big-text/big-text";
import SmallText from "../../components/texts/small-text/small-text";
import RegularButton from "../../components/buttons/regular-button/regular-button";
import EmptyCard from "../../components/cards/empty-card/empty-card";
import PostSlider from "../../components//scroll/posts-slider/post-slider";

//Api handler
import { getFollowData } from "../../utils/api/user";

//Fake data
import { posts } from "../../utils/data/posts";
import { colorPalate } from "../../utils/ui/colors";
import AddPost from "../../components/buttons/add-post/add-post";

const ProfileScreen = () => {
  const navigation = useNavigation();

  // Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const followData = await getFollowData(myUser.token);
      data.followers = followData.split(",")[0];
      data.following = followData.split(",")[1];
    };
    fetchUserData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    // Perform data fetching or any other asynchronous tasks
    // Once tasks are complete, set refreshing to false
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Simulating a delay for demonstration purposes
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
            <View>
              <Image source={{ uri: myUser.img }} style={styles.profileImage} />
            </View>
            <BigText text={`${myUser.firstName} ${myUser.lastName}`} />
            <View style={styles.followingContainer}>
              <SmallText text={`עוקב אחרי${myUser.followers}`} />
              <SmallText text={`עוקב אחרי ${myUser.following} `} />
            </View>

            <View style={styles.buttonsContainer}>
              <View style={styles.buttonView}>
                <RegularButton
                  text={`התנתק`}
                  color={colorPalate.warning}
                  iconName={"log-out-outline"}
                />
              </View>
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
            </View>
            <AddPost
              onPress={() => {
                navigation.navigate("profile-post");
              }}
            />
            <PostSlider arr={posts} />
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
    alignItems: "center",
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
