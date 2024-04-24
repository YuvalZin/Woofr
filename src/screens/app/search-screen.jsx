import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import BigText from "../../components/texts/big-text/big-text";
import CustomSearchBar from "../../components/inputs/search-bar/custom-search-bar";
import SearchList from "../../components/scroll/search-list/search-list";
import { SearchUser } from "../../utils/api/user";

const SearchScreen = () => {
  const [users, setUsers] = useState([]);

  const fetchSearchResult = async (text) => {
    if (text == "") setUsers([]);
    else {
      const res = await SearchUser(text);
      setUsers(res);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BigText text={"חיפוש"} />
      </View>
      <CustomSearchBar onPressSearch={fetchSearchResult} />
      <SearchList users={users} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    padding: 8,
    width: "100%",
    alignItems: "flex-start",
  },
});

export default SearchScreen;