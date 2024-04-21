import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

//Color palate for the app
import { colorPalate } from "../../../utils/ui/colors";

//Custom components
import IconButton from "../../buttons/icon-button/icon-button";

const CustomSearchBar = () => {
  const [value, setValue] = useState("");

  const onClick = () => {};

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        autoFocus
        value={value}
        onChangeText={(event) => {
          setValue(event);
        }}
      />
      <View style={styles.iconContainer}>
        <IconButton
          color={colorPalate.secondary}
          iconName={"search-outline"}
          onPress={onClick}
          iconSize={22}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 3,
    padding: 4,
    flexDirection: "row",
  },
  input: {
    padding: 6,
  },
  iconContainer: {
    backgroundColor: "red",
  },
});

export default CustomSearchBar;
