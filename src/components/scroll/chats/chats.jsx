import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

//Custom components
import ChatCard from "../../cards/chat-card/chat-card";

const Chats = ({ onClick }) => {
  // Sample data for 12 posts
  const chatsData = Array.from({ length: 12 }, (_, index) => ({
    id: index.toString(),
  }));

  const renderPostItem = ({ item }) => {
    return <ChatCard key={item.id} onClick={onClick} />;
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={chatsData}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chats;
