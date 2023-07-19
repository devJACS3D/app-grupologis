import React, { useContext, useEffect, useState } from "react";
import {
  Linking,
  Modal,
  PixelRatio,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  colors,
  getFontStyles,
  heightPercentageToPx,
  widthPercentageToPx,
} from "../../../utils";
import Toast from "react-native-toast-message";
import {
  downloadArchivoAndroid,
  downloadArchivoIOS,
  fetchPost,
} from "../../../utils/functions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import FormBillsModal from "../billView/FormBillsModal";
import FormInicFin from "../newsView/components/FormInicFin";
import LoaderProgContext from "../../../context/loader/LoaderProgContext";
import WebViewContext from "../../../context/webView/WebViewContext";
import MultipleDownloads from "./MultipleDownloads";
import { ScrollView } from "react-native";
const pixelDensity = parseInt(PixelRatio.get());

const DownloadableCard = ({ title, desc, image, id, navigation }) => {
  const [modal, setModal] = useState(false);
  const [showForm, setShowForm] = useState("");
  const [reload, setReload] = useState(false);
  const [multHojasVida, setMultHojasVida] = useState(null);
  const { showLoader, setLoaderProg } = useContext(LoaderProgContext);
  const { nameUtiView, setNameUtiView } = useContext(WebViewContext);

  const showToast = (smg, type) => {
    Toast.show({
      type: type, //"success", error
      text1: smg,
      position: "bottom",
      visibilityTime: 2000,
    });
  };

  const servicesDescHojaVida = async (docs) => {
    if (!showLoader) {
      setLoaderProg(true);
      let infoLog = await AsyncStorage.getItem("logged");
      infoLog = JSON.parse(infoLog);
      const empSel = infoLog.empSel;
      const codEmp = infoLog.codEmp;
      const { CodEmpleado, IdDocumento } = docs;
      let infoDes = `NitCliente=%&Empresa=${empSel.toUpperCase()}`;
      infoDes += `&CodEmpleado=${CodEmpleado}&IdDocumento=${IdDocumento}`;
      const pathDes = "usuario/getDownDoc.php";
      const respApiDes = await fetchPost(pathDes, infoDes);

      const { status, data } = respApiDes;
      if (status) {
        if (data.Correcto === 1) {
          dowArchivo(data);
        } else {
          showToast("No se encontro documento", "error");
          setLoaderProg(false);
        }
      } else {
        if (data == "limitExe") {
          showToast("El servicio demoro mas de lo normal", "error");
          setLoaderProg(false);
          setReload(true);
        } else if (data != "abortUs") {
          showToast("Error en el servidor", "error");
          setLoaderProg(false);
        }
      }
    }
  };

  const getCerLaboral = async () => {
    // descargar certificado laboral
    if (!showLoader) {
      setLoaderProg(true);
      setReload(false);
      let infoLog = await AsyncStorage.getItem("logged");
      infoLog = JSON.parse(infoLog);
      const empSel = infoLog.empSel;
      const codEmp = infoLog.codEmp;
      const info = `Empresa=${empSel}&Cedula=${codEmp}`;
      const path = "usuario/getCertificadoLaboral.php";
      const respApi = await fetchPost(path, info);

      const { status, data } = respApi;

      if (status) {
        if (data.Correcto === 1) {
          dowArchivo(data);
        } else {
          showToast("Error en el servidor", "error");
          setLoaderProg(false);
        }
      } else {
        if (data == "limitExe") {
          showToast("El servicio demoro mas de lo normal", "error");
          setLoaderProg(false);
          setReload(true);
        } else if (data != "abortUs") {
          showToast("Error en el servidor", "error");
          setLoaderProg(false);
        }
      }
    }
  };

  const getIngresoRete = async () => {
    // descargar ingreso y retencion
    if (!showLoader) {
      setLoaderProg(true);
      setReload(false);
      let infoLog = await AsyncStorage.getItem("logged");
      infoLog = JSON.parse(infoLog);
      const empSel = infoLog.empSel;
      const codEmp = infoLog.codEmp;
      const date = new Date().getFullYear() - 1;

      const info = `Empresa=${empSel}&Cedula=${codEmp}&Anho=${date}`;
      const path = "usuario/getCertificadoRetencion.php";

      const respApi = await fetchPost(path, info);

      const { status, data } = respApi;
      if (status) {
        if (data.Correcto === 1) {
          dowArchivo(data);
        } else {
          showToast("Error en el servidor", "error");
          setLoaderProg(false);
        }
      } else {
        if (data == "limitExe") {
          showToast("El servicio demoro más de lo normal", "error");
          setLoaderProg(false);
          setReload(true);
        } else if (data != "abortUs") {
          showToast("Error en el servidor", "error");
          setLoaderProg(false);
        }
      }
    }
  };

  const getHojaVidaLab = async () => {
    // descargar hoja de vida laboral
    if (!showLoader) {
      setLoaderProg(true);
      setReload(false);
      let infoLog = await AsyncStorage.getItem("logged");
      infoLog = JSON.parse(infoLog);
      const empSel = infoLog.empSel;
      const codEmp = infoLog.codEmp;
      const nit = "%";

      const info = `Empresa=${empSel}&CodEmpleado=${codEmp}&NitCliente=${nit}`;
      const path = "usuario/getHojaDeVidaEmpleado.php";

      const respApi = await fetchPost(path, info);

      const { status, data } = respApi;
      if (status) {
        if (data.Correcto == 1) {
          if (data.Docs.length > 1) {
            setLoaderProg(false);
            setMultHojasVida(data.Docs);
            setModal(true);
          } else {
            servicesDescHojaVida(data.Docs);
          }
        } else {
          showToast("No se encontro documento", "error");
          setLoaderProg(false);
        }
      } else {
        if (data == "limitExe") {
          showToast("El servicio demoro mas de lo normal", "error");
          setLoaderProg(false);
          setReload(true);
        } else if (data != "abortUs") {
          showToast("Error en el servidor", "error");
          setLoaderProg(false);
        }
      }
    }
  };

  const getCapacitations = async () => {
    // descargar capacitaciones
    setLoaderProg(true);
    setReload(false);
    let infoLog = await AsyncStorage.getItem("logged");
    infoLog = JSON.parse(infoLog);
    const codEmp = infoLog.codEmp;

    const info = `NitCliente=${codEmp}`;
    const path = "usuario/getCapacitacion.php";

    const respApi = await fetchPost(path, info);

    const { status, data } = respApi;
    if (status) {
      if (data.Correcto === 1) {
        dowArchivo(data);
      } else if (data.trim() == "VACIO") {
        showToast("El documento no existe", "error");
        setLoaderProg(false);
      } else {
        showToast("Error en el servidor", "error");
        setLoaderProg(false);
      }
    } else {
      if (data == "limitExe") {
        showToast("El servicio demoro mas de lo normal", "error");
        setLoaderProg(false);
        setReload(true);
      } else if (data != "abortUs") {
        showToast("Error en el servidor", "error");
        setLoaderProg(false);
      }
    }
  };

  const getPayrollFlyer = async (val) => {
    // descargar volante nomina
    setModal(false);
    setLoaderProg(true);
    setReload(false);
    const path =
      showForm === "generalPayroll"
        ? "usuario/getVolanteNominaGeneral.php"
        : "usuario/getVolanteNomina.php";
    setShowForm("");
    let infoLog = await AsyncStorage.getItem("logged");
    infoLog = JSON.parse(infoLog);
    const empSel = infoLog.empSel.trim();
    const codEmp = infoLog.codEmp.trim();
    const month = parseInt(val.month) + 1;
    const info =
      infoLog.type === "employee"
        ? // es 1
          `empresaId=${empSel}&identificacionId=${codEmp}&anho=${val.year}&mes=${month}`
        : // es 2
          `Empresa=${empSel}&NitCliente=${codEmp}&Anho=${val.year}&Mes=${month}`;

    const respApi = await fetchPost(path, info);
    const { status, data } = respApi;
    if (status) {
      if (data.Correcto === 1) {
        dowArchivo(data);
      } else {
        showToast("Error en el servidor", "error");
        setLoaderProg(false);
      }
    } else {
      if (data == "limitExe") {
        showToast("El servicio demoro mas de lo normal", "error");
        setLoaderProg(false);
        setReload(true);
      } else if (data != "abortUs") {
        showToast("Error en el servidor", "error");
        setLoaderProg(false);
      }
    }
  };

  const getModalHumanAndAusen = async (val) => {
    // descargar Indicador de Gestión humana
    // descargar Ausentismo
    setModal(false);
    setLoaderProg(true);
    setReload(false);
    let infoLog = await AsyncStorage.getItem("logged");
    infoLog = JSON.parse(infoLog);
    const empSel = infoLog.empSel;
    const codEmp = infoLog.codEmp;
    const fecIni = val.startDate;
    const fecFin = val.endDate;

    const info = `FechaInicial=${fecIni}&FechaFinal=${fecFin}&
    Empresa=${empSel}&NitCliente=${codEmp}`;
    const path =
      showForm == "humanResourcesIndicator"
        ? "usuario/getIGH.php"
        : "usuario/getAusentismo.php";

    const respApi = await fetchPost(path, info);
    setShowForm("");

    const { status, data } = respApi;
    if (status) {
      const data = respApi.data;
      if (data.Correcto === 1) {
        dowArchivo(data);
      } else {
        showToast("Error en el servidor", "error");
        setLoaderProg(false);
      }
    } else {
      if (data == "limitExe") {
        showToast("El servicio demoro mas de lo normal", "error");
        setLoaderProg(false);
        setReload(true);
      } else if (data != "abortUs") {
        showToast("Error en el servidor", "error");
        setLoaderProg(false);
      }
    }
  };

  const dowArchivo = async (data, next = "") => {
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

      setModal(false);
      setNameUtiView(respIOS);
      archDes = respIOS.status;
    }
    if (!next || next == "") {
      if (archDes) {
        showToast("Listo", "success");
        setLoaderProg(false);
        setModal(false);
      } else {
        showToast("Error al generar el archivo", "error");
        setLoaderProg(false);
        setModal(false);
      }
    }
  };

  useEffect(() => {
    if (!modal) {
      setShowForm("");
    }
  }, [modal]);

  useEffect(() => {
    const idSel = showForm;
    if (idSel != "") {
      switch (idSel) {
        case "laboralCertificate":
          setShowForm("");
          getCerLaboral();
          break;
        case "laboralCertificate2":
          setShowForm("");
          getIngresoRete();
          break;
        case "laboralCertificate3":
          setShowForm("");
          getHojaVidaLab();
          break;
        case "capacitations":
          setShowForm("");
          getCapacitations();
          break;
        // modales
        case "payrollFlyer":
          setModal(true);
          break;
        case "generalPayroll":
          setModal(true);
          break;
        case "humanResourcesIndicator":
          setModal(true);
          break;
        case "ausentism":
          setModal(true);
          break;
        case "rincapacidad":
          Linking.openURL("https://forms.office.com/r/hdJnqUvTZ0");
          setShowForm("");
          break;
        case "adatos":
          Linking.openURL("https://forms.office.com/r/VS0VGLmKwk");
          setShowForm("");
          break;
        case "hvida":
          navigation.navigate("ResumeView");
          setShowForm("");
          break;

        default:
          break;
      }
    }
  }, [showForm]);

  return (
    <View style={styles.scrollStyle}>
      <View>
        <View style={styles.imageSvg}>{image}</View>
        <Text style={styles.title(pixelDensity <= 1 ? 12 : 15)}>{title}</Text>
        <Text style={styles.description}>{desc}</Text>
        <Pressable onPress={() => setShowForm(id)}>
          <View style={styles.downloadButton}>
            <Text style={{ color: colors.light, fontFamily: "Volks-Bold" }}>
              {id == "rincapacidad" || id == "adatos"
                ? "Acceder"
                : id == "hvida"
                ? "Buscar"
                : reload
                ? "Reintentar"
                : "Descargar"}
            </Text>
          </View>
        </Pressable>
      </View>
      {modal && !showLoader && (
        <Modal animationType="slide" visible={modal} transparent={true}>
          {multHojasVida ? (
            <View style={styles.modalContainer}>
              <MultipleDownloads
                closeModal={() => {
                  setMultHojasVida(null);
                  setModal(false);
                }}
                listDow={multHojasVida}
                infoEmit={(e) => servicesDescHojaVida(e)}
              />
            </View>
          ) : showForm === "payrollFlyer" || showForm === "generalPayroll" ? (
            <View style={styles.modalContainer}>
              <FormBillsModal
                closeModal={() => {
                  setModal(false);
                  setShowForm("");
                }}
                onConfirm={getPayrollFlyer}
              />
            </View>
          ) : (
            <View style={styles.modalContainer}>
              {/* <View style={styles.modalForm}> */}
              <FormInicFin
                closeModal={() => {
                  setModal(false);
                  setShowForm("");
                }}
                onConfirm={getModalHumanAndAusen}
              />
              {/* </View> */}
            </View>
          )}
        </Modal>
      )}
    </View>
  );
};

export default DownloadableCard;

const styles = StyleSheet.create({
  scrollStyle: {
    marginRight: 12,
    width: 145,
    backgroundColor: colors.white,
    borderRadius: 17,
    paddingHorizontal: 10,
    paddingVertical: 18,
    alignItems: "flex-start",
    flexDirection: "column",
  },
  certificadoImage: {
    marginBottom: 10,
    height: 80,
    width: 80,
  },
  imageSvg: {
    marginBottom: 15,
  },
  title: (tmn) => ({
    ...getFontStyles(tmn, 0.9, 1.1),
    fontFamily: "Poppins-Bold",
    marginBottom: 5,
  }),
  description: {
    fontFamily: "Volks-Serial-Light",
    color: colors.descriptionColors,
    ...getFontStyles(12, 0.9, 1.2),
    flex: 1,
  },
  downloadButton: {
    backgroundColor: colors.buttonsColor,
    fontFamily: "Volks-Bold",
    height: 41,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    marginTop: 0,
    padding: 0,
    flex: 0,
  },
  generalView: {
    height: heightPercentageToPx(100),
    width: widthPercentageToPx(100),
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateY: 50 }],
  },
});
