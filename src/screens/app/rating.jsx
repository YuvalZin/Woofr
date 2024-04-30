import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

//
// import { useSelector } from "react-redux";
// import { selectAuth } from "../../../redux/authSlice";

// import { getVets } from "../../../utils/api/vet";

//Custom Components
import RegularText from "./texts/regular-text/regular-text";
import SmallText from "./texts/small-text/small-text";
import RatingBar from "./cards/rating-bar/rating-bar";
import ProfessionalCheckbox from "./cards/professional-checkbox/professional-checkbox";
import { Ionicons } from "@expo/vector-icons";
import { colorPalate } from "../utils/ui/colors";
import RegularTextBold from "./texts/regular-text/regular-text-bold";
//import { colorPalate } from "../../../utils/ui/colors";

const RatingScreen = ({ data }) => {
 
  //Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  const [prosReviews,setProsReviews] = useState([]);

  const fetchProsReviews = async (id) => {
    const res = await getUserReviews(id);
    setProsReviews(res);
  };

  useEffect(() => {
    fetchProsReviews(data.id);
}, [data]);

  return (

    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <RegularTextBold
          text={`${data.displayName}`}
          style={styles.username}
        />
        <RatingBar disabled={true} rating={data.ratingScore} />
      </View>
      <View>
        {prosReviews.length > 0 && (
          <ReviewSlider
            arr={prosReviews}
            onImgPress={moveToProfile}
            setRender={onRefresh}
          />
        )}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"93%",
    alignSelf:"center",
    borderWidth:1,
    borderRadius:20,
    borderColor: colorPalate.primaryLight,
    marginBottom: 10,
    padding: 20,
  },
  infoContainer: {
    flexDirection: "column",
    width: "100%",
    padding: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarContainer: {
    marginRight: 10,
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 0,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 12,
    color: "#888",
    marginBottom: 5,
  },
  descriptionText: {
    marginBottom: 10,
  },
  bottomContainer: {
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 8,
  },
  bottomText: {
    marginBottom: 5,
  },
});

export default RatingScreen;
