import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  RefreshControl,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

//Redux state management
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";

import { getVets } from "../../utils/api/vet";
import ProfessionalSlider from "../../components/scroll/professional-slider/professional-slider";
import GoBackButton from "../../components/buttons/go-back/go-back-button";
import BigText from "../../components/texts/big-text/big-text";

const ProfessionalsScreen = () => {
  //Navigation handler
  const navigation = useNavigation();

  // Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  

  // State to control refreshing
  const [refreshing, setRefreshing] = useState(false);

  // Initialize state for storing the user's posts
  const [vets, setVets] = useState([]);

  //fetch posts to display on homepage
  const fetchVets = async () => {
    const res = await getVets(resultsFilter);
    setVets(res);
  };

  // Function to handle refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchVets();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  // Function to navigate to either the "home-profile" or "profile-stack" screen based on the provided ID
  //   const moveToProfile = (id) => {
  //     if (myUser.id !== id) {
  //       navigation.navigate("home-profile", { id: id });
  //     } else {
  //       navigation.navigate("profile-stack");
  //     }
  //   };

  // useEffect hook to fetch posts when the refreshing state changes
  useEffect(() => {
    fetchVets();
  }, [refreshing]);

  // useFocusEffect hook to fetch posts when the component gains focus
  //   useFocusEffect(
  //     useCallback(() => {
  //       fetchVets();
  //     }, [])
  //   );

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
          <ProfessionalSlider arr={vets} setRender={onRefresh} />
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
  }
});

export default ProfessionalsScreen;