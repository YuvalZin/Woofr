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
import { deletePost, getPostLikes, likePost } from "../../../utils/api/posts";
import RegularTextBold from "../../texts/regular-text/regular-text-bold";
import { AntDesign } from '@expo/vector-icons';
import RatingBar from "../rating-bar/rating-bar";

const ReviewCard = ({ data, onImgPress, setRender }) => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    profilePictureUrl: null,
  });
  const [timeStr, setTimeStr] = useState("");
  const [isMyReview, setIsMyReview] = useState();

  // Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  const deleteReviewById = async (review_id) => {
    const res = await deleteReview(review_id);
    if (res) {
      setRender();
    } else {
      Alert.alert("משהו השתבש", "הייתה בעיה למחוק את הביקורת", [
        {
          text: "שחרר",
          style: "cancel",
        },
      ]);
    }
  };

  const fetchUserInfo = async () => {
    setIsMyReview(data.userId === (myUser && myUser.id));
    if (!isMyReview) {
      const res = await GetUserInfo(data.userId);
      setUserData([]);
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
    const postTime = new Date(data.datePosted);
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
          <RegularTextBold
            text={`${userData.firstName} ${userData.lastName}`}
            style={styles.username}
          />
          <SmallText text={timeStr} style={styles.infoText} />
        </View>

        {isMyReview && (
          <View style={styles.deleteIcon}>
            <TouchableOpacity
              onPress={() => deleteReviewById(data.id)}
            >
              <AntDesign name="delete" size={22} color="lightgrey" />
            </TouchableOpacity>
          </View>
        )}

      </View>
      <View style={styles.input}>
        <RegularText text={data.reviewText} />
                <RatingBar rating={data.rating} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingHorizontal: 15,
    alignItems: "flex-start",
    
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    padding: 8,
    padding:20,
    marginBottom: 15,
  },
  deleteIcon: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  header: {
    padding: 6,
    flexDirection: "row",
  },
  avatarContainer: {
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 35,
  },


  userInfo: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginRight: 12,
  },
  username: {
    marginBottom: 3,

  },
  infoText: {
    color: "#888",
    fontSize: 12,
    marginRight: 3,
  },

});

export default ReviewCard;
