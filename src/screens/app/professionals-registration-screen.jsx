import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

//Redux state management
import { useDispatch, useSelector } from "react-redux";
import { login, selectAuth } from "../../redux/authSlice";

// Importing uuid module from react-native-uuid
import uuid from "react-native-uuid";

//Importing app color palate
import { colorPalate } from "../../utils/ui/colors";

//Importing the Snackbar component from the react-native-paper library
import { Snackbar } from "react-native-paper";

//Navigation handler
import { useNavigation } from "@react-navigation/native";

// Importing Checkbox component from expo-checkbox
import Checkbox from "expo-checkbox";

//Import api files
import {
  getProById,
  insertProfessional,
  updateProfessional,
} from "../..//utils/api/pro";

//Import types data
import { types } from "../../utils/data/types";

//Form validator for professional
import { professionalValidate } from "../../utils/scripts/professionals-validate";

//Custom components
import RegularText from "../../components/texts/regular-text/regular-text";
import BigText from "../../components/texts/big-text/big-text";
import GoBackButton from "../../components/buttons/go-back/go-back-button";
import RegularButton from "../../components/buttons/regular-button/regular-button";
import CustomTextInput from "../../components/inputs/custom-text-input/custom-text-input";
import SmallText from "../../components/texts/small-text/small-text";
import DropDownPicker from "react-native-dropdown-picker";
import RegularButtonSmall from "../../components/buttons/regular-button/regular-button-small";

