import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

//
import { useSelector } from "react-redux";
import { selectAuth } from "../../../redux/authSlice";

//Custom Components
import RegularText from "../../texts/regular-text/regular-text";
import SmallText from "../../texts/small-text/small-text";
import RatingBar from "../rating-bar/rating-bar";

//import { colorPalate } from "../../../utils/ui/colors";

const ProfessionalCard = ({ data, onCardPress }) => {
  const [vetData, setVetData] = useState({
    id: "string",
    displayName: "string",
    address: "string",
    phone: "string",
    profileImage: "string",
    description: "string",
    specialization: "string",
    ratingScore: 0,
    availability24_7: true,
    sellsProducts: true,
    vetToHome: true,
    notes: "string",
    verificationStatus: "string",
    activeWoofr: true,
    city: "string",
    userId: "string",
  });

  const fetchVetInfo = async () => {
    setVetData(data);
  };

  useEffect(() => {
    fetchVetInfo();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={() => {
            onCardPress(data.userId);
          }}
        >
          <Image
            source={{
              uri: vetData.profileImage,
            }}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <RegularText
            text={`${vetData.displayName}`}
            style={styles.username}
          />
          <RegularText
            text={`${vetData.specialization}`}
            style={styles.bottomText}
          />
          <SmallText
            text={`${vetData.address}, ${vetData.phone}`}
            style={styles.infoText}
          />
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <SmallText text={vetData.description} style={styles.descriptionText} />
      </View>
      <TouchableOpacity
        onPress={() => {
          onRatingPress();
        }}
      >
        <RatingBar disabled={true} rating={vetData.ratingScore} onPress={() => {
        }} />
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 25,
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

export default ProfessionalCard;
