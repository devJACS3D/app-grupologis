import { AntDesign } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import { colors, widthPercentageToPx } from "../../../utils";
import CardElement from "../newsView/components/CardElement";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  downloadArchivoAndroid,
  downloadArchivoIOS,
  fetchPost,
} from "../../../utils/functions";
import LoaderProgContext from "../../../context/loader/LoaderProgContext";
import { Text } from "react-native";
import LoaderItemSwitchDark from "../../common/loaders/LoaderItemSwitchDark";
import WebViewContext from "../../../context/webView/WebViewContext";

const ResumeCard = (props) => {
  const { setLoaderProg } = useContext(LoaderProgContext);
  const { setNameUtiView } = useContext(WebViewContext);

  const initDesc = props.initDesc;
  const showToast = (smg, type) => {
    Toast.show({
      type: type, //"success", error
      text1: smg,
      position: "bottom",
      visibilityTime: 2000,
    });
  };

  const dowArchivo = async (data) => {
    console.log("data archivo", data);
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
      console.log("respIOS", respIOS);
      setNameUtiView(respIOS);
      archDes = respIOS.status;
    }

    if (archDes) {
      initDesc(false);
      showToast("Listo", "success");
      setLoaderProg(false);
    } else {
      initDesc(false);
      showToast("No se genero un archivo", "error");
      setLoaderProg(false);
    }
  };

  const dowHVida = async () => {
    setLoaderProg(true);
    initDesc(props);
    let infoLog = await AsyncStorage.getItem("logged");
    infoLog = JSON.parse(infoLog);
    const empSel = infoLog.empSel;
    const codEmp = infoLog.codEmp;
    const info = `NitCliente=${codEmp}&Empresa=${empSel.toUpperCase()}&CodEmpleado=%&IdDocumento=${
      props.IdDocumento
    }`;
    const path = "usuario/getDownDoc.php";
    const respApi = await fetchPost(path, info);

    const { status, data } = respApi;
    if (status) {
      if (data.Correcto === 1) {
        dowArchivo(data);
      } else {
        initDesc(false);
        showToast("Error en el servidor", "error");
        setLoaderProg(false);
      }
    } else {
      initDesc(false);
      showToast("Error en el servidor", "error");
      setLoaderProg(false);
    }
  };
  return (
    <View style={styles.cardContainer}>
      <View style={styles.leftContent}>
        <View style={styles.cardColumn}>
          <CardElement head={"Nombre"} content={props.NombreDocumento} />
          {/* <CardElement head={"RAD."} content={props.RAD} /> */}
          {/* <CardElement head={"Identificacion"} content={props.Identificacion} /> */}
        </View>
        <View style={styles.cardColumn}>
          {/* <CardElement head={"Nombre"} content={props.NombreDocumento} /> */}
          {/* <CardElement head={"Fecha"} content={props.fecha} /> */}
        </View>
      </View>

      {typeof initDesc != "boolean" && (
        <View style={styles.rightContent}>
          <Pressable onPress={() => dowHVida()}>
            <View style={styles.actionButton("ghost")}>
              <AntDesign name="download" size={18} color={colors.darkGray} />
            </View>
          </Pressable>
        </View>
      )}
    </View>
  );
};
export default ResumeCard;

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
    width: "65%",
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
  loaderDes: {
    flex: 1,
    width: widthPercentageToPx(100),
    // width: "100%",
  },
});
