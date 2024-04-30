import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

//Navigation handler
import { useNavigation } from "@react-navigation/native";

const FollowsScreen = ({ route }) => {

  const { follows } = route.params;
  // Define state variable 'users' using the 'useState' hook, initialized as an empty array
  const [users, setUsers] = useState([]);

  //Importing the useNavigation hook from React Navigation to access navigation prop
  const navigation = useNavigation();

  setUsers(follows);

  // Navigates to the user profile screen with the specified 'id'.
  const moveToUserProfile = (id) => {
    navigation.navigate("search-profile", { id: id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchList users={users} onClick={moveToUserProfile} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {

    flex: 1,
  },

});

export default FollowsScreen;
