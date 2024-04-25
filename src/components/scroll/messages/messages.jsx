import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

//Custom components
import MessageBubble from "../../cards/message-bubble/message-bubble";

const Messages = ({ arr, myUser }) => {
  const renderMessageItem = ({ item }) => {
    return <MessageBubble key={item.MessageId} message={item} myUser={myUser} />;
  };
  return (
    <View style={styles.container}>
      {arr.length > 0 ? (
        <FlatList
          data={arr}
          renderItem={renderMessageItem}
          keyExtractor={(item) => item.MessageId}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Messages;
