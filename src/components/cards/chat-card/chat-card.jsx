import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

//import expo icons
import { Ionicons } from "@expo/vector-icons";

import { useSelector } from "react-redux";
import { selectAuth } from "../../../redux/authSlice";

//Custom components
import RegularText from "../../texts/regular-text/regular-text";
import SmallText from "../../texts/small-text/small-text";
import { GetUserInfo } from "../../../utils/api/user";

const ChatCard = ({ onClick, chat }) => {
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  const [otherUser, setOtherUser] = useState(null);

  const fetchUserData = async (id) => {
    const response = await GetUserInfo(id);
    setOtherUser(response);
  };

  useEffect(() => {
    const otherId =
      chat.Participant1ID === myUser.id
        ? chat.Participant2ID
        : chat.participant1ID;

    fetchUserData(otherId);
  }, []);

  return otherUser ? (
    <TouchableOpacity onPress={() => onClick(chat)}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.imgContainer}>
            <Image
              source={{ uri: otherUser.profilePictureUrl }}
              style={styles.img}
            />
          </View>
          <View style={styles.infoContainer}>
            <RegularText
              text={`${otherUser.firstName} ${otherUser.lastName}`}
            />
            <SmallText text={chat.lastMessage} />
          </View>
        </View>
        <View style={styles.iconContainer}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  ) : null;
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
    justifyContent: "flex-start",
    padding: 6,
    alignItems: "flex-start",
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
