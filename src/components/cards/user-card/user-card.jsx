import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import RegularText from "../../texts/regular-text/regular-text";

const UserCard = ({ data }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: data.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <RegularText text={`${data.firstName} ${data.lastName}`} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    marginLeft: 10,
  },
});

export default UserCard;
