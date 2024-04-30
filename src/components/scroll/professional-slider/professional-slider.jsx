import React from "react";
import { StyleSheet, FlatList, View } from "react-native";

// Custom components
import ProfessionalCard from "../../cards/professional-card/professional-card";
import EmptyCard from "../../cards/empty-card/empty-card";

const VetSlider = ({ arr, onCardPress }) => {
  const renderPostItem = ({ item }) => {
    return (
      <ProfessionalCard key={item.id} data={item} onCardPress={onCardPress} />
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
    paddingTop: 15,
    paddingBottom: 100,
    flex: 1,
    width: "100%",
    backgroundColor: "#F0F2F5",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default VetSlider;
