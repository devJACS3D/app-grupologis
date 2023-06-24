import React, { useEffect } from "react";
import { useState } from "react";
import {
  FlatList,
  Modal,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import CardEinfo from "../components/HomeScreen/homeView/CardEinfo";
import NewEntryList from "../components/HomeScreen/newEntryView/NewEntryList";
import ConfirmActivity from "../components/common/ConfirmActivity";
import { images } from "../utils";
import Toast from "react-native-toast-message";

import Layout from "../components/layout/Layout";
import { heightPercentageToPx, widthPercentageToPx } from "../utils";

import MultiStepForm from "../components/HomeScreen/newEntryView/MultiStepForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  cancelarSolicitudesApi,
  getSer,
  postSer,
} from "../utils/axiosInstance";
import LoaderItemSwitch from "../components/common/loaders/LoaderItemSwitch";
import { useFocusEffect } from "@react-navigation/native";
import LoaderItemSwitchDark from "../components/common/loaders/LoaderItemSwitchDark";

const NewEntryView = (props) => {
  const { navigation } = props;
  const [modal, setModal] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [listNoved, setListNoved] = useState([]);
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const selectFechaActual = () => {
    let fecha = new Date();
    let mes = fecha.getMonth() + 1;
    let dia = fecha.getDate();
    let year = fecha.getFullYear();

    //  validar si dia y mes es menor a 10
    dia < 10 ? (dia = "0" + dia) : dia;
    mes < 10 ? (mes = "0" + mes) : mes;

    return `${year}-${mes}-${dia}`;
    // return `${dia}/${mes}/${year}`;
  };

  const showToast = (smg, type) => {
    Toast.show({
      type: type, //"success", error
      text1: smg,
      position: "bottom",
      visibilityTime: 2000,
    });
  };

  const closeAfterConfirm = async (info) => {
    let infoLog = await AsyncStorage.getItem("logged");
    infoLog = JSON.parse(infoLog);
    const empSel = infoLog.empSel.trim().toUpperCase();
    const codEmp = infoLog.codEmp;

    const { stepOneData, stepTwoData, stepThreeData } = info;

    const fecIn = stepTwoData.fecIngreso.replaceAll("/", "-");
    const fecEg = stepTwoData.fecEgreso.replaceAll("/", "-");
    const jorn =
      stepTwoData.select.jornada.label ==
      "Jonada incompleta (Especificar la jornada)"
        ? stepTwoData.select.jornadaPer.label
        : stepTwoData.select.jornada.label.toUpperCase();

    // Remueve los separadores de miles
    const auxBon = stepThreeData.select.valorAuxBonifi.label.replace(/\./g, "");
    // Remueve el separador decimal
    const auxBonVal = auxBon.replace(",", "");

    // Remueve los separadores de miles
    const salBase = stepThreeData.select.valorSalario.label.replace(/\./g, "");
    // Remueve el separador decimal
    const salBaseVal = salBase.replace(",", "");

    let body = {
      cod_emp: stepOneData.identificacion,
      nom1_emp: stepOneData.nombre,
      nom2_emp: stepOneData.segundoNombre,
      ap1_emp: stepOneData.apellido,
      ap2_emp: stepOneData.segundoApellido,
      e_mail: stepOneData.email,
      cel_emp: stepOneData.tel,
      ciu_res: stepOneData.munic,
      dep_res: stepOneData.depar,
      fecha_ing: fecIn,
      fecha_egr: fecEg,
      tip_con: stepTwoData.select.contrato.value,
      tip_tra: stepTwoData.select.trabajador.label.toUpperCase(),
      cod_conv: stepTwoData.select.convenio.value,
      cod_car: stepTwoData.select.cargo.value,
      obra_labor: stepTwoData.laborOrden,
      tip_jor: jorn,
      pag_d31: stepTwoData.pago31 ? "1" : "0",
      cco_cli: stepThreeData.select.centCostos.value,
      tip_sal: stepThreeData.select.salario.label.toUpperCase(),
      nov_con: stepThreeData.select.auxBonif.value,
      nov_val: parseInt(auxBonVal, 10),
      nov_per: "0",
      sal_bas: parseInt(salBaseVal, 10),
      dot_emp: stepThreeData.dotacion ? "1" : "0",
      empresa: empSel,
      cod_cli: codEmp,
      tip_ide: "cedula",
      tip_nov: "INGRESO",
      fecha_oi: selectFechaActual(),
      camisa_emp: stepThreeData.dotacion
        ? stepThreeData.select.camisa.label
        : "",
      overol_emp: stepThreeData.dotacion
        ? stepThreeData.select.overol.label
        : "",
      guantes_emp: stepThreeData.dotacion
        ? stepThreeData.select.guantes.label
        : "",
      pantalon_emp: stepThreeData.dotacion
        ? stepThreeData.select.pantalon.label
        : "",
      zapatos_emp: stepThreeData.dotacion
        ? stepThreeData.select.zapatos.label
        : "",
    };

    body = JSON.stringify(body);
    const path = "CrearOrdenIngreso.php";
    const respApi = await postSer(path, body, 30000);
    const { status, data } = respApi;
    if (status) {
      if (data.status) {
        setShowForm(false);
        setTimeout(() => {
          setModal(false);
          setShowForm(true);
          getNovedadesAll();
        }, 3000);
      } else {
        showToast("Error en el servidor", "error");
      }
    } else {
      if (data == "limitExe") {
        showToast("El servicio demoro mas de lo normal", "error");
      } else if (data != "abortUs") {
        showToast("Ocurrio un error en el servidor", "error");
      }
    }
  };

  const comparar = (a, b) => {
    const partesFeca = a.fecha_ing.split("/");
    const partesFecb = b.fecha_ing.split("/");
    const fechaA = new Date(partesFeca[2], partesFeca[1] - 1, partesFeca[0]);
    const fechaB = new Date(partesFecb[2], partesFecb[1] - 1, partesFecb[0]);
    return fechaB - fechaA;
  };

  const getNovedadesAll = async () => {
    setLoader(true);

    let infoLog = await AsyncStorage.getItem("logged");
    infoLog = JSON.parse(infoLog);
    const empSel = infoLog.empSel.trim().toUpperCase();
    const codEmp = infoLog.codEmp;

    const path = `ConsultarOrdenIngreso.php?cod_cli=${codEmp}&empresa=${empSel}`;
    const respApi = await getSer(path, 30000);
    const { status, data } = respApi;
    if (status) {
      if (data.orden_ingreso != null) {
        data.orden_ingreso.sort(comparar);
        setListNoved(data.orden_ingreso);
        setLoader(false);
      } else {
        setListNoved([]);
        setLoader(false);
      }
    } else {
      if (data == "limitExe") {
        showToast("El servicio demoro mas de lo normal", "error");
        setListNoved([]);
        setLoader(false);
      } else if (data != "abortUs") {
        showToast("Error al buscar las novedades", "error");
        setListNoved([]);
        setLoader(false);
      }
    }
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    await getNovedadesAll();
    setRefreshing(false);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getNovedadesAll();
      return () => {
        cancelarSolicitudesApi();
      };
    }, [])
  );

  return (
    <Layout props={{ ...props }}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <CardEinfo
          title={"Orden de ingreso"}
          buttonText="Generar"
          showButton={true}
          showInput={false}
          onPressAction={() => setModal(!modal)}
          handleGoBack={() => navigation.navigate("EmployeeManagement")}
        />
        {!loader ? (
          <NewEntryList newingList={listNoved} />
        ) : (
          <View style={styles.loaderContainer}>
            <LoaderItemSwitchDark />
          </View>
        )}
      </ScrollView>
      {modal && (
        <Modal animationType="slide" visible={modal} transparent={true}>
          <View style={styles.modalContainer}>
            {showForm ? (
              <MultiStepForm
                closeModal={() => setModal(false)}
                onConfirm={closeAfterConfirm}
              />
            ) : (
              <ConfirmActivity
                closeModal={() => {
                  setModal(false);
                  setShowForm(true);
                }}
                title="Se ha generado su solicitud de ingreso"
                description="Recuerde estar pendiente a su correo para recibir la respuesta"
                image={images.checkImage}
              />
            )}
          </View>
        </Modal>
      )}
    </Layout>
  );
};

export default NewEntryView;

const styles = StyleSheet.create({
  generalView: {
    height: heightPercentageToPx(100),
    width: widthPercentageToPx(100),
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    transform:
      Platform.OS == "android" ? [{ translateY: 45 }] : [{ translateY: 60 }],
  },
  loaderContainer: {
    marginTop: heightPercentageToPx(5),
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
