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

//Redux state management
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";

//Importing function from the API file
import { GetUserInfo } from "../../utils/api/user";
import { addMessage, getChatMessages } from "../../utils/api/chat";

//Create a random UUID
import uuid from "react-native-uuid";

//Custom components
import GoBackButton from "../../components/buttons/go-back/go-back-button";
import RegularText from "../../components/texts/regular-text/regular-text";
import ChatInput from "../../components/inputs/chat-input/chat-input";
import Messages from "../../components/scroll/messages/messages";
import { colorPalate } from "../../utils/ui/colors";
import RegularTextBold from "../../components/texts/regular-text/regular-text-bold";
import SmallTextBold from "../../components/texts/small-text/small-text-bold";

const ChatScreen = () => {
  //Navigation handler
  const navigation = useNavigation();

  // Extracts the 'data' parameter from the current route.
  const route = useRoute();
  const { data } = route.params;

  // Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  // State variable to hold the other user initialize otherUser state to null
  const [otherUser, setOtherUser] = useState(null);

  // Initialize state variable to hold an array of messages
  const [messageArray, setMessageArray] = useState([]);

  // State variable to hold the message input value
  const [msg, setMsg] = useState("");

  // State for storing text to be displayed in the and visibility of the snackbar
  const [snackBarText, setSnackBarText] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // State variable to track loading state
  const [loading, setLoading] = useState(false);

  // Function to send a message
  const sendMessage = async () => {
    // Dismiss the keyboard and set loading state to true
    Keyboard.dismiss();

    if (msg === "") {
      setSnackBarText("אין בהודעה תוכן");
      setSnackbarOpen(true);
      setTimeout(() => {
        setSnackbarOpen(false);
      }, 3000);
      return;
    }
    else setLoading(true);


    // Create a new message object
    const newMessage = {
      messageId: uuid.v4().toString(),
      chatId: data.chatID,
      senderId: myUser.id,
      receiverId: otherUser.id,
      messageText: msg,
      timestamp: new Date(),
    };

    // Add the message to the database
    const res = await addMessage(newMessage);

    if (res) {
      //Set message to empty string and set that loading had been complete
      setLoading(false);
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
      const response = await getChatMessages(data.chatID, myUser.id);
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

    // Poll for new messages every 10 seconds
    const interval = setInterval(() => {
      fetchMessages();
    }, 5000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [data]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <GoBackButton
            onPress={() => {
              navigation.goBack();
            }}
          />
          {otherUser && (
            <View style={styles.infoRow}>
              <Image
                source={{ uri: otherUser.profilePictureUrl }}
                style={styles.profileImage}
              />
              <SmallTextBold
                text={`${otherUser.firstName} ${otherUser.lastName}`}
              />
            </View>
          )}
        </View>

        {messageArray && (
          <View style={styles.msgContainer}>
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
          onDismiss={() => { }}
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
  msgContainer: {
    paddingHorizontal:10,
    flex: 1,
  },
  header: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",

    paddingBottom:10,
    borderBottomWidth:5,
    borderBottomColor:"#F0F2F5",
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
    width: 55,
    height: 55,
    borderRadius: 30,
    marginRight:10,
    marginLeft:10,
  },
});

export default ChatScreen;
