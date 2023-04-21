import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import { colors } from "../../../utils";
import CardElement from "../newsView/components/CardElement";

const NewEntryCard = (props) => {
  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Descarga Completada",

      position: "bottom",
      visibilityTime: 2000,
    });
  };
  return (
    <View style={styles.cardContainer}>
      <View style={styles.leftContent}>
        <View style={styles.cardColumn}>
          <CardElement head={"RAD."} content={props.ID_oi} />
          <CardElement
            head={"Nombre"}
            content={props.nom1_emp + " " + props.ap1_emp}
          />
        </View>

        <View style={styles.cardColumn}>
          <CardElement head={"Fecha"} content={props.fecha_ing} />
          <CardElement head={"Cargo"} content={props.tip_tra} />
        </View>
      </View>
      <View style={styles.cardColumn}>
        <CardElement head={"Identificacion"} content={props.cod_emp} />
      </View>

      <View style={styles.rightContent}>
        <Pressable onPress={showToast} style={styles.rightContent}>
          <View style={styles.actionButton("ghost")}>
            <AntDesign name="download" size={18} color={colors.darkGray} />
          </View>
        </Pressable>
        <Pressable onPress={showToast} style={styles.rightContent}>
          <View style={styles.actionButton("ghost")}>
            <AntDesign name="eye" size={18} color={colors.darkGray} />
          </View>
        </Pressable>
      </View>
    </View>
  );
};
export default NewEntryCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.white,
    borderRadius: 17,
    marginBottom: 20,
    padding: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  rightContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  actionButton: (type) => ({
    width: 36,
    height: 36,
    borderColor: type === "ghost" ? "#DBDBDB" : null,
    borderWidth: type === "ghost" ? 2 : 0,
    backgroundColor:
      type === "ghost" ? colors.white : colors.mainBackgroundColor,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
  }),
});
