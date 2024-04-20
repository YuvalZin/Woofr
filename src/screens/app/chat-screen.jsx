import React, { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

//Snack bar to show user information
import { Snackbar } from "react-native-paper";

//Custom components
import GoBackButton from "../../components/buttons/go-back/go-back-button";
import RegularText from "../../components/texts/regular-text/regular-text";
import EmptyCard from "../../components/cards/empty-card/empty-card";
import ChatInput from "../../components/inputs/chat-input/chat-input";
import Messages from "../../components/scroll/messages/messages";

//Redux state management
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";

import { users } from "../../utils/data/users";
import { messages } from "../../utils/data/message";

//Create a random UUID
import uuid from "react-native-uuid";

const ChatScreen = () => {
  //Navigation object to navigate and to get prop
  const navigation = useNavigation();
  const route = useRoute();
  const { data } = route.params;

  // Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  console.log(`myUser ${myUser.email}`);

  console.log(data);

  //State to mange screen
  const [otherUser, setOtherUser] = useState(null);
  const [messageArray, setMessageArray] = useState([]);
  const [msg, setMsg] = useState("");

  // State for storing text to be displayed in the and visibility of the snackbar
  const [snackBarText, setSnackBarText] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const moveBack = () => {
    navigation.goBack();
  };

  const sendMessage = () => {
    //Hide the keyboard
    Keyboard.dismiss();

    //Check if message has text inside
    if (msg === "") {
      setSnackBarText("אין בהודעה תוכן");
      setSnackbarOpen(true);
      // Close the snackbar after 3 seconds
      setTimeout(() => {
        setSnackbarOpen(false);
      }, 3000);
      return;
    }

    var newMessage = {
      id: uuid.v4().toString(),
      chatId: data.id,
      from: myUser.email,
      to: otherUser.email,
      text: msg,
      timestamp: new Date(),
    };

    setMessageArray((prevMessages) => [...prevMessages, newMessage]);
    setMsg("");
  };

  //Use effect to load other user
  useEffect(() => {
    // Determine the email of the other user
    const otherEmail =
      data.user1.email === myUser.email ? data.user2 : data.user1;

    // Find the user object with the corresponding email
    const otherUser = users.find((user) => user.email === otherEmail);

    // Set the state with the other user information
    if (otherUser) {
      setOtherUser(otherUser);
    }
  }, [data, myUser]);

  //Use effect to load messages
  useEffect(() => {
    // Filter messages based on the id
    const currentMessages = messages.filter(
      (message) => message.chatId === data.id
    );

    // Update the state with the filtered messages
    setMessageArray(currentMessages);
  }, [data, messages]);

  return (
    <SafeAreaView style={styles.container}>
      <GoBackButton onPress={moveBack} />
      {otherUser ? (
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.infoRow}>
            <RegularText
              text={`${otherUser.firstName} ${otherUser.lastName}`}
            />
            <Image
              source={{ uri: otherUser.img }}
              style={styles.profileImage}
            />
          </View>
          <View style={styles.container}>
            <Messages arr={messageArray} myUser={myUser} />
          </View>
          <ChatInput setValue={setMsg} value={msg} onClick={sendMessage} />

          <Snackbar
            visible={snackbarOpen}
            onDismiss={() => {}}
            action={{
              label: "סגור",
              onPress: () => {
                setSnackbarOpen(false);
              },
            }}
          >
            {snackBarText}
          </Snackbar>
        </KeyboardAvoidingView>
      ) : (
        <EmptyCard
          text={"הייתה בעיה למצוא את הפרופיל לצערנו"}
          iconName={"sad-outline"}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 8,
    alignItems: "center",
  },
  profileImage: {
    width: 65,
    height: 65,
    borderRadius: 30,
  },
});

export default ChatScreen;
