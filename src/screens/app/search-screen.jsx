import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

//Custom components
import BigText from "../../components/texts/big-text/big-text";
import CustomSearchBar from "../../components/inputs/search-bar/custom-search-bar";

const SearchScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BigText text={"חיפוש"} />
        </View>

        <CustomSearchBar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 8,
    width: "100%",
  },
});

export default SearchScreen;
