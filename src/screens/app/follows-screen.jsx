import React from "react";
import { SafeAreaView, StyleSheet,View } from "react-native";

//Navigation handler
import { useNavigation, useRoute } from "@react-navigation/native";
import GoBackButton from "../../components/buttons/go-back/go-back-button";
import SearchList from "../../components/scroll/search-list/search-list";
import BigText from "../../components/texts/big-text/big-text";
import RegularTextBold from "../../components/texts/regular-text/regular-text-bold";

const FollowsScreen = () => {
  // Extracts the 'id' parameter from the current route.
  const route = useRoute();
  const { arr, title } = route.params;

  //Importing the useNavigation hook from React Navigation to access navigation prop
  const navigation = useNavigation();

  // Navigates to the user profile screen with the specified 'id'.
  const moveToUserProfile = (id) => {
    navigation.navigate("profile-other", { id: id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>

        <GoBackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
        <RegularTextBold text={title} />
      </View>

      <SearchList users={arr} onClick={moveToUserProfile} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
    borderBottomWidth: 5,
    borderBottomColor: "#F0F2F5",
  },
});

export default FollowsScreen;
