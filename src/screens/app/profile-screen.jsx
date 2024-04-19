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
import SmallText from "../../components/texts/small-text/small-text";
import RegularButton from "../../components/buttons/regular-button/regular-button";
import GoBackButton from "../../components/buttons/go-back/go-back-button";
import EmptyCard from "../../components/cards/empty-card/empty-card";
import { getFollowData } from "../../utils/api/user";

//Fake user
import { users } from "../../utils/data/users";
import { GetUserData } from "../../utils/api/user";

const ProfileScreen = () => {
  const navigation = useNavigation();
  //const route = useRoute();
  //const profileEmail = route.params?.email;
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = SecureStore.getItem("token");
      const data = await GetUserData(token);
      const followData = await getFollowData(token);
      data.followers = followData.split(",")[0];
      data.following = followData.split(",")[1];
      setProfileData(data);
    };
    fetchUserData();
  }, []); //מחקתי פה כמה דברים צריך לדעת אם הם קריטים

  const moveBack = () => {
    navigation.goBack();
  };

  const moveToChat = (email) => {
    navigation.navigate("home-chat", { email: email });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ alignItems: "flex-end" }}>
        <GoBackButton onPress={moveBack} />
      </View>
      {profileData ? (
        <View style={styles.container}>
          <View>
            <Image
              source={{ uri: profileData.profilePictureUrl }}
              style={styles.profileImage}
            />
          </View>
          <BigText text={`${profileData.firstName} ${profileData.lastName}`} />
          <View style={{ flexDirection: "row" }}>
            <SmallText text={`${profileData.followers} עוקבים` + "  |  "} />
            <SmallText text={`${profileData.following} במעקב`} />
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonView}>
              <RegularButton
                text={`הוספת תמונה`}
                width={120}
                onPress={() => {}}
              />
            </View>
            <View style={styles.buttonView}>
              <RegularButton
                text={"עריכת פרופיל"}
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
