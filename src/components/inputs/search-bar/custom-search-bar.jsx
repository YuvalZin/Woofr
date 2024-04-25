import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, View } from "react-native";

//Color palate for the app
import { colorPalate } from "../../../utils/ui/colors";

//Custom components
import IconButton from "../../buttons/icon-button/icon-button";

const CustomSearchBar = ({ onPressSearch }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (value !== "") handleSearch();
    else onPressSearch("");
  }, [value]);

  const handleSearch = () => {
    onPressSearch(value); // Pass the search query value to the onPressSearch function
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={(newValue) => {
          if (newValue !== value) {
            setValue(newValue);
          }
        }}
        style={styles.input}
        placeholder="חפש משתמשים..."
        placeholderTextColor="#A9A9A9"
      />
      <View style={styles.button}>
        <IconButton
          onPress={handleSearch}
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
    left: 10,
  },
});

export default CustomSearchBar;
