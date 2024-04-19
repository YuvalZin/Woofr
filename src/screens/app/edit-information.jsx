import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";

//Custom components
import GoBackButton from "../../components/buttons/go-back/go-back-button";

const EditInformation = () => {
  const navigation = useNavigation();

  const moveBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <GoBackButton onPress={moveBack} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default EditInformation;
