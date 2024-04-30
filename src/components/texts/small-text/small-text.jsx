import React from "react";
import { StyleSheet, Text } from "react-native";
import { useFonts, Assistant_400Regular } from '@expo-google-fonts/assistant';

const SmallText = ({ text, english = false }) => {
  const textAlign = !english ? "left" : "right";

  const [fontsLoaded] = useFonts({
    Assistant_400Regular,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // or any loading indicator
  }

  return (
    <Text style={[styles.text, { textAlign, fontFamily: 'Assistant_400Regular' }]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: "normal",
    textAlign: "left",
  },
});

export default SmallText;
