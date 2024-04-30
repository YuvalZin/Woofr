import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

//App color palate
import { colorPalate } from "../../utils/ui/colors";

// Import necessary hooks from React Navigation
import { useNavigation, useRoute } from "@react-navigation/native";

//Redux state management
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";

//Custom Components
import RegularTextBold from "../../components/texts/regular-text/regular-text-bold";
import RatingBar from "../../components/cards/rating-bar/rating-bar";
import GoBackButton from "../../components/buttons/go-back/go-back-button";

const RatingScreen = () => {
  //Importing the useNavigation hook from React Navigation to access navigation prop
  const navigation = useNavigation();

  // Extracts the 'id' parameter from the current route.
  const route = useRoute();
  const { data } = route.params;

  //Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  //State to hold reviews
  const [prosReviews, setProsReviews] = useState([]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <GoBackButton
          onPress={() => {
            navigation.goBack();
          }}
        />

        {/* <View style={styles.infoContainer}>
          <RegularTextBold
            text={`${data.displayName}`}
            style={styles.username}
          />
          <RatingBar disabled={true} rating={data.ratingScore} />
        </View>

        <View>
          {prosReviews.length > 0 && <ReviewSlider arr={prosReviews} />}
        </View> */}
      </View>
    </SafeAreaView>
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

export default RatingScreen;
