import { React, useState, useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import RegularText from "../../texts/regular-text/regular-text";

const UserCard = ({ data }) => {

  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: data.profilePictureUrl }} style={styles.image} />
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
    padding: 8,
    borderRadius: 8,
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
