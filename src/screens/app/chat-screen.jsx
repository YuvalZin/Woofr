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
import ChatInput from "../../components/inputs/chat-input/chat-input";
import Messages from "../../components/scroll/messages/messages";

//Redux state management
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";

import { messages } from "../../utils/data/message";

//Create a random UUID
import uuid from "react-native-uuid";

import { GetUserInfo } from "../../utils/api/user";
import { getChatMessages } from "../../utils/api/chat";

const ChatScreen = () => {
  //Navigation object to navigate and to get prop
  const navigation = useNavigation();
  const route = useRoute();
  const { data } = route.params;

  // Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

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
      chatId: data.ChatID,
      from: myUser.email,
      to: otherUser.email,
      text: msg,
      timestamp: new Date(),
    };

    setMessageArray((prevMessages) => [...prevMessages, newMessage]);
    setMsg("");
  };

  const fetchUserData = async (id) => {
    const response = await GetUserInfo(id);
    setOtherUser(response);
  };

  const fetchMessages = async () => {
    const response = await getChatMessages(data.chatID);
    setMessageArray(response);
  };

  useEffect(() => {
    const otherId =
      data.Participant1ID === myUser.id
        ? data.participant2ID
        : data.participant1ID;
    fetchUserData(otherId);
    fetchMessages();
  }, [data]);

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
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {otherUser ? (
          <View style={styles.infoRow}>
            <Image
              source={{ uri: otherUser.profilePictureUrl }}
              style={styles.profileImage}
            />
            <RegularText
              text={`${otherUser.firstName} ${otherUser.lastName}`}
            />
          </View>
        ) : null}

        {messageArray ? (
          <View style={styles.container}>
            <Messages arr={messageArray} myUser={myUser} />
          </View>
        ) : null}

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
    justifyContent: "flex-start",
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
