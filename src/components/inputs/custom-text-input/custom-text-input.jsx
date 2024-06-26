import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

//Import app color palate
import { colorPalate } from "../../../utils/ui/colors";

const CustomTextInput = ({ placeholder, onChangeText, value, width }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { width: width }]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: colorPalate.grey,
    borderRadius: 5,
    padding: 10,
    justifyContent: "flex-start",
    textAlign: "right",
  },
});

export default CustomTextInput;
