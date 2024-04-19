import React from "react";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";

// Custom components
import SmallText from "../../texts/small-text/small-text";

const PostFilter = ({ index, setIndex }) => {
  return (
    <View style={styles.rowContainer}>
      <TouchableOpacity
        style={[styles.itemContainer, index === 0 && styles.activeItem]}
        onPress={() => setIndex(0)}
      >
        <Image
          source={require("../../../../assets/png/dog-paw.png")}
          style={styles.image}
        />
        <SmallText text="וטרינרים" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.itemContainer, index === 1 && styles.activeItem]}
        onPress={() => setIndex(1)}
      >
        <Image
          source={require("../../../../assets/png/food.png")}
          style={styles.image}
        />
        <SmallText text="ציוד ומזון" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.itemContainer, index === 2 && styles.activeItem]}
        onPress={() => setIndex(2)}
      >
        <Image
          source={require("../../../../assets/png/salon.png")}
          style={styles.image}
        />
        <SmallText text="טיפוח" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.itemContainer, index === 3 && styles.activeItem]}
        onPress={() => setIndex(3)}
      >
        <Image
          source={require("../../../../assets/png/ball.png")}
          style={styles.image}
        />
        <SmallText text="מפגשים" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    
    width: "100%",
    flexDirection: "row-reverse",
    justifyContent: "space-evenly",
    padding: 4,
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 20,
  },
  image: {
    width: 65,
    height: 65,
    objectFit: "cover",
  },
  activeItem: {
    backgroundColor: "#565AC8",
  },
});

export default PostFilter;
