import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import { colors } from "../../../utils";
import CardElement from "../newsView/components/CardElement";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  downloadArchivoAndroid,
  downloadArchivoIOS,
  fetchPost,
} from "../../../utils/functions";
import LoaderProgContext from "../../../context/loader/LoaderProgContext";
import WebViewContext from "../../../context/webView/WebViewContext";

const BillsCard = (props) => {
  const { setLoaderProg } = useContext(LoaderProgContext);
  const { setNameUtiView } = useContext(WebViewContext);

  const showToast = (smg, type) => {
    Toast.show({
      type: type, //"success", error
      text1: smg,
      position: "bottom",
      visibilityTime: 2000,
    });
  };

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
      showToast("Listo", "success");
      setLoaderProg(false);
    } else {
      showToast("Error al generar el archivo", "error");
      setLoaderProg(false);
    }
  };

  const downloadBill = async (infoBill) => {
    setLoaderProg(true);
    const [doc, type] = infoBill;

    let infoLog = await AsyncStorage.getItem("logged");
    infoLog = JSON.parse(infoLog);
    const empSel = infoLog.empSel;
    const codEmp = infoLog.codEmp;

    const info = `mes=${doc.mes.trim()}&anho=${doc.anho.trim()}&Empresa=${empSel}&NitCliente=${codEmp}&subtipo=${doc.subtipo.trim()}&nofact=${doc.nofact.trim()}`;
    const path = ["usuario/getReporteFact.php", "usuario/getSoporteFact.php"];

    const respApi = await fetchPost(path[type], info);
    const { status, data } = respApi;
    if (status) {
      if (data.Correcto === 1) {
        // descargar archivo
        dowArchivo(data);
      } else {
        showToast("Error en el servidor", "error");
        setLoaderProg(false);
      }
    } else {
      if (data == "limitExe") {
        showToast("El servicio demoro más de lo normal", "error");
        setLoaderProg(false);
      } else if (data != "abortUs") {
        showToast("Error en el servidor", "error");
        setLoaderProg(false);
      }
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.leftContent}>
        <View style={styles.cardColumn}>
          <CardElement head={"Año"} content={props.anho.trim()} />
          <CardElement head={"Subtipo"} content={props.subtipo.trim()} />
        </View>
        <View style={styles.cardColumn}>
          <CardElement head={"Mes"} content={props.mes.trim()} />
          <CardElement head={"Fecha"} content={props.fecha} />
        </View>
        <View style={styles.cardColumn}>
          <CardElement head={"No.Factura"} content={props.nofact.trim()} />
          <CardElement
            head={"Descripcion"}
            content={
              props.desc != null
                ? props.desc?.slice(0, 10) + "..."
                : "Sin Descr..."
            }
          />
        </View>
      </View>

      <View style={styles.rightContent}>
        {/* descargar reporte factura  */}
        <Pressable onPress={() => downloadBill([props, 0])}>
          <View style={styles.actionButton("ghost")}>
            <FontAwesome5
              name="file-invoice"
              size={18}
              color={colors.darkGray}
            />
          </View>
        </Pressable>
        {/* descargar soporte  */}
        <Pressable onPress={() => downloadBill([props, 1])}>
          <View style={styles.actionButton("ghost")}>
            <AntDesign name="download" size={18} color={colors.darkGray} />
          </View>
        </Pressable>
      </View>
    </View>
  );
};
export default BillsCard;

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
    width: "80%",
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
});
