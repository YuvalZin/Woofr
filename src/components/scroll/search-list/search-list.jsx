import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import UserCard from "../../cards/user-card/user-card";

const SearchList = ({ users, onClick }) => {
  if (users == null) return null;
  const renderUserItem = ({ item, index }) => (
    <UserCard key={index} data={item} onClick={onClick} />
  );
  return users.length > 0 ? (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={true}
        keyExtractor={(item) => item.id.toString()}
        data={users}
        renderItem={({ item, index }) => renderUserItem({ item, index })}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginTop: 10,
  },
});

export default SearchList;
