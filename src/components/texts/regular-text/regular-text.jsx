import React from "react";
import { StyleSheet, Text } from "react-native";
import { useFonts, Assistant_400Regular,Assistant_700Bold  } from '@expo-google-fonts/assistant';

const RegularText = ({ text, english = false ,color,onPress}) => {
  const textAlign = !english ? "left" : "right";
   

  const [fontsLoaded] = useFonts({
    Assistant_400Regular,
    Assistant_700Bold
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // or any loading indicator
  }

  return (
    <Text onPress= {onPress} style={[styles.text, { color:color,textAlign:textAlign,fontFamily: 'Assistant_400Regular' }]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    padding: 4,
  },
});

export default RegularText;
