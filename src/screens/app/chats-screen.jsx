import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";

//Custom components
import BigText from "../../components/texts/big-text/big-text";
import Chats from "../../components/scroll/chats/chats";

import { getUserChats } from "../../utils/api/chat";

const ChatsScreen = ({ navigation }) => {
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  const [chats, setChats] = useState([]);

  const moveToChat = (chat) => {
    navigation.navigate("ChatScreen", { data: chat });
  };

  const loadChats = async () => {
    const res = getUserChats(myUser.id);
    setChats(res);
  };

  // useEffect(() => {
  //   loadChats();
  // }, [myUser]);

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
    justifyContent: "flex-start",
    padding: 8,
    width: "100%",
  },
});

export default ChatsScreen;
