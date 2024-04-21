import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
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
  // State to control refreshing
  const [refreshing, setRefreshing] = useState(false);

  // Function to handle refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Perform any data fetching or refreshing actions here
    // For example, refetch posts data or any other necessary data
    // After fetching data, setRefreshing(false) to stop refreshing indicator
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); // Simulating data fetching with a delay of 1 second
  }, []);

  const moveToProfile = (email) => {
    if (myUser.email !== email) {
      navigation.navigate("home-profile", { email: email });
    } else {
      navigation.navigate("profile-stack");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Image source={LogoImage} style={styles.logo} />
        <SmallText text="היי בני, מה אתה מחפש ?" english={true} />
      </View>
      <ScrollView
        nestedScrollEnabled={true}
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 8,
    width: "100%",
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
    marginLeft: 10,
  },
});

export default HomeScreen;
