// WelcomeScreen.js

import React, { useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//Array of features
import { features } from "../../utils/data/features";

//Custom components
import BigText from "../../components/texts/big-text/big-text";
import FeatureSlider from "../../components/scroll/feature-slider/feature-slider";
import Pagination from "../../components/animation/pagination/pagination";
import RegularButton from "../../components/buttons/regular-button/regular-button";

//Navigation handler
import { useNavigation } from "@react-navigation/native";
import { colorPalate } from "../../utils/ui/colors";

const WelcomeScreen = () => {
  const [index, setIndex] = useState(0); // State variable to store the current index
  const scrollX = useRef(new Animated.Value(0)).current; // Ref for tracking scroll position
  const navigation = useNavigation(); // Navigation object for navigating between screens

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <BigText text={"WOOFR"} />
        <FeatureSlider index={index} setIndex={setIndex} scrollX={scrollX} />

        <View style={styles.buttonContainer}>
          <RegularButton
            text={"בוא נתחיל"}
            onPress={() => {
              navigation.navigate("Signin");
            }}
            color={colorPalate.primary}
          />
        </View>
        <Pagination data={features} scrollX={scrollX} index={index} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: "center",
  },
  flatListContainer: {
    flex: 0.3,
  },
  buttonContainer: {
    width: 300,
    padding: 12,
  },
});

export default WelcomeScreen;
