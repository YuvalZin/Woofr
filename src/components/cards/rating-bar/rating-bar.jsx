import React from "react";
import { View, StyleSheet } from "react-native";
import { AirbnbRating } from "react-native-ratings";

const RatingBar = ({ rating }) => {
  return (
    <View style={styles.container}>
      <AirbnbRating
        isDisabled={true}
        count={5}
        reviews={[]}
        defaultRating={rating}
        size={20}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RatingBar;
