// HomeScreen.js
import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView ,Image} from "react-native";
import { useNavigation } from "@react-navigation/native";

//Custom Component
import BigText from "../../components/texts/big-text/big-text";
import SmallText from "../../components/texts/small-text/small-text";
import PostFilter from "../../components/scroll/posts-filter/post-filter";
import PostSlider from "../../components/scroll/posts-slider/post-slider";
import AddPost from "../../components/buttons/add-post/add-post";


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
        <Image
              source={require("../assets/logo-wofer2.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          <SmallText text="היי בני, מה אתה מחפש ?" />
        </View>
        <ScrollView style={{ flex: 1 }}>

          <PostFilter index={filterIndex} setIndex={setFilterIndex} />
          <AddPost />
          <PostSlider type={filterIndex} onImgPress={moveToProfile} />
        </ScrollView>
      </View>


    </SafeAreaView >
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
    alignItems: "flex-end",
  },
});

export default HomeScreen;
