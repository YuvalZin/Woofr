import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

//Redux state management
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";

//Custom components
import GoBackButton from "../../components/buttons/go-back/go-back-button";
import BigText from "../../components/texts/big-text/big-text";
import CustomTextInput from "../../components/inputs/custom-text-input/custom-text-input";
import PasswordInput from "../../components/inputs/password-input/password-input";
import RegularButton from "../../components/buttons/regular-button/regular-button";
import { colorPalate } from "../../utils/ui/colors";

const EditInformation = () => {
  const navigation = useNavigation();

  // Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);
  const [userData, setUserData] = useState(myUser);

  const moveBack = () => {
    navigation.goBack();
  };

  const formWidth = 290;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <GoBackButton onPress={moveBack} />

        <View style={styles.header}>
          <BigText text={"עדכן את הפרטים שלך"} />
        </View>

        <View style={styles.formScroll}>
          <ScrollView>
            <CustomTextInput
              value={userData.firstName}
              placeholder="שם פרטי"
              width={formWidth}
              onChangeText={(value) => {
                setUserData({ ...userData, firstName: value });
              }}
            />
            <CustomTextInput
              value={userData.lastName}
              placeholder="שם משפחה"
              width={formWidth}
              onChangeText={(value) => {
                setUserData({ ...userData, lastName: value });
              }}
            />
            <CustomTextInput
              value={userData.email}
              placeholder="איימל"
              width={formWidth}
              onChangeText={(value) => {
                setUserData({ ...userData, email: value });
              }}
            />
            <PasswordInput
              value={userData.password}
              placeholder="סיסמא"
              width={formWidth}
              onChangeText={(value) => {
                setUserData({ ...userData, password: value });
              }}
            />
          </ScrollView>
        </View>

        <View style={styles.buttonContainer}>
          <RegularButton
            text={"עדכן"}
            onPress={() => {}}
            color={colorPalate.primary}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    width: "100%",
  },
  formScroll: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 10,
    width: 260,
  },
});

export default EditInformation;
