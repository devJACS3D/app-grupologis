import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors, getFontStyles, widthPercentageToPx } from "../../utils";
import GLButton from "./buttons/GLButton";

const ConfirmActivityContent = ({ image, title, description, closeModal }) => {
  return (
    <View style={styles.contentContainer}>
      <View style={styles.topContent}>
        <Image style={styles.iconImage} source={{ uri: image }} />
        <View style={styles.textsContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.descriptionText}> {description}</Text>
        </View>
      </View>

      <GLButton
        onPressAction={closeModal}
        type="second"
        placeholder={"Cerrar"}
        width={widthPercentageToPx(70)}
      />
    </View>
  );
};

export default ConfirmActivityContent;

const styles = StyleSheet.create({
  contentContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "70%",
  },
  topContent: {
    display: "flex",
    alignItems: "center",
    gap: 15,
  },
  iconImage: {
    width: 109,
    height: 109,
  },
  textsContainer: {
    paddingHorizontal: 30,
  },
  titleText: {
    fontFamily: "Volks-Bold",
    marginTop: 2,
    color: colors.black,
    textAlign: "center",
    ...getFontStyles(25, 0.6, 0.9),
  },
  descriptionText: {
    fontFamily: "Poppins-Regular",
    color: colors.descriptionColors,
    marginBottom: 10,
    textAlign: "center",
    ...getFontStyles(13, 0.5, 0.9),
  },
});
