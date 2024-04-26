import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

//Redux state management
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";

//Custom components
import BigText from "../../components/texts/big-text/big-text";
import Chats from "../../components/scroll/chats/chats";
import LoadingIndicator from "../../components/animation/loading-indicator/loading-indicator";

//Importing function from the API file
import { getUserChats } from "../../utils/api/chat";

const ChatsScreen = ({ navigation }) => {
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);

  const moveToChat = (chat) => {
    navigation.navigate("chat", { data: chat });
  };

  const loadChats = async () => {
    const res = await getUserChats(myUser.id);
    setChats(res);
    setLoading(false);
  };

  useEffect(() => {
    loadChats();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BigText text={"שיחות"} />
      </View>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <Chats onClick={moveToChat} arr={chats} />
      )}
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
