import { StyleSheet, View } from "react-native";
import SpecialCalendar from "../../../common/form/SpecialCalendar";
import { Pressable } from "react-native";
import newsContext from "../../../../context/news/newsContext";
import { useContext, useState } from "react";
import { Feather } from "@expo/vector-icons";
import {
  colors,
  heightPercentageToPx,
  widthPercentageToPx,
} from "../../../../utils";
import GLButton from "../../../common/buttons/GLButton";
import Toast from "react-native-toast-message";

const FormInicFin = ({ closeModal, onConfirm }) => {
  //   const { changeFormField } = useContext(newsContext);
  const [selectedDates, setSelectedDates] = useState({
    startDate: "",
    endDate: "",
  });

  const showToast = (smg, type) => {
    Toast.show({
      type: type, //"success", error
      text1: smg,
      position: "bottom",
      visibilityTime: 2000,
    });
  };

  const validateFech = () => {
    if (selectedDates.startDate == "" || selectedDates.endDate == "") {
      showToast("Seleccione todos los campos", "error");
      return false;
    } else {
      onConfirm(selectedDates);
    }
  };
  const changeFormField = (e) => {
    setSelectedDates({
      ...selectedDates,
      [e.field]: e.date,
    });
  };
  return (
    <View>
      <View style={styles.modalForm}>
        <Pressable onPress={closeModal}>
          <View style={styles.goBackButton}>
            <Feather name="x" size={24} color={colors.purpleIcons} />
          </View>
        </Pressable>
        <View style={styles.infoForm}>
          <SpecialCalendar
            placeholder={"Selecciona fecha inicial"}
            value={new Date()}
            selectable={false}
            onChange={(e) =>
              setSelectedDates({ ...selectedDates, startDate: e.date })
            }
          />
        </View>
        <View style={styles.infoForm}>
          <SpecialCalendar
            placeholder={"Selecciona fecha final"}
            value={new Date()}
            selectable={false}
            onChange={(e) =>
              setSelectedDates({ ...selectedDates, endDate: e.date })
            }
          />
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <GLButton
            onPressAction={() => validateFech()}
            type="default"
            placeholder={"Consultar"}
            width={widthPercentageToPx(80)}
          />
        </View>
      </View>
    </View>
  );
};

export default FormInicFin;

const styles = StyleSheet.create({
  modalForm: {
    top: 60,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    // transform: [{ translateY: 50 }],
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
    height: 30,
    width: 30,
    marginBottom: 30,
  },
  infoForm: {
    marginTop: 15,
  },
});
