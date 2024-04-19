import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

//import expo icons
import { Ionicons } from "@expo/vector-icons";

//Custom components
import RegularText from "../../texts/regular-text/regular-text";
import SmallText from "../../texts/small-text/small-text";

const ChatCard = ({ onClick }) => {
  const profileImage =
    "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg";

  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.infoContainer}>
            <RegularText text={"בני חנונוב"} />
            <SmallText text={"של הכלבים היום ?"} />
          </View>
          <View style={styles.imgContainer}>
            <Image source={{ uri: profileImage }} style={styles.img} />
          </View>
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
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    justifyContent: "flex-end",
    padding: 6,
    alignItems: "flex-end",
  },
  imgContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});

export default ChatCard;
