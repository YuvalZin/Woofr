import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
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

const ProfileScreen = () => {
  const navigation = useNavigation();

  // Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  useEffect(() => {
    const fetchUserData = async () => {
      const followData = await getFollowData(myUser.token);
      data.followers = followData.split(",")[0];
      data.following = followData.split(",")[1];
    };
    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
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
            <View style={styles.buttonContainer}>
              <View style={styles.buttonView}>
                <RegularButton
                  text={`הוספת פוסט`}
                  color={colorPalate.primary}
                  iconName={"add-outline"}
                  onPress={() => {
                    navigation.navigate("profile-post");
                  }}
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
  buttonContainer: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  buttonView: {
    width: 180,
  },
  buttonItem: {
    flex: 1,
    alignItems: "center",
  },
});

export default ProfileScreen;
