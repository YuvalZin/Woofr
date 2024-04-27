import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

//Importing function from the API file
import { SearchUser } from "../../utils/api/user";

//Navigation handler
import { useNavigation } from "@react-navigation/native";

//Custom components
import BigText from "../../components/texts/big-text/big-text";
import CustomSearchBar from "../../components/inputs/search-bar/custom-search-bar";
import SearchList from "../../components/scroll/search-list/search-list";

const SearchScreen = () => {
  // Define state variable 'users' using the 'useState' hook, initialized as an empty array
  const [users, setUsers] = useState([]);

  //Importing the useNavigation hook from React Navigation to access navigation prop
  const navigation = useNavigation();

  // Asynchronously fetches search results based on the provided 'text'.
  const fetchSearchResult = async (text) => {
    if (text === "") {
      // If the text is empty, reset the 'users' state to an empty array.
      setUsers([]);
    } else {
      // Otherwise, call the 'SearchUser' function with the provided text and update the 'users' state with the result.
      const res = await SearchUser(text);
      setUsers(res);
    }
  };

  // Navigates to the user profile screen with the specified 'id'.
  const moveToUserProfile = (id) => {
    navigation.navigate("search-profile", { id: id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BigText text={"חיפוש"} />
      </View>
      <CustomSearchBar onPressSearch={fetchSearchResult} />
      <SearchList users={users} onClick={moveToUserProfile} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 8,
    width: "100%",
    alignItems: "flex-start",
  },
});

export default SearchScreen;
