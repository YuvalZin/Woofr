import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

//
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";

//Custom components
import BigText from "../../components/texts/big-text/big-text";
import Chats from "../../components/scroll/chats/chats";

//Fake data
import { chats } from "../../utils/data/chats";

const ChatsScreen = () => {
  const navigation = useNavigation();

  // Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  const moveToChat = (chat) => {
    navigation.navigate("chats-chat", { data: chat });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BigText text={"שיחות"} />
        </View>
        <Chats onClick={moveToChat} arr={chats} />
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

export default ChatsScreen;
