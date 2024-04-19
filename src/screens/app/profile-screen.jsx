import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import * as SecureStore from "expo-secure-store";

//Custom components
import BigText from "../../components/texts/big-text/big-text";
import RegularButton from "../../components/buttons/regular-button/regular-button";
import GoBackButton from "../../components/buttons/go-back/go-back-button";
import EmptyCard from "../../components/cards/empty-card/empty-card";

//Fake user
import { users } from "../../utils/data/users";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const profileEmail = route.params?.email;
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Filter users based on email
    const filteredUser = users.find((user) => user.email === profileEmail);
    setProfileData(filteredUser);
  }, [profileEmail]);

  const moveBack = () => {
    navigation.goBack();
  };

  const moveToChat = (email) => {
    navigation.navigate("home-chat", { email: email });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GoBackButton onPress={moveBack} />
      {profileData ? (
        <View style={styles.container}>
          <View>
            <Image
              source={{ uri: profileData.profilePictureUrl }}
              style={styles.profileImage}
            />
          </View>
          <BigText text={`${profileData.firstName} ${profileData.lastName}`} />

          <View style={styles.buttonContainer}>
            <View style={styles.buttonView}>
              <RegularButton
                text={`כפתור למשהו`}
                width={120}
                onPress={() => {}}
              />
            </View>
            <View style={styles.buttonView}>
              <RegularButton
                text={"שלח הודעה"}
                width={120}
                onPress={() => {
                  moveToChat(profileData.email);
                }}
              />
            </View>
          </View>
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
    marginTop: 50,
    flex: 1,
    alignItems: "center",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 160,
    height: 160,
    resizeMode: "cover",
    borderRadius: 80,
  },
  buttonContainer: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  buttonView: {
    width: 160,
  },
  buttonItem: {
    flex: 1,
    alignItems: "center",
  },
});

export default ProfileScreen;
