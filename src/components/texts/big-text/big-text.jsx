import React from "react";
import { StyleSheet, Text } from "react-native";

const BigText = ({ text, english = false }) => {
  const textAlign = english ? "right" : "left";
  return <Text style={[styles.text, { textAlign }]}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 27,
    fontWeight: "bold",
    textAlign: "left",
    padding: 3,
  },
});

export default BigText;
