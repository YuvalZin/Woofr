import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

//Color palate for the app
import { colorPalate } from "../../../utils/ui/colors";

//Custom components
import IconButton from "../../buttons/icon-button/icon-button";

const CustomSearchBar = ({ onPress }) => {
  const [value, setValue] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={(event) => {
          setValue(event);
        }}
        style={styles.input}
        placeholder="כתוב פה את ההודעה שלך..."
        placeholderTextColor="#A9A9A9"
      />
      <View style={styles.button}>
        <IconButton
          onPress={onPress}
          color={colorPalate.primary}
          iconName={"search"}
          iconSize={21}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginBottom: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    margin: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    textAlign: "right",
    padding: 14,
  },
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: "absolute",
    left: 10,
  },
});

export default CustomSearchBar;
