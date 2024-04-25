import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { colorPalate } from "../../../utils/ui/colors";

const MessageBubble = ({ message, myUser }) => {
  const isMyMessage = message.from === (myUser && myUser.email);
  return (
    <View
      style={
        isMyMessage ? styles.myMessageContainer : styles.otherMessageContainer
      }
    >
      <Text style={styles.text}>{message.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  myMessageContainer: {
    backgroundColor: colorPalate.primary,
    borderRadius: 8,
    padding: 12,
    margin: 8,
    alignSelf: "flex-start",
  },
  otherMessageContainer: {
    backgroundColor: colorPalate.grey,
    borderRadius: 8,
    padding: 12,
    margin: 8,
    alignSelf: "flex-end",
  },
  text: {
    fontSize: 18,
    color: colorPalate.white,
  },
});

export default MessageBubble;
