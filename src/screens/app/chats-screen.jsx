import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";
import BigText from "../../components/texts/big-text/big-text";
import Chats from "../../components/scroll/chats/chats";
//import { chats } from "../../utils/data/chats";

const ChatsScreen = ({ navigation }) => {
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  const moveToChat = (chat) => {
    navigation.navigate("ChatScreen", { data: chat });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BigText text={"שיחות"} />
      </View>
      <Chats onClick={moveToChat} arr={chats} />
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
