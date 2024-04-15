import React from "react";
import {
  StyleSheet,
  View,
  Modal,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";

const ImageModal = ({ visible, imageUrl, onClose }) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>סגור</Text>
        </TouchableOpacity>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
  closeButtonText: {
    color: "white",
    fontSize: 18,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default ImageModal;
