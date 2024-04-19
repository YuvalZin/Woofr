import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colorPalate } from "../../../utils/ui/colors";

const AddPost = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <View style={styles.row}>
          <Ionicons name="cloud-upload" size={24} color="white" />
          <Text style={styles.text}>{"הוסף פוסט"}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 8,
  },
  button: {
    backgroundColor: colorPalate.primary,
    padding: 6,
    borderRadius: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    alignItems: "center",
  },
  text: {
    color: colorPalate.white,
    fontSize: 20,
    padding: 8,
  },
});

export default AddPost;
