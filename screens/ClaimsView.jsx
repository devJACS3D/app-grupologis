import {
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { heightPercentageToPx, images } from "../utils";

import React, { useContext, useEffect, useState } from "react";
import ConfirmActivity from "../components/common/ConfirmActivity";
import ClaimList from "../components/HomeScreen/claimsView/ClaimList";
import Form from "../components/HomeScreen/claimsView/Form";
import MainCardInfo from "../components/HomeScreen/homeView/MainCardInfo";
import ViewTitleCard from "../components/HomeScreen/homeView/ViewTitleCard";
import Layout from "../components/layout/Layout.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchPost } from "../utils/functions";
import ReplyMessage from "../components/common/messages/ReplyMessage";
import { useFocusEffect } from "@react-navigation/native";
import LoaderProgContext from "../context/loader/LoaderProgContext";
import Toast from "react-native-toast-message";
import LoaderItemSwitchDark from "../components/common/loaders/LoaderItemSwitchDark";
import { cancelarSolicitudesApi } from "../utils/axiosInstance";

const Claim = (props) => {
  const [modal, setModal] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [claimsList, setClaimsList] = useState([]);
  const [loader, setLoader] = useState(false);
  const { setLoaderProg } = useContext(LoaderProgContext);
  const [refreshing, setRefreshing] = useState(false);

  const showToast = (smg, type) => {
    Toast.show({
      type: type, //"success", error
      text1: smg,
      position: "bottom",
      visibilityTime: 2000,
    });
  };

  const comparar = (a, b) => {
    if (parseInt(a.Documento) > parseInt(b.Documento)) {
      return -1;
    }
    if (a.Documento < b.Documento) {
      return 1;
    }
    return 0;
  };

  const getQuejas = async () => {
    setLoader(true);
    let infoLog = await AsyncStorage.getItem("logged");
    infoLog = JSON.parse(infoLog);
    const empSel = infoLog.empSel.toUpperCase();
    const codEmp = infoLog.codEmp;

    const info = `Empresa=${empSel}&CodEmpleado=${codEmp}`;

    const path = "usuario/getListadoQuejas.php";
    const respApi = await fetchPost(path, info);
    const { status, data } = respApi;
    if (status) {
      if (data.Correcto === 1) {
        if (data.Programa != undefined && data.Programa.length > 0) {
          const lis = data.Programa.sort(comparar);
          setClaimsList(lis);
          setLoader(false);
        } else {
          setClaimsList([]);
          setLoader(false);
        }
      } else {
        showToast("error en el servidor", "error");
        setLoader(false);
      }
    } else {
      if (data == "limitExe") {
        setLoader(false);
        showToast("El servicio demoro mas de lo normal", "error");
      } else if (data != "abortUs") {
        setLoader(false);
        showToast("ocurrio un error en el sistema", "error");
      }
    }
  };

  const sendMailQueja = async (idQueja, empl, tipo) => {
    const info = `idQuejas=${idQueja}&tipousuarioId=${tipo}&IdUsuario=${empl}`;
    const path = "usuario/SendMailQuejas.php";
    const respApi = await fetchPost(path, info, 30000);
    const { status, data } = respApi;
    if (status) {
      if (data === "TRUE") {
        setShowForm(false);
        setTimeout(() => {
          setModal(false);
          setLoaderProg(false);
          getQuejas();
        }, 3000);
      } else {
        setModal(false);

        showToast("Error al enviar el correo electronico", "error");
        setLoaderProg(false);
      }
    } else {
      if (data == "limitExe") {
        setModal(false);
        setLoader(false);
        showToast("El servicio demoro mas de lo normal", "error");
      } else if (data != "abortUs") {
        setModal(false);
        setLoader(false);
        showToast("Error al enviar el correo electronico", "error");
      }
    }
  };

  const closeAfterConfirm = async (infoPqr) => {
    let infoLog = await AsyncStorage.getItem("logged");
    infoLog = JSON.parse(infoLog);
    const empSel = infoLog.empSel;
    const codEmp = infoLog.codEmp;
    const typeCli = infoLog.type === "employee" ? 1 : 2;
    const info = `Asunto=${infoPqr.asunto}&Detalle=${infoPqr.description}&Empresa=${empSel}&IdUsuario=${codEmp}&tipousuarioId=${typeCli}`;
    const path = "usuario/getQuejas.php";
    const respApi = await fetchPost(path, info);
    const { status, data } = respApi;
    if (status) {
      if (data.Correcto === 1) {
        if (data.Msg === "Usuario no Encontrado") {
          setModal(false);

          showToast("El usuario no existe", "error");
          setLoaderProg(false);
        } else {
          sendMailQueja(data.Id, codEmp, typeCli);
        }
      } else {
        setModal(false);

        showToast("Error en el servidor", "error");
        setLoaderProg(false);
      }
    } else {
      if (data == "limitExe") {
        setModal(false);
        setLoaderProg(false);
        showToast("El servicio demoro mas de lo normal", "error");
      } else if (data != "abortUs") {
        setModal(false);
        setLoaderProg(false);
        showToast("Error en el servidor", "error");
      }
    }
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    await getQuejas();
    setRefreshing(false);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getQuejas();
      return () => {
        cancelarSolicitudesApi();
        setLoaderProg(false);
      };
    }, [])
  );

  return (
    <Layout props={{ ...props }}>
      <ViewTitleCard
        title={"PQR"}
        buttonText="  Nueva"
        onPressAction={() => setModal(!modal)}
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <MainCardInfo
          firstTitle={"PQR"}
          secondTitle=""
          description={
            "Podrás conocer el estado o trazabilidad de tus novedades"
          }
          image={images.bannerFour}
        />
        {!loader ? (
          claimsList.length > 0 ? (
            <ClaimList claimsList={claimsList} />
          ) : (
            <ReplyMessage message="SinRes" />
          )
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
              <Form
                closeModal={() => setModal(false)}
                onConfirm={closeAfterConfirm}
              />
            ) : (
              <ConfirmActivity
                closeModal={() => {
                  setModal(false);
                  setShowForm(true);
                }}
                title="Su queja o reclamo ha sido enviada"
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

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateY: 50 }],
  },
  loaderContainer: {
    marginTop: heightPercentageToPx(15),
    // display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Claim;
