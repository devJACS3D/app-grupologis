import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from "react-native";
import FormCountry from "./formSteps/FormCountry";
import { colors, widthPercentageToPx } from "../../../../utils";
import GLButton from "../../../common/buttons/GLButton";
import SpecialCalendar from "../../../common/form/SpecialCalendar";
import FormStepTwo from "./formSteps/FormStepTwo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSer } from "../../../../utils/axiosInstance";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import FormDateStepTwo from "./formSteps/FormDateStepTwo";
import { useFocusEffect } from "@react-navigation/native";
import LoaderItemSwitch from "../../../common/loaders/LoaderItemSwitch";
import Toast from "react-native-toast-message";

const StepTwo = ({ formData, onComplete, completed }) => {
  const [laborOrden, setLaborOrden] = useState("");
  const [listCont, setListCont] = useState([]);
  const [listConvenio, setConvenio] = useState([]);
  const [dateIng, setDateIng] = useState("");
  const [dateEgr, setDateEgr] = useState("");
  const [isDay31, setIsDay31] = useState(false);
  const [infoForm, setInfoForm] = useState({});
  const toggleSwitchDay = () => setIsDay31((previousState) => !previousState);

  const showToast = (smg, type) => {
    Toast.show({
      type: type, //"success", error
      text1: smg,
      position: "bottom",
      visibilityTime: 2000,
    });
  };

  const reloadSer = (inf) => {
    if (inf == 1) {
      getContrato();
    } else {
      getOrdIng();
    }
  };

  const getContrato = async (pathReg) => {
    const respReg = await getSer(pathReg, 30000);
    const { status, data } = respReg;
    if (status) {
      setListCont(data.tipcontratos);
    } else {
      if (data == "limitExe") {
        reloadSer(1);
      } else if (data != "abortUs") {
        showToast("Error al traer tipos contrato", "error");
      }
    }
  };

  const getOrdIng = async (pathOrd) => {
    const respOrd = await getSer(pathOrd);
    const { status, data } = respOrd;
    if (status) {
      setConvenio(data.convenios);
    } else {
      if (data == "limitExe") {
        reloadSer(2);
      } else if (data != "abortUs") {
        showToast("Error al traer orden ingreso", "error");
      }
    }
  };

  const getServiciosSel = async () => {
    let infoLog = await AsyncStorage.getItem("logged");
    infoLog = JSON.parse(infoLog);
    const empSel = infoLog.empSel.toUpperCase();
    const codEmp = infoLog.codEmp;

    const pathReg = `GetTiposContrato.php?empresa=${empSel}`;
    const pathOrd = `GetDatosOrdenIngreso.php?cod_cli=${codEmp}&empresa=${empSel}`;

    getContrato(pathReg);
    getOrdIng(pathOrd);
  };

  useEffect(() => {
    if (completed) {
      getServiciosSel();
    }
  }, [completed]);

  const setSeleccForm = (selec) => {
    setInfoForm(selec);
  };

  const dateIngAndEgr = (infoDate) => {
    setDateIng(infoDate.ingreso);
    setDateEgr(infoDate.egreso);
  };

  const handlePress = () => {
    const { year, month, day } = dateIng;
    let fechaIng = new Date(parseInt(year), parseInt(month - 1), parseInt(day));

    let hoy = new Date();

    let limiteFecha = new Date();

    limiteFecha.setDate(hoy.getDate() + 3); // Obtener el límite de fecha mínimo permitido (hoy + 3 días)
    limiteFecha.setHours(0);
    limiteFecha.setMinutes(0);
    limiteFecha.setSeconds(0);
    limiteFecha.setMilliseconds(0);

    const { cargo, contrato, convenio, jornada, trabajador, jornadaPer } =
      infoForm;
    if (
      !laborOrden ||
      !dateIng ||
      !dateEgr ||
      contrato.label == "Tipo de contrato" ||
      cargo.label == "Cargo" ||
      convenio.label == "Convenio" ||
      jornada.label == "Tipo de jornada" ||
      trabajador.label == "Tipo de trabajador"
    ) {
      showToast("Por favor, rellene todos los campos", "error");
    } else if (
      jornada.label == "Jonada incompleta (Especificar la jornada)" &&
      jornadaPer.label == ""
    ) {
      showToast("Por favor, rellene todos los campos", "error");
    } else {
      if (fechaIng.getTime() >= limiteFecha.getTime()) {
        onComplete({
          stepTwoData: {
            select: infoForm,
            laborOrden: laborOrden,
            pago31: isDay31,
            fecIngreso: dateIng.date,
            fecEgreso: dateEgr.date,
          },
        });
      } else {
        showToast("La fecha de ingreso es incorrecta", "error");
      }
    }
  };

  return (
    <View>
      <FormDateStepTwo changeResultDate={dateIngAndEgr} />

      <FormStepTwo
        lisCont={listCont}
        listConv={listConvenio}
        onSelectionChange={setSeleccForm}
      />

      <TextInput
        placeholder="Labor / Orden"
        onChangeText={setLaborOrden}
        style={styles.input}
        placeholderTextColor={colors.placeholderColor}
        value={laborOrden}
      />
      <Text>Pago dia 31</Text>
      <Switch
        trackColor={{
          false: colors.placeholderColor,
          true: colors.mainBackgroundColor,
        }}
        thumbColor={isDay31 ? colors.buttonsColor : colors.gray}
        ios_backgroundColor={colors.placeholderColor}
        onValueChange={toggleSwitchDay}
        value={isDay31}
      />
      <View style={styles.btnAli}>
        <GLButton
          onPressAction={() => handlePress()}
          type="default"
          placeholder={"Siguiente"}
          width={widthPercentageToPx(70)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F3F3FF",
    width: "100%",
  },
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
  btnAli: {
    justifyContent: "center",
    alignItems: "center",
  },
  selectText: {
    fontSize: 16,
    fontFamily: "Volks-Serial-Medium",
    color: colors.placeholderColor,
  },
  input: {
    backgroundColor: colors.mainBackgroundColor,
    height: 50,
    paddingLeft: 20,
    marginBottom: 10,
    borderRadius: 10,
    width: "100%",
    fontFamily: "Volks-Serial-Medium",
    fontSize: 16,
    fontWeight: "normal",
  },
});

export default StepTwo;
