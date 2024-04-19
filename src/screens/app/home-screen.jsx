// HomeScreen.js
import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

//
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";

//Custom Component
import PostFilter from "../../components/scroll/posts-filter/post-filter";
import PostSlider from "../../components/scroll/posts-slider/post-slider";
import AddPost from "../../components/buttons/add-post/add-post";
import LogoImage from "../../../assets/logo-wofer2.png";
import SmallText from "../../components/texts/small-text/small-text";

import { posts } from "../../utils/data/posts";

const HomeScreen = () => {
  //Navigation handler
  const navigation = useNavigation();

  // Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  const moveToProfile = (email) => {
    if (myUser.email !== email) {
      navigation.navigate("home-profile", { email: email });
    } else {
      navigation.navigate("profile-stack");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView nestedScrollEnabled={true} style={styles.container}>
        <View style={styles.header}>
          <Image source={LogoImage} style={styles.logo} />
          <SmallText text="היי בני, מה אתה מחפש ?" english={true} />
        </View>

        <PostFilter />
        <AddPost
          onPress={() => {
            navigation.navigate("home-post");
          }}
        />
        <PostSlider arr={posts} onImgPress={moveToProfile} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 8,
    width: "100%",
    alignItems: "flex-end",
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
});

export default HomeScreen;
