import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

// Import Ionicons from Expo vector icons
import { Ionicons } from "@expo/vector-icons";

// Import colorPalate from utils/ui/colors
import { colorPalate } from "../../../utils/ui/colors";

//Custom Components
import RegularText from "../../texts/regular-text/regular-text";
import SmallText from "../../texts/small-text/small-text";
import RatingBar from "../rating-bar/rating-bar";
import ProfessionalCheckbox from "../professional-checkbox/professional-checkbox";
import RegularTextBold from "../../texts/regular-text/regular-text-bold";

const ProfessionalProfile = ({ data, onRatingPress }) => {
  const [proData, setProData] = useState(data);

  const fetchProInfo = async () => {
    setProData(data);
  };

  useEffect(() => {
    fetchProInfo();
  }, [data]);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <RegularTextBold
          text={`${proData.displayName} | ${proData.type}`}
          style={styles.username}
        />
        <ProfessionalCheckbox
          availability={proData.availability24_7}
          sells={proData.sellsProducts}
          toHome={proData.toHome}
        />

        <View style={styles.infoRow}>
          <Ionicons name="home-outline" color={colorPalate.primary} size={18} />
          <RegularText text={`${proData.city} ${proData.address}`} />
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="call-outline" color={colorPalate.primary} size={18} />
          <RegularText text={`${proData.phone}`} />
        </View>
        <RegularText text={``} style={styles.bottomText} />
        <View style={styles.bottomContainer}>
          <SmallText
            text={proData.description}
            style={styles.descriptionText}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            onRatingPress(data);
          }}
        >
          <RatingBar disabled={true} rating={proData.ratingScore} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "93%",
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 20,
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

export default ProfessionalProfile;
