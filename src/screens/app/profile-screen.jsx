import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

//Custom components
import BigText from "../../components/texts/big-text/big-text";
import SmallText from "../../components/texts/small-text/small-text";
import RegularButton from "../../components/buttons/regular-button/regular-button";
import GoBackButton from "../../components/buttons/go-back/go-back-button";
import EmptyCard from "../../components/cards/empty-card/empty-card";

//Fake user
import { users } from "../../utils/data/users";

const ProfileScreen = () => {
  const profileEmail = "example1@example.com";

  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Set loading state to true when fetching new posts
    setIsLoading(true);

    // Simulate fetching posts from API
    setTimeout(() => {
      // Filter users based on email
      const filteredUser = users.find((user) => user.email === profileEmail);
      setProfileData(filteredUser);

      // Set loading state back to false after 2 seconds
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }, 1000);
  }, [profileEmail]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GoBackButton onPress={() => {}} />

      {isLoading ? (
        <View style={[styles.container, styles.loadingContainer]}>
          <ActivityIndicator size="large" color="#565AC8" />
        </View>
      ) : profileData ? (
        <View style={styles.container}>
          <View>
            <Image
              source={{ uri: profileData.img }}
              style={styles.profileImage}
            />
          </View>
          <BigText text={`${profileData.firstName} ${profileData.lastName}`} />

          <View style={styles.buttonContainer}>
            <View style={styles.buttonView}>
              <RegularButton
                text={"הוסף לחברים"}
                width={120}
                onPress={() => {}}
              />
            </View>
            <View style={styles.buttonView}>
              <RegularButton
                text={"שלח הודעה"}
                width={120}
                onPress={() => {}}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <View style={styles.buttonItem}>
              <BigText text={"1.2K"} />
              <SmallText text={"Photos"} />
            </View>
            <View style={styles.buttonItem}>
              <BigText text={"210"} />
              <SmallText text={"Friends"} />
            </View>
            <View style={styles.buttonItem}>
              <BigText text={"5"} />
              <SmallText text={"Pets"} />
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
