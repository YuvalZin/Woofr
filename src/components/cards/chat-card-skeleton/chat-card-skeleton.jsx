import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

const ChatCardSkeleton = ({ onClick }) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.iconContainer}></View>
        <View style={styles.contentContainer}>
          <View style={styles.infoSkeleton}></View>
          <View style={styles.imageSkeleton}></View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 4,
    width: "100%",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    paddingHorizontal: 10,
    width: 28,
  },
  infoSkeleton: {
    width: 200,
    height: 40,
    backgroundColor: "#E0E0E0",
    marginBottom: 10,
    marginRight: 10,
  },
  imageSkeleton: {
    width: 80,
    height: 80,
    backgroundColor: "#E0E0E0",
    borderRadius: 40,
  },
});

export default ChatCardSkeleton;
