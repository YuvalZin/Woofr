import React, { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import ImageModal from "../../cards/image-model/image-model";

const ProfileGrid = ({ images }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  // Render each image item
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item)}>
      <Image source={{ uri: item }} style={styles.imageItem} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderItem}
        horizontal={false}
        numColumns={2}
      />
      <ImageModal
        visible={modalVisible}
        imageUrl={selectedImage}
        onClose={closeModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageItem: {
    height: 180,
    aspectRatio: 1,
    margin: 1,
    objectFit: "cover",
  },
});

export default ProfileGrid;
