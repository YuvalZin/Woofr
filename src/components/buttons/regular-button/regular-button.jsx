//regular-button.tsx

import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

//Import custom components
import RegularText from "../../texts/regular-text/regular-text";

const RegularButton = ({ text, onPress, width }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <RegularText text={text} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

export default RegularButton;
