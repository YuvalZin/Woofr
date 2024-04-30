import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

//Redux state management
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";

import { getVets } from "../../utils/api/vet";

//Custom components
import ProfessionalSlider from "../../components/scroll/professional-slider/professional-slider";
import GoBackButton from "../../components/buttons/go-back/go-back-button";
import BigText from "../../components/texts/big-text/big-text";
import ProfessionalFilter from "../../components/inputs/professional-filter/professional-filter";
import RegularButton from "../../components/buttons/regular-button/regular-button";
import { colorPalate } from "../../utils/ui/colors";

const ProfessionalsScreen = () => {
  //Navigation handler
  const navigation = useNavigation();

  // Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  // Initialize state for storing the user's posts
  const [vets, setVets] = useState([]);

  const [resultsFilter, setResultsFilter] = useState({
    id: "string",
    userId: "string",
    displayName: "string",
    address: "string",
    phone: "string",
    profileImage: "string",
    description: "string",
    specialization: null,
    ratingScore: 0,
    availability24_7: null,
    sellsProducts: null,
    vetToHome: null,
    notes: "string",
    verificationStatus: "string",
    activeWoofr: true,
    city: null,
  });

  //fetch posts to display on homepage
  const fetchVets = async () => {
    const res = await getVets(resultsFilter);
    setVets(res);
  };

  //Function to move to profile
  const moveToProfile = (id) => {
    if (myUser.id !== id) {
      navigation.navigate("home-profile", { id: id });
    } else {
      navigation.navigate("profile-stack");
    }
  };

  // useEffect hook to fetch posts when the refreshing state changes
  useEffect(() => {
    fetchVets();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <GoBackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View>
          <BigText text={"וטרינרים"} />
        </View>
      </View>
      <ScrollView
        nestedScrollEnabled={true}
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {vets.length > 0 && (
          <ProfessionalSlider arr={vets} onCardPress={moveToProfile} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonContainer: {
    padding: 4,
    margin: 4,
  },
});

export default ProfessionalsScreen;
