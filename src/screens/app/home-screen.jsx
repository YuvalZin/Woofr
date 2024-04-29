import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

//Redux state management
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";

//Importing function from the API file
import { getHomePagePosts } from "../../utils/api/posts";

//Import app logo
import LogoImage from "../../../assets/logo-wofer2.png";

//Custom Component
import PostSlider from "../../components/scroll/posts-slider/post-slider";
import AddPost from "../../components/buttons/add-post/add-post";
import BigText from "../../components/texts/big-text/big-text";
import ExploreSlider from "../../components/scroll/explore-slider/explore-slider";
import RegularText from "../../components/texts/regular-text/regular-text";

const HomeScreen = () => {
  //Navigation handler
  const navigation = useNavigation();

  // Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  // State to control refreshing
  const [refreshing, setRefreshing] = useState(false);

  // Initialize state for storing the user's posts
  const [posts, setPosts] = useState([]);

  //fetch posts to display on homepage
  const fetchPosts = async () => {
    const res = await getHomePagePosts(myUser.id);
    setPosts(res);
  };

  // Function to handle refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPosts([]);
    fetchPosts();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  // Function to navigate to either the "home-profile" or "profile-stack" screen based on the provided ID
  const moveToProfile = (id) => {
    if (myUser.id !== id) {
      navigation.navigate("home-profile", { id: id });
    } else {
      navigation.navigate("profile-stack");
    }
  };

  const moveToProfessionals = () => {
    navigation.navigate("home-professionals");
  };

  // useEffect hook to fetch posts when the refreshing state changes
  useEffect(() => {
    fetchPosts();
  }, [refreshing]);

  // useFocusEffect hook to fetch posts when the component gains focus
  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  const exploreArray = [
    { id: "0", name: "", desc: "" },
    { id: "1", name: "", desc: "" },
    { id: "2", name: "", desc: "" },
    { id: "3", name: "", desc: "" },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Image source={LogoImage} style={styles.logo} />
        <RegularText
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
        <AddPost
          onPress={() => {
            navigation.navigate("home-post");
          }}
        />
        <TouchableOpacity
          style={styles.touchableContainer}
          onPress={moveToProfessionals}
        >
          <BigText text={"גלה עוד בעלי מקצוע"} />
          <Ionicons name="caret-back-outline" size={24} color={"black"} />
        </TouchableOpacity>

        <ExploreSlider arr={exploreArray} onPress={moveToProfile} />

        <View style={styles.touchableContainer} onPress={moveToProfessionals}>
          <BigText text={"מה נובח עכשיו"} />
        </View>

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
    width: 120,
    height: 60,
    resizeMode: "contain",
    marginLeft: 10,
  },
  touchableContainer: {
    justifyContent: "end",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    gap: 12,
    padding: 4,
  },
});

export default HomeScreen;
