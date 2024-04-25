//go-back-button.jsx

import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

//import expo icons
import { Ionicons } from "@expo/vector-icons";

const GoBackButton = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Ionicons name="arrow-back" size={36} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingLeft: 10,
    marginTop: 10,
    width: "100%",
  },
  button: {
    padding: 10,
  },
});

export default GoBackButton;
