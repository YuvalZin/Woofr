import React from "react";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

//Custom components
import BigText from "../../texts/big-text/big-text";

const EmptyCard = ({ text, iconName }) => {
  return (
    <View style={styles.container}>
      <Ionicons name={iconName} size={62} color="black" />
      <BigText text={text} english={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    textAlign: "center",
  },
});

export default EmptyCard;
