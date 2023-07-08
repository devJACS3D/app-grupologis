import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, getFontStyles } from "../../../utils";

const FormTitle = ({ title, subtitle, description }) => {
  return (
    <View style={styles.titlesContainer}>
      <Text style={styles.welcomeText}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {description && <Text style={styles.welcomeDesc}>{description}</Text>}
    </View>
  );
};

export default FormTitle;

const styles = StyleSheet.create({
  titlesContainer: {
    paddingHorizontal: 30,
  },
  welcomeText: {
    fontFamily: "Poppins-Bold",
    marginTop: 2,
    color: colors.mainBlue,
    ...getFontStyles(30, 1, 1.5),
  },
  subtitle: {
    ...getFontStyles(25, 1, 1),
    marginBottom: 2,
    marginTop: 0,
    fontFamily: "Poppins-Bold",
  },
  welcomeDesc: {
    fontFamily: "Volks-Serial-Light",
    color: colors.descriptionColors,
    marginBottom: 15,
    marginTop: 10,
    ...getFontStyles(14, 1, 1.2),
  },
});
