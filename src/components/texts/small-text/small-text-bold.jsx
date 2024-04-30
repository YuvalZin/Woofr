import React from "react";
import { StyleSheet, Text } from "react-native";
import { useFonts, Assistant_400Regular,Assistant_700Bold } from '@expo-google-fonts/assistant';

const SmallTextBold = ({ text, english = false }) => {
  const textAlign = !english ? "left" : "right";

  const [fontsLoaded] = useFonts({
    Assistant_400Regular,
    Assistant_700Bold
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // or any loading indicator
  }

  return (
    <Text style={[styles.text, { textAlign, fontFamily: 'Assistant_700Bold' }]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: "normal",
    textAlign: "left",
  },
});

export default SmallTextBold;
