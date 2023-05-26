import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../utils";

import SuccessIcon from "../../../assets/images/components/toast/success-icon";
import ErrorIcon from "../../../assets/images/components/toast/error-icon";
import { Modal } from "react-native";

export const SuccessToast = (props) => {
  return (
    <View style={styles.toastContainer}>
      <View style={styles.success}>
        <View style={styles.boxToast}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{props.text1}</Text>
          </View>

          <SuccessIcon />
        </View>
      </View>
    </View>
  );
};

export const ErrorToast = (props) => {
  console.log("error toast", props);
  return (
    <View style={styles.toastContainer}>
      <View style={styles.error}>
        <View style={styles.boxToast}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{props.text1}</Text>
          </View>

          <ErrorIcon />
        </View>
      </View>
    </View>
  );
};

export default SuccessToast;

const styles = StyleSheet.create({
  boxToast: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    display: "flex",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Volks-Bold",
    fontSize: 17,

    color: colors.light,
  },
  success: {
    width: "90%",
    backgroundColor: colors.green,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  error: {
    width: "90%",
    backgroundColor: colors.red,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  toastContainer: {
    height: 40,
    position: "absolute",
    bottom: -2,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});
