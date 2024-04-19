// HomeScreen.js
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
//Custom Component
import BigText from "../../components/texts/big-text/big-text";
import SmallText from "../../components/texts/small-text/small-text";
import PostFilter from "../../components/scroll/posts-filter/post-filter";
import PostSlider from "../../components/scroll/posts-slider/post-slider";
import AddPost from "../../components/buttons/add-post/add-post";
import LogoImage from "../../../assets/logo-wofer2.png";

const HomeScreen = () => {
  const [filterIndex, setFilterIndex] = useState(3);

  const navigation = useNavigation();

  const moveToProfile = (email) => {
    navigation.navigate("home-profile", { email: email });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={LogoImage} style={styles.logo} />
        </View>
        <PostSlider onImgPress={moveToProfile} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    padding: 8,
    width: "100%",
    alignItems: "flex-start",
  },
  logo: {
    width: 100, // Adjust the width and height as needed
    height: 50,
    resizeMode: "contain", // Make sure the image fits its container
  },
});

export default HomeScreen;
