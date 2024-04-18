import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";

const ChatInput = ({ value, setValue }) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={(event) => {
          setValue(event);
        }}
        style={styles.input}
        placeholder="כתוב פה את ההודעה שלך..."
        placeholderTextColor="#A9A9A9"
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>שלח</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: "absolute",
    left: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 14,
  },
});

export default ChatInput;
