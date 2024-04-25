import React, { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  ScrollView,
} from "react-native";

//Custom components
import ChatCard from "../../cards/chat-card/chat-card";
import EmptyCard from "../../cards/empty-card/empty-card";

const Chats = ({ arr, onClick }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Perform any data fetching or other tasks here
    // Once tasks are complete, set refreshing to false
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Simulating a delay for demonstration purposes
  };

  const renderChatItem = ({ item }) => {
    return <ChatCard key={item.chatID} onClick={onClick} chat={item} />;
  };

  return (
    <View style={styles.container}>
      {arr.length > 0 ? (
        <FlatList
          refreshing={refreshing}
          onRefresh={onRefresh}
          data={arr}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.chatID}
        />
      ) : (
        <EmptyCard
          text={"אין שיחות שלך עם אף אחד לצערנו"}
          iconName={"chatbubble-ellipses-outline"}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chats;
