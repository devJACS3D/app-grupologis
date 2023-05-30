import React, { useEffect, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

import moment from "moment";
import { ScrollView } from "react-native";
import { colors, getFontStyles } from "../../../utils";

import MonthYearPicker from "./MonthYearPicker";
import Toast from "react-native-toast-message";

let getDaysArray = function (year, month, day, selec) {
  let monthIndex = month - 1;
  let names = ["Dom", "Lun", "Mar", "Mier", "Jue", "Vie", "Sab"];
  // const newDay = typeof day == "string" ? 1 : day;
  let newDay = isNaN(day) || day < 1 || day > 31 ? 1 : day;
  let date = new Date(year, monthIndex, newDay);
  let result = [];
  while (date.getMonth() == monthIndex) {
    result.push({
      day: date.getDate().toString().padStart(2, "0"),
      isSelectable: selec
        ? ![0, 6].includes(date.getDay())
        : ![-1, 7].includes(date.getDay()),
      weekdayName: names[date.getDay()],
    });
    date.setDate(date.getDate() + 1);
  }
  return result;
};

const SpecialCalendar = ({
  placeholder,
  onChange,
  value,
  dia = "",
  selectable = true,
}) => {
  const [selectedDate, setSelectedDate] = useState(moment(value));
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonthYear, setSelectedMonthYear] = useState({
    month: value.getMonth() + 1,
    year: value.getFullYear(),
  });
  const [dayOptions, setDayOptions] = useState([]);
  const fechaActual = new Date();

  useEffect(() => {
    const fechaAc = new Date(); // Obtener fecha actual

    let result;
    if (dia == "") {
      result = getDaysArray(
        value.getFullYear(),
        value.getMonth() + 1,
        dia,
        selectable
      );
    } else {
      fechaAc.setDate(fechaAc.getDate() + 3);

      const diaAdd = fechaAc.getDate();
      const mes = fechaAc.getMonth() + 1;
      const anio = fechaAc.getFullYear();
      console.log(diaAdd, mes, anio);
      setSelectedDate(selectedDate.set("M", fechaAc.getMonth()));
      result = getDaysArray(anio, mes, diaAdd, selectable);
    }
    setDayOptions(result);
  }, []);

  const showToast = (smg, type) => {
    Toast.show({
      type: type, //"success", error
      text1: smg,
      position: "bottom",
      visibilityTime: 2000,
    });
  };

  const importDatosMon = (mon, diaAdd) => {
    setSelectedMonthYear({
      ...selectedMonthYear,
      month: mon,
    });
    setSelectedDate(selectedDate.set("M", mon));
    const result = getDaysArray(
      selectedMonthYear.year,
      (mon += 1),
      diaAdd,
      selectable
    );
    setDayOptions(result);
  };

  const importDatosYea = (yea, diaAdd) => {
    setSelectedMonthYear({
      ...selectedMonthYear,
      year: yea,
    });
    setSelectedDate(selectedDate.set("y", yea));
    const result = getDaysArray(
      yea,
      (selectedMonthYear.month += 1),
      diaAdd,
      selectable
    );
    setDayOptions(result);
  };

  const handleChangeMonth = (e) => {
    if (typeof dia != "string") {
      if (
        fechaActual.getFullYear() == selectedMonthYear.year &&
        fechaActual.getMonth() == e
      ) {
        importDatosMon(e, dia);
      } else if (
        fechaActual.getFullYear() >= selectedMonthYear.year &&
        fechaActual.getMonth() < e
      ) {
        importDatosMon(e, "");
      } else {
        const monthAct = fechaActual.getMonth();

        importDatosMon(monthAct, dia);
        showToast("Debe selecionar una fecha mayor", "error");
      }
    } else {
      importDatosMon(e, "");
    }
  };

  const changeYear = (e) => {
    if (typeof dia != "string") {
      if (
        fechaActual.getFullYear() == e &&
        fechaActual.getMonth() == selectedMonthYear.month
      ) {
        importDatosYea(e, dia);
      } else if (
        fechaActual.getFullYear() <= e &&
        fechaActual.getMonth() < selectedMonthYear.month
      ) {
        importDatosYea(e, "");
      } else {
        const monthAct = fechaActual.getMonth();

        const yearAct = fechaActual.getFullYear();

        showToast("Debe selecionar una fecha mayor", "error");
        const addDay = monthAct == selectedMonthYear.month ? dia : "";
        importDatosYea(yearAct, addDay);
      }
    } else {
      importDatosYea(e, "");
    }
  };

  const handleChangeDay = (day) => {
    if (!day.isSelectable) return;
    const dayNumber = day.day;
    const selectedDateCopy = selectedDate.clone();
    selectedDateCopy.set("D", dayNumber);
    let month = (selectedMonthYear.month += 1);
    month = month.toString().padStart(2, "0");
    const selectedDay = {
      date: `${selectedMonthYear.year}/${month}/${dayNumber}`,
      day: dayNumber,
      month: month,
      year: selectedMonthYear.year,
    };

    // setSelectedDate(selectedDate.set("D", dayNumber));
    setSelectedDay(day.day);
    onChange(selectedDay);
  };

  return (
    <SafeAreaView style={styles.specialCalendarContainer}>
      <View style={styles.headerData}>
        <Text style={styles.placeholder}>{placeholder}</Text>
        <Pressable onPress={() => setShowMonthPicker(true)}>
          <View style={styles.monthSelector}>
            <Text style={styles.monthText}>{selectedDate.format("MMMM")}</Text>
          </View>
        </Pressable>
        <MonthYearPicker
          visible={showMonthPicker}
          changeYear={changeYear}
          handleChangeMonth={handleChangeMonth}
          setVisible={setShowMonthPicker}
          selectedMonthYear={selectedMonthYear}
          yearSup={typeof dia == "string" ? false : true}
        />
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={styles.dayOptions}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {dayOptions.map((day) => (
          <Pressable key={day.day} onPress={() => handleChangeDay(day)}>
            <View
              style={styles.dayElement(
                selectedDay === day.day,
                day.isSelectable
              )}
            >
              <Text style={styles.weekdayName}>{day.weekdayName}</Text>
              <Text style={styles.dayNumber}>{day.day}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SpecialCalendar;

const styles = StyleSheet.create({
  specialCalendarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginBottom: 5,
  },
  headerData: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  placeholder: {
    ...getFontStyles(15, 0.5, 0.9),
    color: colors.black,
    fontFamily: "Poppins-Bold",
  },
  monthSelector: {
    width: 70,
    height: 20,
    backgroundColor: "transparent",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.mainBlue,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  monthText: {
    fontFamily: "Poppins-Light",
    color: colors.mainBlue,
    ...getFontStyles(10, 0.5, 0.9),
  },
  dayOptions: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    height: 75,
    marginVertical: 10,
    marginLeft: 5,
  },
  dayElement: (isSelected, isSelectable) => ({
    width: 70,
    height: 73,
    borderRadius: 8,
    borderWidth: isSelected ? 2 : 0,
    borderColor: isSelected ? colors.green : colors.white,
    backgroundColor: isSelectable ? colors.white : colors.gray,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.0,

    elevation: 5,
  }),
  dayNumber: {
    fontFamily: "Volks-Bold",
    ...getFontStyles(16, 0.5, 0.9),
  },
  weekdayName: {
    fontFamily: "Volks-Serial-Light",
    color: colors.descriptionColors,
    ...getFontStyles(11, 0.5, 0.9),
  },
});
