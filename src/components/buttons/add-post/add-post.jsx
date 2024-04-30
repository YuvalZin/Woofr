import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts, Assistant_400Regular } from '@expo-google-fonts/assistant'; // Import Assistant font
import { FontAwesome5 } from '@expo/vector-icons';

import { colorPalate } from "../../../utils/ui/colors";
import _ from "lodash";

const AddPost = ({ onPress }) => {
  const texts = [
    "שתף את המחשבות שלך",
    "אל תהיו כלבים, שתפו משהו!",
    "שתף פוסט!",
    "שתף משהו... לפני שהכלב יאכל אותו!"
  ];
  const getRandomText = () => _.sample(texts); // Select a random item from the array

  // Load the Assistant font
  const [fontsLoaded] = useFonts({
    Assistant_400Regular,
  });

  if (!fontsLoaded) {
    return null; // or any loading indicator
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <View style={styles.row}>
          <FontAwesome5 name="paw" size={24} color="white" />
          <Text style={[styles.text, { fontFamily: 'Assistant_400Regular' }]}>
            {getRandomText()}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom:10,
  },
  button: {
    backgroundColor: colorPalate.primaryLight,
    borderBottomWidth:8,
    borderColor:colorPalate.primary,
    padding: 6,
    width: "100%",

  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    alignItems: "center",
  },
  text: {
    color: colorPalate.white,
    fontSize: 19,
    padding: 8,
  },
});

export default AddPost;
