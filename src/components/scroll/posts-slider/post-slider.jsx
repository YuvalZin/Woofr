import React from "react";
import { StyleSheet, FlatList, View } from "react-native";

// Custom components
import Post from "../../cards/post/post";
import EmptyCard from "../../cards/empty-card/empty-card";

const PostSlider = ({ arr, onImgPress }) => {
  const renderPostItem = ({ item, index }) => {
    return (
      <Post key={`post num:${index}`} data={item} onImgPress={onImgPress} />
    );
  };

  return (
    <View style={{alignItems:"center"}}>
      <View style={styles.container}>
        {arr.length > 0 ? (
          <FlatList
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            data={arr}
            renderItem={({ item, index }) => renderPostItem({ item, index })}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <EmptyCard text={"אין פוסטים שניתן להציג כרגע..."} iconName="bug" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '95%',
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostSlider;
