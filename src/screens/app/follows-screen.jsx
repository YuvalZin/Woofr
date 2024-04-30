import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

//Navigation handler
import { useNavigation, useRoute } from "@react-navigation/native";
import GoBackButton from "../../components/buttons/go-back/go-back-button";
import SearchList from "../../components/scroll/search-list/search-list";
import BigText from "../../components/texts/big-text/big-text";

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
      <GoBackButton
        onPress={() => {
          navigation.goBack();
        }}
      />
      <BigText text={title} />
      <SearchList users={arr} onClick={moveToUserProfile} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FollowsScreen;
