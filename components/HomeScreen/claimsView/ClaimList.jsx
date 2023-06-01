import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import claimsContext from "../../../context/claims/claimsContext";
import { colors, getFontStyles, widthPercentageToPx } from "../../../utils";

import { FontAwesome5 } from "@expo/vector-icons";
import ClaimCard from "./ClaimCard";

const ClaimList = (props) => {
  const { claimsList } = props;
  return (
    <View style={styles.newsListContainer}>
      <View style={styles.titleContainer}>
        <FontAwesome5 name="calendar-alt" size={24} color={colors.mainBlue} />
        <Text style={styles.firstTitle}>Quejas /</Text>
        <Text style={styles.secondTitle}>Enviadas</Text>
      </View>
      <View>
        {claimsList.length > 0 &&
          claimsList.map((n2, index2) => <ClaimCard key={index2} {...n2} />)}
      </View>
    </View>
  );
};

export default ClaimList;

const styles = StyleSheet.create({
  newsListContainer: {
    width: widthPercentageToPx(90),
    height: "100%",
  },
  titleContainer: {
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  firstTitle: {
    fontFamily: "Poppins-Regular",
    ...getFontStyles(18, 0.5, 0.9),
  },
  secondTitle: {
    fontFamily: "Poppins-Bold",
    color: colors.mainBlue,
    ...getFontStyles(18, 0.5, 0.9),
  },
});
