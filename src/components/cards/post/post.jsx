import React from "react";
import { Image, StyleSheet, View } from "react-native";

//Custom Components
import RegularText from "../../texts/regular-text/regular-text";
import SmallText from "../../texts/small-text/small-text";

const Post = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
            }}
            style={styles.avatar}
          />
        </View>
        <View style={styles.userInfo}>
          <RegularText text={"בני חנונוב"} style={styles.username} />
          <SmallText text={"בעלים של 4 כלבים"} style={styles.infoText} />
          <SmallText text={"לפני 3 דקות"} style={styles.infoText} />
        </View>
      </View>

      <RegularText
        text={
          "עשינו חוויה בלה בלה בלה אנחנו פה עם כלבים עושים חיים בלה בלה בלההכ נצשיך למלא מידע בלה בלה בלה איזה כיף פוסט ארוך "
        }
        style={styles.postText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginBottom: 10,
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "grey",
  },
  header: {
    padding: 6,
    flexDirection: "row",
    marginBottom: 10,
  },
  avatarContainer: {
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  infoText: {
    color: "#888",
    fontSize: 12,
  },
  postText: {
    lineHeight: 20,
  },
});

export default Post;
