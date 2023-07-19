import React, { useEffect, useState } from "react";
import { View, TextInput, Button, Text, Switch } from "react-native";
import FormStepThree from "./formSteps/FormStepThree";
import GLButton from "../../../common/buttons/GLButton";
import { colors, widthPercentageToPx } from "../../../../utils";
import FormDotacion from "./formSteps/FormDotacion";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSer } from "../../../../utils/axiosInstance";
import Toast from "react-native-toast-message";
import LoaderItemSwitch from "../../../common/loaders/LoaderItemSwitch";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const StepThree = ({ formData, onComplete, completed }) => {
  const [value, setValue] = React.useState();
  const [dotacion, setDotacion] = useState(false);
  const [listCenCost, setListCenCost] = useState([]);
  const [listAuxBon, setListAuxBon] = useState([]);

  const toggleDotacion = () => setDotacion((previousState) => !previousState);

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
      getCenCostos();
    } else {
      getAuxBon();
    }
  };

  const getCenCostos = async (pathCenCos) => {
    const respCenCos = await getSer(pathCenCos, 30000);
    const { status, data } = respCenCos;
    if (status) {
      setListCenCost(data.centro_costos);
    } else {
      if (data == "limitExe") {
        reloadSer(1);
      } else if (data != "abortUs") {
        showToast("Error al traer listado de cargos", "error");
      }
    }
  };

  const getAuxBon = async (pathAuxBon) => {
    const respAuxBon = await getSer(pathAuxBon, 30000);
    const { status, data } = respAuxBon;
    if (status) {
      data.novedades.unshift({
        cod_con: "",
        nom_con: "Sin bonificacion",
      });
      setListAuxBon(data.novedades);
    } else {
      if (data == "limitExe") {
        reloadSer(2);
      } else if (data != "abortUs") {
        showToast("Error al buscar Aux / bonific", "error");
      }
    }
  };

  const getServiciosSel = async () => {
    let infoLog = await AsyncStorage.getItem("logged");
    infoLog = JSON.parse(infoLog);
    const empSel = infoLog.empSel.toUpperCase();
    const codEmp = infoLog.codEmp;
    const codCon = formData.stepTwoData.select.convenio.value;

    let pathCenCos = `GetDatosOrdenIngreso.php`;
    pathCenCos += `?cod_cli=${codEmp}&empresa=${empSel}&cod_conv=${codCon}`;
    const pathAuxBon = `GetNovedadesFijas.php?empresa=${empSel}`;

    getCenCostos(pathCenCos);
    getAuxBon(pathAuxBon);
  };

  useEffect(() => {
    if (completed) {
      getServiciosSel();
    }
  }, [completed]);

  const setSeleccForm = (selec) => {
    setValue({ ...value, ...selec });
  };

  const handlePress = () => {
    if (value) {
      const {
        auxBonif,
        camisa,
        centCostos,
        guantes,
        overol,
        pantalon,
        salario,
        valorAuxBonifi,
        valorSalario,
        zapatos,
      } = value;
      if (
        centCostos.label == "Centro de costos" ||
        salario.label == "Tipo de salario" ||
        valorSalario.label == ""
      ) {
        showToast("Por favor, rellene todos los campos", "error");
      } else if (
        dotacion &&
        (!zapatos ||
          !pantalon ||
          !guantes ||
          !overol ||
          !camisa ||
          zapatos.label == "" ||
          pantalon.label == "" ||
          guantes.label == "Talla guantes" ||
          overol.label == "Talla overol" ||
          camisa.label == "Talla Camisa")
      ) {
        showToast("Por favor, rellene todos los campos", "error");
      } else {
        onComplete({
          stepThreeData: {
            select: value,
            dotacion: dotacion,
          },
        });
      }
    } else {
      showToast("Por favor, rellene todos los campos", "error");
    }
  };

  return (
    <View>
      <FormStepThree
        lisCenCost={listCenCost}
        lisAuxBon={listAuxBon}
        onSelectionChange={setSeleccForm}
      />
      <Text>Dotacion Aspirante</Text>
      <Switch
        trackColor={{
          false: colors.placeholderColor,
          true: colors.mainBackgroundColor,
        }}
        thumbColor={dotacion ? colors.buttonsColor : colors.gray}
        ios_backgroundColor={colors.placeholderColor}
        onValueChange={toggleDotacion}
        value={dotacion}
      />
      {dotacion && <FormDotacion onSelectionChange={setSeleccForm} />}
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

export default StepThree;
const styles = StyleSheet.create({
  btnAli: {
    justifyContent: "center",
    alignItems: "center",
  },
});
