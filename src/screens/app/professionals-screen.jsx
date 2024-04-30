import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

//Redux state management
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";

// Importing the getVets function from the API utilities
import { getVets } from "../../utils/api/vet";

// Importing the colorPalate from the UI utilities
import { colorPalate } from "../../utils/ui/colors";

//Custom components
import ProfessionalSlider from "../../components/scroll/professional-slider/professional-slider";
import GoBackButton from "../../components/buttons/go-back/go-back-button";
import BigText from "../../components/texts/big-text/big-text";
import ProfessionalFilter from "../../components/inputs/professional-filter/professional-filter";
import RegularButton from "../../components/buttons/regular-button/regular-button";
import CollapseButton from "../../components/buttons/collapse-button/collapse-button";

const ProfessionalsScreen = () => {
  //Navigation handler
  const navigation = useNavigation();

  // Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  // Initialize state for storing the user's posts
  const [vets, setVets] = useState([]);

  const [showFilters, setShowFilters] = useState(true);

  // State for filtering results based on various criteria
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

  //Function to move to profile
  const moveToRating = (data) => {
    navigation.navigate("home-rating", { data: data });
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

      {showFilters && (
        <>
          <ProfessionalFilter data={resultsFilter} setData={setResultsFilter} />

          <View style={styles.buttonContainer}>
            <RegularButton
              text={"חפש"}
              iconName={"search-outline"}
              color={colorPalate.primary}
              onPress={fetchVets}
            />
          </View>
        </>
      )}

      <CollapseButton
        value={showFilters}
        setValue={setShowFilters}
        text={showFilters ? "הסתר פילטרים" : "הצג פילטרים"}
      />

      <ScrollView nestedScrollEnabled={true} style={styles.container}>
        {vets.length > 0 && (
          <ProfessionalSlider
            arr={vets}
            onCardPress={moveToProfile}
            onRatingPress={moveToRating}
          />
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
