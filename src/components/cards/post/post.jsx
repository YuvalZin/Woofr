import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

//Custom Components
import RegularText from "../../texts/regular-text/regular-text";
import SmallText from "../../texts/small-text/small-text";

import { users } from "../../../utils/data/users";

const Post = ({ data, onImgPress }) => {
  const [userData, setUserData] = useState("");
  const [timeStr, setTimeStr] = useState("");

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
      return "just now";
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginBottom: 10,
    margin: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "grey",
    padding: 4,
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
});

export default Post;
