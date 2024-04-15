import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import Post from "../../cards/post/post";

const PostSlider = () => {
  // Sample data for 12 posts
  const postsData = Array.from({ length: 12 }, (_, index) => ({
    id: index.toString(), // unique id for each post
    // Other post data can be added here
  }));

  const renderPostItem = ({ item }) => {
    return <Post key={item.id} /* Pass post data here */ />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={postsData}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Add styles for container if needed
  },
});

export default PostSlider;
