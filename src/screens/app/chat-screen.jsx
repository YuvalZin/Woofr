import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

//
import GoBackButton from "../../components/buttons/go-back/go-back-button";

const ChatScreen = () => {
  const navigation = useNavigation();

  const moveToChats = () => {
    navigation.navigate("Chats");
  };

  return (
    <SafeAreaView>
      <GoBackButton onPress={moveToChats} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default ChatScreen;
