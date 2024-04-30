import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { colorPalate } from "../../../utils/ui/colors";
import SmallText from "../../texts/small-text/small-text";

const CollapseButton = ({ text, value, setValue }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setValue(!value);
      }}
    >
      <View style={styles.col}>
        <SmallText text={text} />
        <Ionicons
          size={40}
          color={colorPalate.grey}
          name={value ? "chevron-down-outline" : "chevron-up-outline"}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 4,
  },
  col: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CollapseButton;
