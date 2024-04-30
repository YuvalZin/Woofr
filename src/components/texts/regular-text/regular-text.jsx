import React from "react";
import { StyleSheet, Text } from "react-native";
import { useFonts, Assistant_400Regular,Assistant_700Bold  } from '@expo-google-fonts/assistant';

const RegularText = ({ text, english = false }) => {
  const textAlign = !english ? "left" : "right";

  const [fontsLoaded] = useFonts({
    Assistant_400Regular,
    Assistant_700Bold
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // or any loading indicator
  }

  return (
    <Text style={[styles.text, { fontFamily: 'Assistant_400Regular' }]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign:"right",
    padding: 4,
  },
});

export default RegularText;
