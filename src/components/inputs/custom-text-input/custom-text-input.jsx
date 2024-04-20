import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { colorPalate } from "../../../utils/ui/colors";

const CustomTextInput = ({
  placeholder,
  onChangeText,
  value,
  width,
  english = false,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          { width: width, textAlign: !english ? "right" : "left" },
        ]}
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
    textAlign: "right",
  },
});

export default CustomTextInput;
