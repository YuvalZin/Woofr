import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View, Alert } from "react-native";

//
import { useSelector } from "react-redux";
import { selectAuth } from "../../../redux/authSlice";

//Custom Components
import RegularText from "../../texts/regular-text/regular-text";
import SmallText from "../../texts/small-text/small-text";
import IconButton from "../../buttons/icon-button/icon-button";

import { colorPalate } from "../../../utils/ui/colors";

//Import api calls
import { GetUserInfo } from "../../../utils/api/user";
import { deletePost, likePost } from "../../../utils/api/posts";

const Post = ({ data, onImgPress, setRender }) => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    profilePictureUrl: null,
  });
  const [timeStr, setTimeStr] = useState("");
  const [isMyPost, setIsMyPost] = useState();
  const [likesCount, setLikesCount] = useState(data.likeCount);
  const [likeThis, setLikeThis] = useState(false);

  // Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  const likeHandle = async (post_id, user_id) => {
    const res = await likePost(post_id, user_id);
    setLikesCount(res);
    setLikeThis(!likeThis);
  };

  const deletePostById = async (post_id) => {
    const res = await deletePost(post_id);
    if (res) {
      setRender();
    } else {
      Alert.alert("משהו השתבש", "הייתה בעיה למחוק את הפוסט", [
        {
          text: "שחרר",
          style: "cancel",
        },
      ]);
    }
  };

  const fetchUserInfo = async () => {
    setIsMyPost(data.userId === (myUser && myUser.id));
    if (!isMyPost) {
      const res = await GetUserInfo(data.userId);
      setUserData(res);
      setUserData(res);
    } else {
      setUserData(myUser);
    }
  };
  useEffect(() => {
    fetchUserInfo();
    var str = calculateTimeAgo();
    setTimeStr(str);
  }, []);

  const calculateTimeAgo = () => {
    const now = new Date();
    const postTime = new Date(data.createdAt);
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
        <View style={styles.userInfo}>
          <RegularText
            text={`${userData.firstName} ${userData.lastName}`}
            style={styles.username}
          />
          <SmallText text={timeStr} style={styles.infoText} />
        </View>
      </View>

      {data.mediaUrl != "null" && (
        <View style={styles.postImageContainer}>
          <Image source={{ uri: data.mediaUrl }} style={styles.postImage} />
        </View>
      )}

      <RegularText text={data.content} />

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
            iconName={!likeThis ? "heart" : "heart-dislike"}
            color={!likeThis ? colorPalate.primary : colorPalate.grey}
            iconSize={22}
            onPress={() => likeHandle(data.id, myUser.id)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <SmallText text={`${likesCount}`} />
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
    justifyContent: "center",
    alignItems: "flex-start",
    marginRight: 10,
  },
  username: {
    marginBottom: 5,
  },
  infoText: {
    color: "#888",
    fontSize: 12,
    marginRight: 3,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Post;
