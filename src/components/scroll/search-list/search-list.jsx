import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import UserCard from "../../cards/user-card/user-card";
import EmptyCard from "../../cards/empty-card/empty-card";

const SearchList = ({ users, onClick }) => {
  if(users == null) return null;
  const renderUserItem = ({ item, index }) => <UserCard key={index} data={item} onClick={onClick} />;
  return (
    <View style={styles.container}>
      {users.length > 0 ? (
        <FlatList
        scrollEnabled={true}
        keyExtractor={(item) => item.id.toString()}
        data={users}
        renderItem={({ item, index }) => renderUserItem({ item, index })}
        showsHorizontalScrollIndicator={false}
        />
      ) : (
        <EmptyCard text={"הקלד כדי להציג תוצאות"} iconName="people-outline" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "95%",
    backgroundColor: "#ffffff",
    borderRadius:10,
    alignItems: "flex-start",
    marginTop:10,
  },
});

export default SearchList;