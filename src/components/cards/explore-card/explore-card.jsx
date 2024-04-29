import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

// Import app colors palate
import { colorPalate } from "../../../utils/ui/colors";

// Custom components
import RegularText from "../../texts/regular-text/regular-text";
import SmallText from "../../texts/small-text/small-text";

const ExploreCard = ({ data }) => {
  const screenWidth = Dimensions.get("window").width;

  return (
    <TouchableOpacity style={[styles.container, { width: screenWidth }]}>
      <View style={styles.cardBackground}>
        <Image
          source={{
            uri: "https://media.istockphoto.com/id/1423830925/photo/young-vet-using-tablet-pc-at-her-work.jpg?s=612x612&w=0&k=20&c=fBBv9PcVYkJVgKC0xhsGBK8Y-1eHP6B37cK8GOh0k8s=",
          }}
          style={styles.img}
        />

        <View style={styles.textContainer}>
          <RegularText text={"דוקטור רחמנוב"} />
          <SmallText text={"וטרינר מיוחד שעושה קסמים."} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
  },
  cardBackground: {
    borderRadius: 8,
    overflow: "hidden",
    width: 340,
    alignItems: "center",
    padding: 4,
    elevation: 5,
  },
  img: {
    width: 310,
    height: 310,
    resizeMode: "cover",
    borderRadius: 20,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ExploreCard;
