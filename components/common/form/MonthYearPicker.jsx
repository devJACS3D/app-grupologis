import React from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  colors,
  getFontStyles,
  validDates,
  validDatesSup,
  widthPercentageToPx,
} from "../../../utils";

import GLButton from "../buttons/GLButton";

const MonthYearPicker = ({
  setVisible,
  handleChangeMonth,
  changeYear,
  selectedMonthYear,
  visible,
  showYear = true,
  showMonth = true,
  yearSup = false,
  addYears = [],
}) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
      >
        <View style={styles.monthPicker}>
          {showMonth && (
            <>
              <Text style={styles.placeholder}>Mes</Text>
              <ScrollView
                horizontal
                contentContainerStyle={styles.dayOptions}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              >
                {validDates().validMonths.map((e, idx) => (
                  <Pressable key={idx} onPress={() => handleChangeMonth(idx)}>
                    <View
                      style={styles.dayElement(selectedMonthYear.month === idx)}
                    >
                      <Text style={styles.dayNumber}>{e}</Text>
                    </View>
                  </Pressable>
                ))}
              </ScrollView>
            </>
          )}
          {showYear && (
            <>
              <Text style={styles.placeholder}>Año</Text>
              <ScrollView
                horizontal
                contentContainerStyle={styles.dayOptions}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              >
                {!yearSup
                  ? validDates(addYears).validYears.map((e, idx) => (
                      <Pressable key={idx} onPress={() => changeYear(e)}>
                        <View
                          style={styles.dayElement(
                            selectedMonthYear.year === e
                          )}
                        >
                          <Text style={styles.dayNumber}>{e}</Text>
                        </View>
                      </Pressable>
                    ))
                  : validDatesSup(addYears).validYears.map((e, idx) => (
                      <Pressable key={idx} onPress={() => changeYear(e)}>
                        <View
                          style={styles.dayElement(
                            selectedMonthYear.year === e
                          )}
                        >
                          <Text style={styles.dayNumber}>{e}</Text>
                        </View>
                      </Pressable>
                    ))}
                {}
              </ScrollView>
            </>
          )}

          <GLButton
            type="default"
            placeholder={"Continuar"}
            width={widthPercentageToPx(70)}
            onPressAction={() => setVisible(false)}
          ></GLButton>
        </View>
      </View>
    </Modal>
  );
};

export default MonthYearPicker;

const styles = StyleSheet.create({
  monthPicker: {
    width: widthPercentageToPx(80),
    borderRadius: 17,
    padding: 20,
    backgroundColor: colors.white,
    elevation: 5,
  },
  placeholder: {
    ...getFontStyles(15, 0.5, 0.9),
    color: colors.black,
    fontFamily: "Poppins-Bold",
  },
  dayOptions: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    height: 55,
    marginVertical: 10,
  },
  dayElement: (isSelected) => ({
    width: 70,
    height: 55,
    borderRadius: 8,
    borderWidth: isSelected ? 2 : 2,
    borderColor: isSelected ? colors.green : colors.lightGray,
    backgroundColor: colors.white,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // padding: 10,
    // paddingVertical: 10,
  }),
  dayNumber: {
    fontFamily: "Volks-Bold",
    ...getFontStyles(16, 0.5, 0.9),
  },
});
