import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, ScrollView, TextInput,Button } from "react-native";

//App color palate
import { colorPalate } from "../../utils/ui/colors";

// Import necessary hooks from React Navigation
import { useNavigation, useRoute } from "@react-navigation/native";
import uuid from "react-native-uuid";

//Redux state management
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";
//Custom Components
import RegularTextBold from "../../components/texts/regular-text/regular-text-bold";
import RatingBar from "../../components/cards/rating-bar/rating-bar";
import GoBackButton from "../../components/buttons/go-back/go-back-button";
import ReviewSlider from "../../components/scroll/review-slider/review-slider"
import { getProReviews } from "../../utils/api/review";
import BigText from "../../components/texts/big-text/big-text";
import RegularText from "../../components/texts/regular-text/regular-text";
import AddReview from "../../components/buttons/add-review/add-review";
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
  const [proProfile, setProProfile] = useState([]);

  const [review, setReview] = useState({
    id: uuid.v4().toString(),
    userId: myUser.id,
    proUserId: "",
    reviewText: "",
    rating: 0,
    datePosted: new Date(),
  });
  const fetchProsReviews = async (id) => {
    setProProfile(data);
    const res = await getProReviews(id);
    setProsReviews(res);
  };

  useEffect(() => {
    fetchProsReviews(data.userId);
  }, [data]);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <GoBackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View>
          <RegularTextBold
            text={`${proProfile.displayName}`}
          />
        </View>
      </View>

      <ScrollView style={styles.container} nestedScrollEnabled={true}>
        <View style={{ alignItems: "center", paddingVertical: 30, backgroundColor: colorPalate.primary }}>
          <RegularText color={"white"}
            text={`דרגו את ${proProfile.displayName} (1 לא מומלץ - 5 מצוין)`}
          />
          <View style={{paddingBottom:20}}>
            <RatingBar disabled={false} rating={1} />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              multiline
              placeholder="הזינו כאן את הביקורת שלכם"
              value={review.reviewText}
              onChangeText={(value) => setReview({ ...review, reviewText: value })}
            />
          </View>
          <AddReview/>
        </View>
        {prosReviews.length > 0 && <ReviewSlider arr={prosReviews} />}
      </ScrollView>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
    borderBottomWidth: 0.8,

    borderBottomColor: colorPalate.lightGrey,
  },
  textInputContainer: {
    backgroundColor:"white",
    borderColor: "#e8e8e8",
    borderRadius: 5,
    borderWidth: 2,
    width: "95%",
    padding: 12,
  },
  textInput: {
    height: 100,
    textAlign: "right",
    padding: 3,
    fontSize: 16,
  },
});

export default RatingScreen;
