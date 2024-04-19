import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

//Custom components
import BigText from "../../components/texts/big-text/big-text";
import RegularButton from "../../components/buttons/regular-button/regular-button";
import GoBackButton from "../../components/buttons/go-back/go-back-button";

import { users } from "../../utils/data/users";

// Example user data
const userData = {
  firstName: "John",
  lastName: "Doe",
  profilePictureUrl: "https://example.com/profile.jpg",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  following: 18,
  followers: 19,
};

const UserProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params; // Assuming you pass the userId in navigation params

  const [userProfile, setUserProfile] = useState(null);

  // useEffect(() => {
  //   // Simulate fetching user data based on the userId
  //   // Replace this with your actual API call or data retrieval method
  //   const fetchUserData = async () => {
  //     // Example fetch from API
  //     // const response = await fetch(`https://api.example.com/users/${userId}`);
  //     // const data = await response.json();

  //     // Simulated data for testing
  //     const data = userData; // Replace with actual fetched data
  //     setUserProfile(data);
  //   };

  //   fetchUserData();
  // }, [userId]);

  useEffect(() => {
    users.forEach((user) => {
      if (user.email === email) {
        setUserProfile(user);
      }
    });
  }, []);

  const moveBack = () => {
    navigation.goBack();
  };
  const moveToChat = (email) => {
    navigation.navigate("home-chat", { email: email });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GoBackButton onPress={moveBack} />
      {userProfile ? (
        <View style={styles.container}>
          <View>
            <Image
              source={{ uri: userProfile.img }}
              style={styles.profileImage}
            />
          </View>
          <BigText text={`${userProfile.firstName} ${userProfile.lastName}`} />
          <Text style={styles.bio}>{userProfile.bio}</Text>

          <View style={styles.buttonContainer}>
            <View style={styles.buttonView}>
              <RegularButton text={`עקוב`} width={120} onPress={() => {}} />
            </View>
            <View style={styles.buttonView}>
              <RegularButton
                text={"שלח הודעה"}
                width={120}
                onPress={() => {
                  moveToChat(userProfile.email);
                }}
              />
            </View>
          </View>
        </View>
      ) : (
        <Text>Loading...</Text> // Add a loading indicator or placeholder
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
  bio: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default UserProfileScreen;
