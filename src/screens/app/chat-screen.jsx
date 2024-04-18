import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

//Custom components
import GoBackButton from "../../components/buttons/go-back/go-back-button";
import RegularText from "../../components/texts/regular-text/regular-text";
import EmptyCard from "../../components/cards/empty-card/empty-card";

import { users } from "../../utils/data/users";
import ChatInput from "../../components/inputs/chat-input/chat-input";

const ChatScreen = () => {
  //Navigation object to navigate and to get prop
  const navigation = useNavigation();
  const route = useRoute();

  //State to mange screen
  const profileEmail = route.params?.email;
  const [profileData, setProfileData] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const filteredUser = users.find((user) => user.email === profileEmail);
    setProfileData(filteredUser);
  }, [profileEmail]);

  const moveBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <GoBackButton onPress={moveBack} />
      {profileData ? (
        <View style={styles.container}>
          <View style={styles.infoRow}>
            <RegularText
              text={` ${profileData.firstName} ${profileData.lastName}`}
            />
            <Image
              source={{ uri: profileData.img }}
              style={styles.profileImage}
            />
          </View>
          <ChatInput setValue={setMsg} value={msg} />
        </View>
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
