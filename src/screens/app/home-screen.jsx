import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  RefreshControl,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

//Redux state management
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";

//Custom Component
import PostFilter from "../../components/scroll/posts-filter/post-filter";
import PostSlider from "../../components/scroll/posts-slider/post-slider";
import AddPost from "../../components/buttons/add-post/add-post";
import LogoImage from "../../../assets/logo-wofer2.png";
import SmallText from "../../components/texts/small-text/small-text";
import { getHomePagePosts } from "../../utils/api/posts";

const HomeScreen = () => {
  //Navigation handler
  const navigation = useNavigation();

  // Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);
  // State to control refreshing
  const [refreshing, setRefreshing] = useState(false);

  const [posts, setPosts] = useState([]);

  //fetch posts to display on homepage
  const fetchPosts = async () => {
    const res = await getHomePagePosts(myUser.id);
    setPosts(res);
  };

  useEffect(() => {
    fetchPosts();
  }, [refreshing]);

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  // Function to handle refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPosts();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const moveToProfile = (id) => {
    if (myUser.id !== id) {
      navigation.navigate("home-profile", { id: id });
    } else {
      navigation.navigate("profile-stack");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Image source={LogoImage} style={styles.logo} />
        <SmallText
          text={`היי ${myUser.firstName} שמחים לראות שחזרת`}
          english={true}
        />
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
        {posts.length > 0 && (
          <PostSlider
            arr={posts}
            onImgPress={moveToProfile}
            setRender={onRefresh}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
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
