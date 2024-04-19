import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, ScrollView } from "react-native";

// Custom components
import Post from "../../cards/post/post";
import EmptyCard from "../../cards/empty-card/empty-card";
import LoadingIndicator from "../../animation/loading-indicator/loading-indicator";
import AddPost from "../../../components/buttons/add-post/add-post";
import PostFilter from "../../../components/scroll/posts-filter/post-filter";
import SmallText from "../../../components/texts/small-text/small-text";


// Fake api fetch
import { posts } from "../../../utils/data/posts";

const PostSlider = ({ type, onImgPress }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Set loading state to true when fetching new posts
    setIsLoading(true);

    // Simulate fetching posts from API
    setTimeout(() => {
      // Filter posts based on type

      // Set loading state back to false after 2 seconds
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }, 1000);
  }, [type]);

  const renderPostItem = ({ item, index }) => {
    return (
      <Post key={`post num:${index}`} data={item} onImgPress={onImgPress} />
    );
  };

  return (
    <ScrollView style={styles.container}>
      <SmallText text="היי בני, מה אתה מחפש ?" />
      <PostFilter />
      {isLoading ? (
        <LoadingIndicator />
      ) : posts.length == 0 ? (
        posts.map((post, index) => (
          <Post key={`post-${index}`} data={post} onImgPress={onImgPress} />
        ))
      ) : (
        <EmptyCard text={"אין פוסטים שניתן להציג כרגע..."} iconName="bug" />
      )}
      {/* AddPost component if needed */}
      {/* Additional components can go here */}
    </ScrollView>
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
