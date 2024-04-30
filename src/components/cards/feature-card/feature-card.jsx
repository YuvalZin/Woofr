import React from "react";
import { StyleSheet, View, useWindowDimensions, Image } from "react-native";

//Import custom components
import RegularText from "../../texts/regular-text/regular-text";
import BigText from "../../texts/big-text/big-text";
import BigTextBold from "../../texts/big-text/big-text-bold";

const FeatureCard = ({ feature }) => {
  const windowWidth = useWindowDimensions().width;

  return (
    <View style={[styles.cardContainer, { width: windowWidth - 20 }]}>
      <View style={styles.textContainer}>
        <View style={styles.header}>
          <Image source={{ uri: feature.image }} style={styles.image} />
          <BigTextBold text={feature.name} />
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
    width: 140,
    height: 140,
    objectFit: "contain",
    alignSelf:"center",
    marginBottom:25
  },
  header: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    direction: "rtl",
    textAlign: "right",
    paddingHorizontal: 40,
    paddingBottom: 20,
  },
});

export default FeatureCard;
