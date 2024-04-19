import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

//Custom components
import BigText from "../../components/texts/big-text/big-text";
import Chats from "../../components/scroll/chats/chats";

const ChatsScreen = () => {
  const navigation = useNavigation();

  const moveToChat = () => {
    navigation.navigate("Chat");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BigText text={"שיחות"} />
        </View>
        <Chats onClick={moveToChat} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 4,
    width: "100%",
  },
});

export default ChatsScreen;
