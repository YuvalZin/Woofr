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
import { Snackbar } from "react-native-paper";

import GoBackButton from "../../components/buttons/go-back/go-back-button";
import RegularText from "../../components/texts/regular-text/regular-text";
import ChatInput from "../../components/inputs/chat-input/chat-input";
import Messages from "../../components/scroll/messages/messages";

import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";
import { GetUserInfo } from "../../utils/api/user";
import { addMessage, getChatMessages } from "../../utils/api/chat";

import uuid from "react-native-uuid";

const ChatScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { data } = route.params;
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  const [otherUser, setOtherUser] = useState(null);
  const [messageArray, setMessageArray] = useState([]);
  const [msg, setMsg] = useState("");
  const [snackBarText, setSnackBarText] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const moveBack = () => {
    navigation.goBack();
  };

  const sendMessage = async () => {
    Keyboard.dismiss();

    setLoading(true);
    if (msg === "") {
      setSnackBarText("אין בהודעה תוכן");
      setSnackbarOpen(true);
      setTimeout(() => {
        setSnackbarOpen(false);
      }, 3000);
      return;
    }

    var newMessage = {
      messageId: uuid.v4().toString(),
      chatId: data.chatID,
      senderId: myUser.id,
      receiverId: otherUser.id,
      messageText: msg,
      timestamp: new Date(),
    };

    const res = await addMessage(newMessage);
    if (res) {
      setLoading(false);
      setMessageArray((prevMessages) => [...prevMessages, newMessage]);
      setMsg("");
    } else {
      setLoading(false);
      Alert.alert("משהו השתבש", "הייתה בעיה בעת שליחת ההודעה", [
        {
          text: "שחרר",
          style: "cancel",
        },
      ]);
    }
  };

  const fetchUserData = async () => {
    const otherId =
      data &&
      myUser &&
      (data.participant1ID === myUser.id
        ? data.participant2ID
        : data.participant1ID);

    if (otherId) {
      const response = await GetUserInfo(otherId);
      setOtherUser(response);
    }
  };

  const fetchMessages = async () => {
    if (data && data.chatID) {
      const response = await getChatMessages(data.chatID);
      setMessageArray(response);
    }
  };

  useEffect(() => {
    if (data) {
      fetchUserData();
      fetchMessages();
    }
  }, [data]);

  useEffect(() => {
    // Fetch messages when the component mounts
    fetchMessages();

    // Poll for new messages every 10 seconds (adjust interval as needed)
    const interval = setInterval(() => {
      fetchMessages();
    }, 5000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [data]);

  return (
    <SafeAreaView style={styles.container}>
      <GoBackButton onPress={moveBack} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {otherUser && (
          <View style={styles.infoRow}>
            <Image
              source={{ uri: otherUser.profilePictureUrl }}
              style={styles.profileImage}
            />
            <RegularText
              text={`${otherUser.firstName} ${otherUser.lastName}`}
            />
          </View>
        )}

        {messageArray && (
          <View style={styles.container}>
            <Messages arr={messageArray} myUser={myUser} />
          </View>
        )}

        <ChatInput
          setValue={setMsg}
          value={msg}
          onClick={sendMessage}
          loading={loading}
        />

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
