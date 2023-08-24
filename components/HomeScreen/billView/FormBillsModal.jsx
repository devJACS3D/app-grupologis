import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import moment from "moment";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  colors,
  getFontStyles,
  heightPercentageToPx,
  validDates,
  widthPercentageToPx,
} from "../../../utils";
import GLButton from "../../common/buttons/GLButton";
import FormStep from "../../common/form/FormStep";
import Toast from "react-native-toast-message";
import MonthYearPicker from "../../common/form/MonthYearPicker";

const FormBillsModal = ({ closeModal, onConfirm }) => {
  const now = moment();
  const [period, setPeriod] = useState({
    start: now.startOf("M"),
    end: now.startOf("M"),
  });
  const [values, setValues] = useState({
    month: now.get("M"),
    year: now.get("year"),
  });

  const [showYearSelector, setShowYearSelector] = useState(false);
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  const [hasChangedMonth, setHasChangedMonth] = useState(true);
  const [hasChangedYear, setHasChangedYear] = useState(true);

  const showToast = (smg, type) => {
    Toast.show({
      type: type, //"success", error
      text1: smg,
      position: "bottom",
      visibilityTime: 2000,
    });
  };

  const handleChangeMonth = (e) => {
    setPeriod({
      start: period.start.set("M", e),
      end: period.end.set("M", e),
    });

    setValues({
      ...values,
      month: e,
    });

    setHasChangedMonth(true);
  };

  const changeYear = (e) => {
    setPeriod({
      start: period.start.set("y", e),
      end: period.end.set("y", e),
    });

    setValues({
      ...values,
      year: e,
    });

    setHasChangedYear(true);
  };

  const validInfo = () => {
    if (!hasChangedYear || !hasChangedMonth) {
      showToast("Seleccione los datos", "error");
    } else {
      onConfirm(values);
    }
  };
  return (
    <View style={styles.modalForm}>
      <Pressable onPress={closeModal}>
        <View style={styles.goBackButton}>
          <Feather name="x" size={24} color={colors.purpleIcons} />
        </View>
      </Pressable>

      <View style={styles.modalContent}>
        <View style={{ width: "85%" }}>
          <FormStep icon={"info"} description="Selecciona mes y año." />
        </View>

        <Pressable
          style={{ width: "85%" }}
          onPress={() => setShowYearSelector(true)}
        >
          <View style={styles.selectorOption}>
            <Text style={styles.selectorText}>{values.year}</Text>
            <Ionicons name="calendar" size={20} color={colors.boldGray} />
          </View>
        </Pressable>

        <MonthYearPicker
          showMonth={false}
          changeYear={changeYear}
          setVisible={setShowYearSelector}
          visible={showYearSelector}
          selectedMonthYear={values}
        />

        <Pressable
          style={{ width: "85%" }}
          onPress={() => setShowMonthSelector(true)}
        >
          <View style={styles.selectorOption}>
            <Text style={styles.selectorText}>
              {hasChangedMonth
                ? validDates().validMonths[period.start.get("M")]
                : validDates().validMonths[period.start.get("M")]}
            </Text>
            <Ionicons name="calendar" size={20} color={colors.boldGray} />
          </View>
        </Pressable>

        <MonthYearPicker
          showYear={false}
          handleChangeMonth={handleChangeMonth}
          setVisible={setShowMonthSelector}
          visible={showMonthSelector}
          selectedMonthYear={values}
        />
        <GLButton
          onPressAction={() => validInfo()}
          type="default"
          placeholder={"Consultar"}
          width={widthPercentageToPx(70)}
        />
      </View>
    </View>
  );
};

export default FormBillsModal;

const styles = StyleSheet.create({
  modalForm: {
    top: widthPercentageToPx(15),
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    // transform: [{ translateY: 20 }],
    width: widthPercentageToPx(90),
    height: heightPercentageToPx(68),
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
  modalContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  selectorOption: {
    height: 50,
    borderRadius: 8,
    backgroundColor: colors.mainBackgroundColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  selectorText: {
    fontFamily: "Volks-Bold",
    color: colors.boldGray,
    ...getFontStyles(16, 0.8, 0.9),
  },
});
