import React from "react";
import { View, StyleSheet } from "react-native";
import { AirbnbRating } from "react-native-ratings";

const RatingBar = ({ rating, disabled ,onFinishRating}) => {
  return (
    <View style={styles.container}>
      <AirbnbRating
        isDisabled={disabled}
        count={5}
        reviews={[]}
        defaultRating={rating}
        size={20}
        onFinishRating={onFinishRating}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RatingBar;
