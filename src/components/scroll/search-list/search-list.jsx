import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

// Custom components
import UserCard from "../../cards/user-card/user-card";
import EmptyCard from "../../cards/empty-card/empty-card";

const SearchList = ({ arr }) => {
  const moveToProfile = (id) => {};

  const renderUserItem = ({ item, index }) => {
    return <UserCard key={item.id} data={item} />;
  };

  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.container}>
        {!arr.length > 0 ? (
          <FlatList
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            data={arr}
            renderItem={({ item, index }) => renderUserItem({ item, index })}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <EmptyCard
            text={"לא נמצאו משתמשים עם השם הזה"}
            iconName="people-outline"
          />
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

export default SearchList;
