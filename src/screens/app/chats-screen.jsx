import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

//Redux state management
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";

//Importing function from the API file
import { getUserChats } from "../../utils/api/chat";

//Custom components
import BigText from "../../components/texts/big-text/big-text";
import Chats from "../../components/scroll/chats/chats";
import LoadingIndicator from "../../components/animation/loading-indicator/loading-indicator";

const ChatsScreen = ({ navigation }) => {
  // Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  // State variable to indicate whether data is loading
  const [loading, setLoading] = useState(true);

  // State variable to store the list of chats
  const [chats, setChats] = useState([]);

  // Function to navigate to the "chat" screen and pass the chat data as a parameter
  const moveToChat = (chat) => {
    navigation.navigate("chat", { data: chat });
  };

  const loadChats = async () => {
    try {
      const res = await getUserChats(myUser.id);
      setChats([]);
      setChats(res);
      setLoading(false);
    } catch (error) {
      console.error("Error loading chats:", error);
    }
  };

  // Effect to fetch messages when the component mounts
  // and poll for new messages every 15 seconds
  useEffect(() => {
    let intervalId;

    const fetchAndPollChats = async () => {
      await loadChats();
      intervalId = setInterval(loadChats, 1000 * 15);
    };

    fetchAndPollChats();

    // Cleanup function
    return () => {
      clearInterval(intervalId); // Use intervalId for cleanup
    };
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
