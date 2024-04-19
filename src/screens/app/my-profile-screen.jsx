import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import * as SecureStore from "expo-secure-store";

//Custom components
import BigText from "../../components/texts/big-text/big-text";
import SmallText from "../../components/texts/small-text/small-text";
import RegularButton from "../../components/buttons/regular-button/regular-button";
import EmptyCard from "../../components/cards/empty-card/empty-card";
import PostSlider from "../../components//scroll/posts-slider/post-slider";

//Api handler
import { GetUserData } from "../../utils/api/user";
import { getFollowData } from "../../utils/api/user";

//Fake data
import { users } from "../../utils/data/users";
import { posts } from "../../utils/data/posts";
import { colorPalate } from "../../utils/ui/colors";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState(null);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const token = SecureStore.getItem("token");
  //     const data = await GetUserData(token);
  //     const followData = await getFollowData(token);
  //     data.followers = followData.split(",")[0];
  //     data.following = followData.split(",")[1];
  //     setProfileData(data);
  //   };
  //   fetchUserData();
  // }, []);

  useEffect(() => {
    users.forEach((user) => {
      setProfileData(user);
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {profileData ? (
          <View style={styles.container}>
            <View>
              <Image
                source={{ uri: profileData.img }}
                style={styles.profileImage}
              />
            </View>
            <BigText
              text={`${profileData.firstName} ${profileData.lastName}`}
            />
            <View style={styles.followingContainer}>
              <SmallText text={`עוקב אחרי${profileData.followers}`} />
              <SmallText text={`עוקב אחרי ${profileData.following} `} />
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.buttonView}>
                <RegularButton
                  text={`הוספת פוסט`}
                  color={colorPalate.primary}
                  onPress={() => {
                    navigation.navigate("profile-post");
                  }}
                />
              </View>
              <View style={styles.buttonView}>
                <RegularButton
                  text={"עריכת פרופיל"}
                  color={colorPalate.primary}
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
    width: 160,
  },
  buttonItem: {
    flex: 1,
    alignItems: "center",
  },
});

export default ProfileScreen;
