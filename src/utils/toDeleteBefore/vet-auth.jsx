import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const VetRegister = () => {
  const [vetData, setVetData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    profileImage: "",
    description: "",
    specialization: "",
    ratings: "",
    availability24_7: false,
    sellsProducts: false,
    vetToHome: false,
    notes: "",
    verificationStatus: "",
  });

  const handleRegister = () => {
    // Implement your registration logic here
    // Example: Send data to API, perform validation, etc.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Vet Registration</Text>
      <TextInput
        placeholder="Vet Name"
        style={styles.input}
        value={vetData.vetName}
        onChangeText={(text) => setVetData({ ...vetData, vetName: text })}
      />
      <TextInput
        placeholder="Address"
        style={styles.input}
        value={vetData.address}
        onChangeText={(text) => setVetData({ ...vetData, address: text })}
      />
      <TextInput
        placeholder="Phone"
        style={styles.input}
        value={vetData.phone}
        onChangeText={(text) => setVetData({ ...vetData, phone: text })}
      />
      <TextInput
        placeholder="Profile Image URL"
        style={styles.input}
        value={vetData.profileImage}
        onChangeText={(text) => setVetData({ ...vetData, profileImage: text })}
      />
      <TextInput
        placeholder="Description"
        style={styles.input}
        multiline
        numberOfLines={3}
        value={vetData.description}
        onChangeText={(text) => setVetData({ ...vetData, description: text })}
      />
      <TextInput
        placeholder="Specialization"
        style={styles.input}
        value={vetData.specialization}
        onChangeText={(text) =>
          setVetData({ ...vetData, specialization: text })
        }
      />

      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() =>
            setVetData({
              ...vetData,
              availability24_7: !vetData.availability24_7,
            })
          }
        >
          <Text>Available 24/7</Text>
          {vetData.availability24_7 && <Text>✔️</Text>}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() =>
            setVetData({ ...vetData, sellsProducts: !vetData.sellsProducts })
          }
        >
          <Text>Sells Products</Text>
          {vetData.sellsProducts && <Text>✔️</Text>}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() =>
            setVetData({ ...vetData, vetToHome: !vetData.vetToHome })
          }
        >
          <Text>Vet to Home</Text>
          {vetData.vetToHome && <Text>✔️</Text>}
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="Notes"
        style={[styles.input, styles.notesInput]}
        multiline
        numberOfLines={3}
        value={vetData.notes}
        onChangeText={(text) => setVetData({ ...vetData, notes: text })}
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  notesInput: {
    height: 80,
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  registerButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default VetRegister;
