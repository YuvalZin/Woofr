import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";

//Import types data
import { types } from "../../../utils/data/types";

// Import app colors palate
import { colorPalate } from "../../../utils/ui/colors";

const ExploreCard = ({ data, onPress }) => {
  const screenWidth = Dimensions.get("window").width;

  // Find the corresponding type object from the types array
  const selectedType = types.find((item) => item.label === data.type);

  // Extract color from the selected type object or use a default color
  const color = selectedType ? selectedType.color : colorPalate.primary;

  return (
    <TouchableOpacity
      style={[styles.container, { width: screenWidth }]}
      onPress={() => {
        onPress(data.userId);
      }}
    >
      <View style={styles.cardBackground}>
        <ImageBackground
          source={{
            uri: data.profileImage,
          }}
          style={styles.img}
        />

        <View style={[styles.header, { backgroundColor: color }]}>
          <Text style={styles.title}>{data.type}</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{data.displayName}</Text>
          <Text style={styles.desc}>
            {data.description.length > 80
              ? data.description.slice(0, 80) + "..."
              : data.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  cardBackground: {
    borderRadius: 8,
    alignItems: "center",
    elevation: 3,
    borderRadius: 20,
  },
  img: {
    width: 320,
    height: 320,
    resizeMode: "cover",
    borderRadius: 20,
  },
  header: {
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: colorPalate.primary,
    padding: 8,
    color: colorPalate.primary,
  },
  textContainer: {
    position: "absolute",
    left: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 8,
    width: 320,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    color: colorPalate.white,
    fontSize: 25,
    fontWeight: "bold",
    padding: 3,
    textAlign: "left",
  },
  desc: {
    color: colorPalate.white,
    fontSize: 15,
    padding: 4,
    textAlign: "left",
  },
});

export default ExploreCard;
