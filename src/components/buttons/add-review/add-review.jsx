import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useFonts, Assistant_400Regular } from "@expo-google-fonts/assistant";
import { FontAwesome5 } from "@expo/vector-icons";

import { colorPalate } from "../../../utils/ui/colors";
import _ from "lodash";

const AddReview = ({ onPress }) => {
  
  // Load the Assistant font
  const [fontsLoaded] = useFonts({
    Assistant_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <View style={styles.row}>
          <Text style={[styles.text, { fontFamily: "Assistant_400Regular" }]}>
            {"שליחה"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
    paddingTop: 28,
  },
  button: {
    backgroundColor: colorPalate.primaryLight,
    borderBottomWidth: 3,
    borderColor: colorPalate.white,
    padding: 6,
    borderRadius: 10,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 19,
    padding: 8,
  },
});

export default AddReview;