const ProfessionalsRegistrationScreen = () => {
  // Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = auth.user ? JSON.parse(auth.user) : null;
  const dispatch = useDispatch();

  //Navigation handler
  const navigation = useNavigation();

  //State to show the button loading
  const [buttonLoading, setButtonLoading] = useState(false);

  // State for managing the snackbar: storing text content to be displayed and controlling visibility
  const [snackBarText, setSnackBarText] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // State for managing the visibility of the dropdown
  const [openDropdown, setOpenDropdown] = useState(false);

  const [professional, setProfessional] = useState({
    id: uuid.v4().toString(),
    displayName: "",
    address: "",
    phone: "",
    description: "",
    City: "",
    type: "",
    availability24_7: false,
    sellsProducts: false,
    toHome: false,
    notes: "",
    ProfileImage: "",
    userId: myUser.id,
    verificationStatus: "verified",
  });

  //Width for the form
  const formWidth = 290;

  // Function to handle Snackbar
  const showSnackbar = (message, duration) => {
    setSnackBarText(message);
    setSnackbarOpen(true);

    // Close the snackbar after the specified duration
    setTimeout(() => {
      setSnackbarOpen(false);
    }, duration);
  };

  const handleSubmit = async () => {
    setButtonLoading(true);
    // Validate the user data using signupValidator
    const formCheck = professionalValidate(professional);

    // If the form validation fails
    if (formCheck.isValid === false) {
      //Open and Set snackbar text to display the error message
      showSnackbar(formCheck.errorMessage, 3000);
      setButtonLoading(false);
      return;
    }

    if (myUser.type === "user") {
      const insertPro = await insertProfessional(professional);

      if (insertPro) {
        let newUser = { ...myUser, type: "commercial" };
        dispatch(login(JSON.stringify(newUser)));
        navigation.goBack();
      } else {
        showSnackbar("הייתה בעיה ליצור משתמש פרו", 3000);
        setButtonLoading(false);
      }
    } else {
      const updatePro = await updateProfessional(professional);

      if (updatePro) {
        navigation.goBack();
      } else {
        showSnackbar("הייתה בעיה בעדכון", 3000);
        setButtonLoading(false);
      }
    }
  };

  //Function to delete professional
  const deletePro = async () => {
    const res = true;
    if (res) {
      let newUser = { ...myUser, type: "user" };
      dispatch(login(JSON.stringify(newUser)));
      navigation.goBack();
    } else {
      showSnackbar("הייתה בעיה במחיקה", 3000);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    if (myUser.type !== null) {
      const fetchData = async () => {
        const res = await getProById(myUser.id);
        if (res) {
          setProfessional({ ...res, City: res.city });
        }
      };

      fetchData();
    }
  }, [myUser.id]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ alignItems: "flex-end" }}></View>

      <ScrollView>
        <GoBackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.container}>
          <View style={styles.header}>
            <BigText text={"תן לנו לקדם את העסק שלך"} />
            <RegularText
              text={
                "עם וופר אתה יכול להשיג המון לקוחות חדשים שאוהבים בעלי חיים בדיוק כמוך!"
              }
            />
          </View>

          <View
            style={{
              width: formWidth,
              marginBottom: openDropdown ? 200 : 0,
              alignItems: "left",
            }}
          >
            <DropDownPicker
              open={openDropdown}
              value={professional.type ? professional.type : null}
              items={types}
              setOpen={setOpenDropdown}
              placeholder="בחר מקצוע"
              dropDownDirection="BOTTOM"
              listMode="SCROLLVIEW"
              onSelectItem={(item) => {
                setProfessional({
                  ...professional,
                  type: item.value,
                });
              }}
            />
          </View>

          <View>
            <CustomTextInput
              value={professional.displayName}
              placeholder="שם העסק"
              style={styles.input}
              width={formWidth}
              onChangeText={(value) => {
                setProfessional({ ...professional, displayName: value });
              }}
            />

            <CustomTextInput
              value={professional.City}
              placeholder="עיר"
              style={styles.input}
              width={formWidth}
              onChangeText={(value) => {
                setProfessional({ ...professional, City: value });
              }}
            />
            <CustomTextInput
              value={professional.address}
              placeholder="כתובת"
              style={styles.input}
              width={formWidth}
              onChangeText={(value) => {
                setProfessional({ ...professional, address: value });
              }}
            />

            <CustomTextInput
              value={professional.phone}
              placeholder="מספר טלפון"
              style={styles.input}
              width={formWidth}
              onChangeText={(value) => {
                setProfessional({ ...professional, phone: value });
              }}
            />
            <CustomTextInput
              value={professional.description}
              placeholder="תיאור"
              style={styles.input}
              width={formWidth}
              onChangeText={(value) => {
                setProfessional({ ...professional, description: value });
              }}
            />
            <CustomTextInput
              value={professional.notes}
              placeholder="הערות"
              style={styles.input}
              width={formWidth}
              onChangeText={(value) => {
                setProfessional({ ...professional, notes: value });
              }}
            />
          </View>

          <View style={styles.sectionRow}>
            <View style={styles.section}>
              <Checkbox
                style={styles.checkbox}
                value={professional.availability24_7}
                onValueChange={() => {
                  setProfessional({
                    ...professional,
                    availability24_7: !professional.availability24_7,
                  });
                }}
              />
              <SmallText text={"זמינות 7\\24"} />
            </View>

            <View style={styles.section}>
              <Checkbox
                style={styles.checkbox}
                value={professional.sellsProducts}
                onValueChange={() => {
                  setProfessional({
                    ...professional,
                    sellsProducts: !professional.sellsProducts,
                  });
                }}
              />
              <SmallText text={"מוכר מוצרים"} />
            </View>

            <View style={styles.section}>
              <Checkbox
                style={styles.checkbox}
                value={professional.toHome}
                onValueChange={() => {
                  setProfessional({
                    ...professional,
                    toHome: !professional.toHome,
                  });
                }}
              />
              <SmallText text={"מגיע עד הבית"} />
            </View>
          </View>

          <View style={{ width: 200, marginTop: 10 }}>
            <RegularButton
              loading={buttonLoading}
              text={myUser.type === "user" ? "פתח וופר עסקי" : "עדכן את העסק"}
              onPress={handleSubmit}
              color={colorPalate.primary}
              iconName={"business-outline"}
            />
          </View>

          {myUser.type !== "user" && (
            <View style={{ width: 200, marginTop: 10 }}>
              <RegularButtonSmall
                loading={buttonLoading}
                text={"מחק את העסק"}
                onPress={deletePro}
                color={colorPalate.grey}
              />
            </View>
          )}
        </View>
      </ScrollView>

      <Snackbar
        visible={snackbarOpen}
        onDismiss={() => {}}
        action={{
          label: "סגור",
          onPress: () => {
            setSnackbarOpen(false);
          },
        }}
      >
        {snackBarText}
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    direction: "rtl",
    textAlign: "left",
    paddingRight: 20,
    paddingBottom: 20,
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
    padding: 4,
    width: "100%",
  },
  section: {
    flexDirection: "column",
    alignItems: "center",
  },
});

export default ProfessionalsRegistrationScreen;
