import React from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import ExploreCard from "../../cards/explore-card/explore-card";

const ExploreSlider = ({ arr, onPress }) => {
  const renderExploreItem = ({ item }) => {
    return <ExploreCard key={item.messageId} data={item} onPress={onPress} />;
  };

  return (
    <View>
      <FlatList
        horizontal
        pagingEnabled
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        data={arr}
        renderItem={({ item, index }) => renderExploreItem({ item, index })}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ExploreSlider;
