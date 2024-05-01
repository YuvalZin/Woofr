import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, ScrollView, TextInput,Image,TouchableOpacity, Button } from "react-native";

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
import { getProReviews, insertReview } from "../../utils/api/review";
import BigText from "../../components/texts/big-text/big-text";
import RegularText from "../../components/texts/regular-text/regular-text";
import AddReview from "../../components/buttons/add-review/add-review";
import { Snackbar } from "react-native-paper";

const RatingScreen = () => {
  //Importing the useNavigation hook from React Navigation to access navigation prop
  const navigation = useNavigation();

  // Extracts the 'id' parameter from the current route.
  const route = useRoute();
  const { data } = route.params;
  //Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  // State for storing text to be displayed in the and visibility of the snackbar
  const [snackBarText, setSnackBarText] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  //State to hold reviews
  const [prosReviews, setProsReviews] = useState([]);
  const [proProfile, setProProfile] = useState([]);


  const [review, setReview] = useState({
    id: uuid.v4().toString(),
    userId: myUser.id,
    proUserId: data.userId,
    reviewText: "",
    rating: 0,
    datePosted: new Date(),
  });

  const handleRating = (value) => {
    // Update the rating when it changes
    setReview({ ...review, rating: value });
  };

  const fetchProsReviews = async (id) => {
    setProProfile(data);
    console.log(data);
    const res = await getProReviews(id);
    setProsReviews(res);
  };

  useEffect(() => {
    fetchProsReviews(data.userId);
  }, []);


  // Function to handle Snackbar
  const showSnackbar = (message, duration) => {
    setSnackBarText(message);
    setSnackbarOpen(true);

    // Close the snackbar after the specified duration
    setTimeout(() => {
      setSnackbarOpen(false);
    }, duration);
  };
  const uploadReview = async () => {
    // if (!rating) {
    //   showSnackbar("חייב לבחור דירוג בין 1 ל5 כוכבים", 3000);
    //   return;
    // }
    // if (review.reviewText.length < 10) {
    //   showSnackbar("ביקורת חייבת להכיל לפחות 10 תווים", 3000);
    //   return;
    // }
    // Set the screen to loading state
    // setLoading(true);
    console.log(review);
    //API post method to upload the image
    const res = await insertReview(review);

    if (res) {
      // showSnackbar("הפוסט עלה בהצלחה", 1500);
      fetchProsReviews(data.userId);
      // navigation.goBack();
    } else {
      // setLoading(false);
      // showSnackbar("משהו לא עבד נסה שוב", 3000);
    }
  };
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
          <TouchableOpacity
            style={styles.avatarContainer}
          >
            <Image
              source={{
                uri: proProfile.profileImage,
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>

          <View style={{ paddingBottom: 20 }}>
            <RatingBar disabled={false} rating={0} onFinishRating={handleRating} />
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
          <AddReview onPress={uploadReview} />
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
    backgroundColor: "white",
    borderColor: "#e8e8e8",
    borderRadius: 5,
    borderWidth: 2,
    width: "85%",
    padding: 12,

  },
  textInput: {
    height: 80,
    textAlign: "right",
    padding: 3,
    fontSize: 16,
  },
  avatarContainer: {
    marginTop:20,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
});

export default RatingScreen;
