import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

//import expo icons
import { Ionicons } from "@expo/vector-icons";

//Custom components
import RegularText from "../../texts/regular-text/regular-text";
import SmallText from "../../texts/small-text/small-text";

//Fake data
import { users } from "../../../utils/data/users";

const ChatCard = ({ onClick, chat }) => {
  const [otherUser, setOtherUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      users.forEach((user) => {
        if (user.email === chat.user1) {
          setOtherUser(user);
          setIsLoading(false);
        }
      });
    }, 1000);

    return () => clearTimeout(timer); // Cleanup timeout
  }, [chat.email]);

  return (
    <TouchableOpacity onPress={() => onClick(chat)}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.infoContainer}>
            <RegularText
              text={`${otherUser.firstName} ${otherUser.lastName}`}
            />
            <SmallText text={chat.lastMessage} />
          </View>
          <View style={styles.imgContainer}>
            <Image source={{ uri: otherUser.img }} style={styles.img} />
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
