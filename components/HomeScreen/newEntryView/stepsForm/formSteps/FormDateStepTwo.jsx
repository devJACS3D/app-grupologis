import { Feather, Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import {
  colors,
  heightPercentageToPx,
  widthPercentageToPx,
} from "../../../../../utils";
import React, { useEffect, useState } from "react";
import SpecialCalendar from "../../../../common/form/SpecialCalendar";
import GLButton from "../../../../common/buttons/GLButton";

const FormDateStepTwo = ({ changeResultDate }) => {
  const [modal, setModal] = useState(false);
  const [dateSel, setDateSel] = useState("");
  const [textDateIng, setTextDateIng] = useState("Fecha de ingreso");
  const [textDateEgr, setTextDateEgr] = useState("Fecha de egreso");
  const [formdate, setFormdate] = useState({
    ingreso: null,
    egreso: null,
  });
  const fechaAc = new Date();

  useEffect(() => {
    changeResultDate(formdate);
  }, [formdate]);

  const resDate = (date) => {
    if (dateSel == "ingreso") {
      setFormdate({
        ...formdate,
        ingreso: date,
      });
    } else {
      setFormdate({
        ...formdate,
        egreso: date,
      });
    }
  };
  return (
    <View>
      <Pressable
        style={styles.select}
        onPress={() => {
          setModal(true);
          setDateSel("ingreso");
        }}
      >
        <Text
          style={formdate.ingreso ? styles.selectTextDis : styles.selectText}
        >
          {textDateIng}
        </Text>
        <Ionicons name="calendar" size={25} color={colors.placeholderColor} />
      </Pressable>

      <Pressable
        style={styles.select}
        onPress={() => {
          setModal(true);
          setDateSel("egreso");
        }}
      >
        <Text
          style={formdate.egreso ? styles.selectTextDis : styles.selectText}
        >
          {textDateEgr}
        </Text>
        <Ionicons name="calendar" size={25} color={colors.placeholderColor} />
      </Pressable>

      {/* modal  */}
      {modal && (
        <Modal animationType="slide" visible={modal} transparent={true}>
          <View style={styles.modalForm}>
            <View style={styles.infoForm}>
              <Pressable onPress={() => setModal(false)}>
                <View style={styles.goBackButton}>
                  <Feather name="x" size={24} color={colors.purpleIcons} />
                </View>
              </Pressable>
              <SpecialCalendar
                placeholder={`Fecha de ${dateSel}`}
                value={new Date()}
                dia={dateSel == "ingreso" ? fechaAc.getDate() + 3 : ""}
                selectable={false}
                onChange={(e) => {
                  dateSel == "ingreso"
                    ? setTextDateIng(e.date)
                    : setTextDateEgr(e.date);
                  resDate(e);
                }}
                addYears={dateSel == "ingreso" ? [] : fechaAc.getFullYear() + 1}
              />
              <View style={styles.modalContainer}>
                <GLButton
                  type={"default"}
                  placeholder="Continuar"
                  width={widthPercentageToPx(70)}
                  onPressAction={() => setModal(false)}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default FormDateStepTwo;

const styles = StyleSheet.create({
  select: {
    backgroundColor: colors.mainBackgroundColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  selectTextDis: {
    fontSize: 16,
    fontFamily: "Volks-Serial-Medium",
    color: colors.black,
  },
  selectText: {
    fontSize: 16,
    fontFamily: "Volks-Serial-Medium",
    color: colors.placeholderColor,
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalForm: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // top: 80,
    // marginLeft: widthPercentageToPx(5),
    // borderRadius: 10,
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    // transform: [{ translateY: 0 }],
    width: widthPercentageToPx(100),
    height: heightPercentageToPx(100),
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  infoForm: {
    width: widthPercentageToPx(90),
    height: heightPercentageToPx(35),
    backgroundColor: "rgb(255,255,255)",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  goBackButton: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lightGray,
    borderRadius: 15,
    marginBottom: 10,
    height: 30,
    width: 30,
  },
});
