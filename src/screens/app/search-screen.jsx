import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

//Custom components
import BigText from "../../components/texts/big-text/big-text";
import CustomSearchBar from "../../components/inputs/search-bar/custom-search-bar";
import SearchList from "../../components/scroll/search-list/search-list";

const SearchScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    var data = [
      {
        birthday: "1996-07-22T00:00:00",
        email: "benyyoulove@gmail.com",
        firstName: "בני",
        gender: "male",
        id: "aae3362a-4e7e-4aa3-b7eb-002a5e058a0e",
        lastName: "חנונוב",
        likeTimestamp: "0001-01-01T00:00:00",
        password: "Aa123456",
        profilePictureUrl:
          "https://firebasestorage.googleapis.com/v0/b/woofr-c79ab.appspot.com/o/profile%2Faae3362a-4e7e-4aa3-b7eb-002a5e058a0e?alt=media&token=8a534764-3a62-495a-8f9e-ddc0204a69ea",
        token:
          "c53990ed8ba17c7b588a7372df6f862ba700e7df7c119094c217a659585df212",
      },
      {
        birthday: "1996-07-22T00:00:00",
        email: "benyyoulove@gmail.com",
        firstName: "בני",
        gender: "male",
        id: "aae3362a-4e7e-4aa3-b7eb-002a5e058a0e",
        lastName: "חנונוב",
        likeTimestamp: "0001-01-01T00:00:00",
        password: "Aa123456",
        profilePictureUrl:
          "https://firebasestorage.googleapis.com/v0/b/woofr-c79ab.appspot.com/o/profile%2Faae3362a-4e7e-4aa3-b7eb-002a5e058a0e?alt=media&token=8a534764-3a62-495a-8f9e-ddc0204a69ea",
        token:
          "c53990ed8ba17c7b588a7372df6f862ba700e7df7c119094c217a659585df212",
      },
      {
        birthday: "1996-07-22T00:00:00",
        email: "benyyoulove@gmail.com",
        firstName: "בני",
        gender: "male",
        id: "aae3362a-4e7e-4aa3-b7eb-002a5e058a0e",
        lastName: "חנונוב",
        likeTimestamp: "0001-01-01T00:00:00",
        password: "Aa123456",
        profilePictureUrl:
          "https://firebasestorage.googleapis.com/v0/b/woofr-c79ab.appspot.com/o/profile%2Faae3362a-4e7e-4aa3-b7eb-002a5e058a0e?alt=media&token=8a534764-3a62-495a-8f9e-ddc0204a69ea",
        token:
          "c53990ed8ba17c7b588a7372df6f862ba700e7df7c119094c217a659585df212",
      },
    ];

    setUsers(data);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BigText text={"חיפוש"} />
        </View>
        <CustomSearchBar />
        <View>
          <SearchList arr={users} />
        </View>
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
