import React, { useContext } from "react";
import { ScrollView, StyleSheet } from "react-native";
import CardEinfo from "../components/HomeScreen/homeView/CardEinfo";
import Layout from "../components/layout/Layout";
import FormBillsModal from "../components/HomeScreen/masterEmployee/FormMasterEmployee";
import { heightPercentageToPx, widthPercentageToPx } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  downloadArchivoAndroid,
  downloadArchivoIOS,
  fetchPost,
} from "../utils/functions";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";
import WebViewContext from "../context/webView/WebViewContext";

const NewEntryView = (props) => {
  const { navigation } = props;
  const { setNameUtiView } = useContext(WebViewContext);

  const dowArchivo = async (data) => {
    let archDes;
    if (Platform.OS === "android") {
      archDes = await downloadArchivoAndroid(
        data.file,
        data.mimetype,
        data.name
      );
    } else {
      const respIOS = await downloadArchivoIOS(
        data.file,
        data.mimetype,
        data.name
      );
      setNameUtiView(respIOS);
      archDes = respIOS.status;
    }
    if (archDes) {
      navigation.navigate("EmployeeManagement");
      Toast.show({
        type: "success",
        text1: "Descarga Completada",
        position: "bottom",
        visibilityTime: 2000,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error al generar el archivo",
        position: "bottom",
        visibilityTime: 2000,
      });
    }
  };

  const downloadMasterEmp = async (infoFor) => {
    const { status, startDate, endDate } = infoFor;
    let infoLog = await AsyncStorage.getItem("logged");
    infoLog = JSON.parse(infoLog);
    const empSel = infoLog.empSel;
    const codEmp = infoLog.codEmp;

    const info = `Empresa=${empSel}&NitCliente=${codEmp}&FechaInicial=${startDate}
      &FechaFinal=${endDate}&Estado=${status}`;
    const path = "usuario/getMaestroEmpleados.php";
    const respApi = await fetchPost(path, info);
    if (respApi.status) {
      const data = respApi.data;
      if (data.Correcto === 1) {
        dowArchivo(data);
      } else {
        Toast.show({
          type: "error",
          text1: "Error al generar el archivo",
          position: "bottom",
          visibilityTime: 2000,
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Error al generar el archivo",
        position: "bottom",
        visibilityTime: 2000,
      });
    }
  };

  return (
    <Layout props={{ ...props }}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <CardEinfo
          title={"maestro empleado"}
          showButton={false}
          showInput={false}
          onPressAction={() => setModal(!modal)}
          handleGoBack={() => navigation.navigate("EmployeeManagement")}
        />
        <FormBillsModal onConfirm={downloadMasterEmp} />
      </ScrollView>
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
  },
});
