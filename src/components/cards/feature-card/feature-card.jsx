import React from "react";
import { StyleSheet, View, useWindowDimensions, Image } from "react-native";

//Import custom components
import RegularText from "../../texts/regular-text/regular-text";
import BigText from "../../texts/big-text/big-text";

const FeatureCard = ({ feature }) => {
  const windowWidth = useWindowDimensions().width;

  return (
    <View style={[styles.cardContainer, { width: windowWidth - 20 }]}>
      <View style={styles.textContainer}>
        <View style={styles.header}>
          <Image source={{ uri: feature.image }} style={styles.image} />
          <BigText text={feature.name} />
          <RegularText text={feature.description} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    elevation: 3,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    padding: 10,
  },
  image: {
    width: 160,
    height: 160,
    objectFit: "contain",
  },
  header: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    direction: "rtl",
    textAlign: "left",
    paddingRight: 20,
    paddingBottom: 20,
  },
});

export default FeatureCard;
