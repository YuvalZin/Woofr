import React from "react";
import { StyleSheet, FlatList, View } from "react-native";

// Custom components
import VetCard from "./vetCard";
import EmptyCard from "../../components/cards/empty-card/empty-card";

const VetSlider = ({ arr, setRender }) => {
  const renderPostItem = ({ item }) => {
    return (
      <VetCard
        key={item.id}
        data={item}
        // onImgPress={onImgPress}
        setRender={setRender}
      />
    );
  };

  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.container}>
        {arr.length > 0 ? (
          <FlatList
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            data={arr}
            renderItem={({ item, index }) => renderPostItem({ item, index })}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <EmptyCard text={"אין תוצאות לסינון המבוקש.."} iconName="bug" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "95%",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default VetSlider;
