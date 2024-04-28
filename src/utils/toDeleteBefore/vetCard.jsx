import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View, Text, Alert } from "react-native";

//
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";

//Custom Components
import RegularText from "../../components/texts/regular-text/regular-text";
import SmallText from "../../components/texts/small-text/small-text";
import { getVets } from "./vet";

//import { colorPalate } from "../../../utils/ui/colors";


const VetCard = ({ data, onImgPress, setRender }) => {
  const [vetData, setVetData] = useState({
    vetProfileID: '',
    vetName: '',
    address: '',
    phone: '',
    profileImage: '',
    description: '',
    specialization: '',
    ratings: '',
    availability24_7: '',
    sellsProducts: '',
    vetToHome: '',
    notes: '',
    verificationStatus: '',
    activeWoofr: ''
  });

  // Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);


  const fetchVetInfo = async () => {
    console.log(data);
    setVetData(data);
  };

  useEffect(() => {
    fetchVetInfo();
  }, []);



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.avatarContainer}
        >
          <Image
            source={{
              uri: vetData.profileImage,
            }}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <RegularText
            text={`${vetData.firstName} ${vetData.lastName}`}
            style={styles.username}
          />
          <SmallText text={`${vetData.address}, ${vetData.phone}`} style={styles.infoText} /> 
        </View>
      </View>

      <RegularText text={vetData.description} style={styles.descriptionText} /> 
        <View style={styles.bottomContainer}>
          <RegularText text={`מומחיות: ${vetData.specialization}`} style={styles.bottomText} />
          <RegularText text={`זמין 24/7: ${vetData.availability24_7}`} style={styles.bottomText} />
          <RegularText text={`מכירת מוצרים: ${vetData.sellsProducts}`} style={styles.bottomText} />
          <RegularText text={`הגעה לבית הלקוח: ${vetData.vetToHome}`} style={styles.bottomText} />
          <RegularText text={`הערות נוספות: ${vetData.notes}`} style={styles.bottomText} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "grey",
    padding: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarContainer: {
    marginRight: 10,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 12,
    color: "#888",
    marginBottom: 5,
  },
  descriptionText: {
    marginBottom: 10,
  },
  bottomContainer: {
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 8,
  },
  bottomText: {
    marginBottom: 5,
  },
});

export default VetCard;
