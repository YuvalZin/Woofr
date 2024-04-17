import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, ActivityIndicator } from "react-native";

// Custom components
import Post from "../../cards/post/post";
import EmptyCard from "../../cards/empty-card/empty-card";

// Fake api fetch
import { posts } from "../../../utils/data/posts";

const PostSlider = ({ type }) => {
  const [postsFiltered, setPostsFiltered] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Set loading state to true when fetching new posts
    setIsLoading(true);

    // Simulate fetching posts from API
    setTimeout(() => {
      // Filter posts based on type
      const filteredPosts = posts.filter((post) => post.type === type);
      setPostsFiltered(filteredPosts);

      // Set loading state back to false after 2 seconds
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }, 1000);
  }, [type]);

  const renderPostItem = ({ item, index }) => {
    return <Post key={`post num:${index}`} data={item} />;
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={[styles.container, styles.loadingContainer]}>
          <ActivityIndicator size="large" color="#565AC8" />
        </View>
      ) : postsFiltered.length > 0 ? (
        <FlatList
          data={postsFiltered}
          renderItem={renderPostItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <EmptyCard text={"אין פוסטים שניתן להציג כרגע..."} iconName="bug" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostSlider;
