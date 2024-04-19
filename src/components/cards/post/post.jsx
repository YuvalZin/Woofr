import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

//
import { useSelector } from "react-redux";
import { selectAuth } from "../../../redux/authSlice";

//Custom Components
import RegularText from "../../texts/regular-text/regular-text";
import SmallText from "../../texts/small-text/small-text";
import IconButton from "../../buttons/icon-button/icon-button";

import { users } from "../../../utils/data/users";
import { colorPalate } from "../../../utils/ui/colors";

const Post = ({ data, onImgPress }) => {
  const [userData, setUserData] = useState("");
  const [timeStr, setTimeStr] = useState("");

  // Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  useEffect(() => {
    if (users) {
      users.forEach((user) => {
        if (user.email === data.ownerEmail) {
          setUserData(user);
          setTimeStr(calculateTimeAgo(data.timestamp));
        }
      });
    }
  }, [data, users]);

  const calculateTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diff = now - postTime;
    const seconds = Math.floor(diff / 1000);

    if (seconds < 60) {
      return "כרגע";
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} דקות`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} שעות`;
    } else {
      const day = postTime.getDate();
      const month = postTime.getMonth() + 1;
      const year = postTime.getFullYear().toString().slice(-2);
      return `${day}/${month}/${year}`;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <RegularText
            text={`${userData.firstName} ${userData.lastName}`}
            style={styles.username}
          />
          <SmallText text={timeStr} style={styles.infoText} />
        </View>
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={() => onImgPress(userData.email)}
        >
          <Image
            source={{
              uri: userData.img,
            }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      <RegularText text={data.postText} english={true} />

      {data.ownerEmail === myUser.email && (
        <View style={styles.buttonContainer}>
          <IconButton
            iconName={"trash-outline"}
            color={colorPalate.warning}
            iconSize={22}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginBottom: 10,
    margin: 7,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "grey",
    padding: 8,
  },
  header: {
    padding: 6,
    marginBottom: 10,
    flexDirection: "row",
  },
  avatarContainer: {
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  userInfo: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  infoText: {
    color: "#888",
    fontSize: 12,
    marginRight: 3,
  },
  buttonContainer: {
    padding: 6,
    width: 120,
  },
});

export default Post;
