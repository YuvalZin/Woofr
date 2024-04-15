// HomeScreen.js
import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";

//Custom Component
import BigText from "../../components/texts/big-text/big-text";
import SmallText from "../../components/texts/small-text/small-text";
import PostFilter from "../../components/scroll/posts-filter/post-filter";
import PostSlider from "../../components/scroll/posts-slider/post-slider";

const HomeScreen = () => {
  const [filterIndex, setFilterIndex] = useState(0);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BigText text={"WOOFR"} />
          <SmallText text="היי בני, מה אתה מחפש ?" />
        </View>
        <PostFilter index={filterIndex} setIndex={setFilterIndex} />
        <PostSlider />
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
    alignItems: "flex-end",
  },
});

export default HomeScreen;
