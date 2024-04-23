import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";

//
import { useSelector } from "react-redux";
import { selectAuth } from "../../../redux/authSlice";

//Custom Components
import RegularText from "../../texts/regular-text/regular-text";
import SmallText from "../../texts/small-text/small-text";
import IconButton from "../../buttons/icon-button/icon-button";

import { colorPalate } from "../../../utils/ui/colors";
import { GetUserInfo } from "../../../utils/api/user";
import { deletePost, getPostLikes, likePost } from "../../../utils/api/posts";

const Post = ({ data, onImgPress }) => {
  const [userData, setUserData] = useState("");
  const [timeStr, setTimeStr] = useState("");
  const [isMyPost, setIsMyPost] = useState();
  const [likesCount, setLikesCount] = useState(data.likeCount);

  // Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  const likeHandle = async (post_id, user_id) => {
    const res = await likePost(post_id, user_id);
    setLikesCount(res);
  };

  const deletePostById = async (post_id) => {
    const res = await deletePost(post_id);
    console.log(res);
  };

  const fetchUserInfo = async () => {
    setIsMyPost(data.userId === (myUser && myUser.id));
    if (!isMyPost) {
      const res = await GetUserInfo(data.userId);
      setUserData(res);
    } else {
      setUserData(myUser);
    }
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);

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
          onPress={() => onImgPress(userData.id)}
        >
          <Image
            source={{
              uri: userData.profilePictureUrl,
            }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      {data.mediaUrl && (
        <View style={styles.postImageContainer}>
          <Image source={{ uri: data.mediaUrl }} style={styles.postImage} />
        </View>
      )}

      <RegularText text={data.content} english={true} />

      <View style={styles.buttonsContainer}>
        {isMyPost && (
          <View style={styles.buttonContainer}>
            <IconButton
              iconName={"trash-outline"}
              color={colorPalate.warning}
              iconSize={22}
              onPress={() => deletePostById(data.id)}
            />
          </View>
        )}
        <View style={styles.buttonContainer}>
          <IconButton
            iconName={"heart"}
            color={colorPalate.primary}
            iconSize={22}
            onPress={() => likeHandle(data.id, myUser.id)}
          />
          <Text>{likesCount}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginBottom: 10,
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
  postImageContainer: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 8,
    alignItems: "center",
    padding: 8,
  },
  postImage: {
    width: 330,
    height: 330,
    resizeMode: "cover",
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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  buttonContainer: {
    padding: 6,
  },
});

export default Post;
