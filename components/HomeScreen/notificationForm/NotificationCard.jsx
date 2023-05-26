import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Pressable,
} from "react-native";
import { colors, getFontStyles } from "../../../utils";
import { useNavigation } from "@react-navigation/native";

import state1 from "../../../assets/images/components/notifications/state-1.png";
import state2 from "../../../assets/images/components/notifications/state-2.png";
import state3 from "../../../assets/images/components/notifications/state-3.png";
import state4 from "../../../assets/images/components/notifications/state-4.png";

const NotCard = ({ titleNot, descNot, imageNot, dateNot, type, close }) => {
  const navigation = useNavigation();
  let srcImg;
  switch (imageNot) {
    case "state-1.jpg":
      srcImg = state1;
      break;
    case "state-2.jpg":
      srcImg = state2;
      break;
    case "state-3.jpg":
      srcImg = state3;
      break;
    case "state-4.jpg":
      srcImg = state4;
      break;
  }

  const redir = (typeNot) => {
    if (typeNot == "noticia") {
      navigation.navigate("NewsDailyView");
    }
    close();
  };
  return (
    <Pressable onPress={() => redir(type)}>
      <View style={styles.scrollStyle}>
        <View style={styles.imgContainer}>
          <Image source={srcImg} style={styles.image} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{titleNot}</Text>
          <Text style={styles.description}>{descNot}</Text>
          <Text style={styles.description}>{dateNot}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default NotCard;

const styles = StyleSheet.create({
  scrollStyle: {
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 17,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: "center",
    flexDirection: "row",
    display: "flex",
  },
  imgContainer: {
    width: "25%",
  },
  infoContainer: {
    width: "75%",
  },
  title: {
    ...getFontStyles(15, 0.9, 1.1),
    fontFamily: "Poppins-Bold",
    marginBottom: 5,
    color: colors.darkGray,
  },
  description: {
    fontFamily: "Volks-Serial-Light",
    color: colors.darkGray,
    ...getFontStyles(12, 0.9, 1.2),
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
});
