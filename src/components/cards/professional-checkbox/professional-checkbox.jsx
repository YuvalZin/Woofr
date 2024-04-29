import React from "react";
import { StyleSheet, View } from "react-native";

import { colorPalate } from "../../../utils/ui/colors";

import Checkbox from "expo-checkbox";

//Custom components
import SmallText from "../../texts/small-text/small-text";

const ProfessionalCheckbox = ({ availability, sells, toHome }) => {
  return (
    <View style={styles.row}>
      <View style={styles.col}>
        <SmallText text={"זמין כל הזמן"} />
        <Checkbox value={availability} color={colorPalate.primary} />
      </View>

      <View style={styles.col}>
        <SmallText text={"מוכר מוצרים"} />
        <Checkbox value={sells} color={colorPalate.primary} />
      </View>
      <View style={styles.col}>
        <SmallText text={"מגיע עד הבית"} />
        <Checkbox value={toHome} color={colorPalate.primary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    marginTop: 5,
    padding: 6,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  col: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
});

export default ProfessionalCheckbox;
