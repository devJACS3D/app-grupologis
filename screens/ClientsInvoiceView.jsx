import React, { useContext, useEffect, useState } from "react";
import { Modal, ScrollView, StyleSheet, View } from "react-native";
import BillsList from "../components/HomeScreen/billView/BillsList";
import FormBillsModal from "../components/HomeScreen/billView/FormBillsModal";
import MainCardInfo from "../components/HomeScreen/homeView/MainCardInfo";
import ViewTitleCard from "../components/HomeScreen/homeView/ViewTitleCard";
import Layout from "../components/layout/Layout";
import { heightPercentageToPx, images, widthPercentageToPx } from "../utils";
import { fetchPost } from "../utils/functions";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoaderItemSwitch from "../components/common/loaders/LoaderItemSwitch";
import ReplyMessage from "../components/common/messages/ReplyMessage";
import LoaderProgContext from "../context/loader/LoaderProgContext";
import { useFocusEffect } from "@react-navigation/core";
import { cancelarSolicitudesApi } from "../utils/axiosInstance";

const ClientsInvoiceView = ({ props }) => {
  const [modal, setModal] = useState(false);
  const [allBillsList, setAllBillsList] = useState([null]);
  const { setLoaderProg } = useContext(LoaderProgContext);

  const message = (mess, type) => {
    Toast.show({
      type: type,
      text1: mess,
      position: "bottom",
      visibilityTime: 2000,
    });
  };

  useEffect(() => {
    setAllBillsList([null]);
  }, []);

  const handleSearchBill = async (val) => {
    setModal(false);
    setLoaderProg(true);

    let { month, year } = val;
    month += 1;
    let infoLog = await AsyncStorage.getItem("logged");
    infoLog = JSON.parse(infoLog);
    const empSel = infoLog.empSel;
    const codEmp = infoLog.codEmp;

    const info = `Empresa=${empSel}&NitCliente=${codEmp}&Anho=${year}&Mes=${month}`;
    const path = "usuario/getFacturasClienteEmpresa.php";

    const respApi = await fetchPost(path, info);
    const { status, data } = respApi;
    if (status) {
      if (data != "ERROR") {
        if (typeof data == "object") {
          setAllBillsList(data);
          setLoaderProg(false);
        } else {
          setAllBillsList([]);
          setLoaderProg(false);
        }
      }
    } else {
      if (data == "limitExe") {
        message("El servicio demoro mas de lo normal", "error");
        setLoaderProg(false);
      } else if (data != "abortUs") {
        message("Error del servidor", "error");
        setLoaderProg(false);
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        cancelarSolicitudesApi();
        setLoaderProg(false);
      };
    }, [])
  );

  return (
    <Layout props={{ ...props }}>
      <ViewTitleCard
        title={"Facturas clientes"}
        buttonText="  Buscar"
        onPressAction={() => setModal(!modal)}
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <MainCardInfo
          firstTitle={"Descarga"}
          secondTitle="facturas clientes"
          description={
            "Podrás conocer el estado o trazabilidad de tus novedades"
          }
          image={images.employeeNimage}
        />

        {allBillsList[0] !== null ? (
          <BillsList billsList={allBillsList} />
        ) : (
          <ReplyMessage message="reaBusq" />
        )}
      </ScrollView>
      {modal && (
        <Modal animationType="slide" visible={modal} transparent={true}>
          <View style={styles.modalContainer}>
            <FormBillsModal
              closeModal={() => setModal(false)}
              onConfirm={handleSearchBill}
            />
          </View>
        </Modal>
      )}
    </Layout>
  );
};

export default ClientsInvoiceView;

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
