import React from "react";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";

//Custom components
import BigText from "../../components/texts/big-text/big-text";
import SmallText from "../../components/texts/small-text/small-text";
import RegularButton from "../../components/buttons/regular-button/regular-button";
import ProfileGrid from "../../components/scroll/profile-grid/profile-grid";

const ProfileScreen = () => {
  const user = {
    id: "", // User ID
    firstName: "בני", // User's first name
    lastName: "חנונוב", // User's last name
    gender: "male", // User's gender
    birthday: new Date(), // User's birthday (initialized to current date)
    email: "benyx13@gmail.com", // User's email address
    password: "Aa123456", // User's password
    confirm: "Aa123456", // Confirmation of user's password
  };

  const profileImage =
    "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg";

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        </View>
        <BigText text={`${user.firstName} ${user.lastName}`} />

        <View style={styles.buttonContainer}>
          <View style={styles.buttonView}>
            <RegularButton
              text={"הוסף לחברים"}
              width={120}
              onPress={() => {}}
            />
          </View>
          <View style={styles.buttonView}>
            <RegularButton text={"שלח הודעה"} width={120} onPress={() => {}} />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
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
