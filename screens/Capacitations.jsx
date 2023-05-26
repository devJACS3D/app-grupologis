import { RefreshControl, ScrollView, StyleSheet, Text } from "react-native";
import Layout from "../components/layout/Layout";
import React, { useState } from "react";
import CardEinfo from "../components/HomeScreen/homeView/CardEinfo";
import LoaderItemSwitch from "../components/common/loaders/LoaderItemSwitch";
import LoaderItemSwitchDark from "../components/common/loaders/LoaderItemSwitchDark";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchPost } from "../utils/functions";
import CapacitationsList from "../components/HomeScreen/capacitationsView/CapacitationsList";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { heightPercentageToPx } from "../utils";
import { View } from "react-native-animatable";

const Capacitations = (props) => {
  const { navigation } = props;
  const [refreshing, setRefreshing] = useState(false);
  const [loader, setLoader] = useState(false);
  const [allListCapac, setAllListCapac] = useState([]);
  const [listCapac, setListCapac] = useState([]);

  const showToast = (smg, type) => {
    Toast.show({
      type: type, //"success", error
      text1: smg,
      position: "bottom",
      visibilityTime: 2000,
    });
  };

  const comparar = (a, b) => {
    const partesFeca = a.Fecha.split("/");
    const partesFecb = b.Fecha.split("/");
    const fechaA = new Date(partesFeca[2], partesFeca[1] - 1, partesFeca[0]);
    const fechaB = new Date(partesFecb[2], partesFecb[1] - 1, partesFecb[0]);
    return fechaB - fechaA;
  };

  const getCapacitations = async () => {
    setLoader(true);
    let infoLog = await AsyncStorage.getItem("logged");
    infoLog = JSON.parse(infoLog);
    const empSel = infoLog.empSel;
    const codEmp = infoLog.codEmp.trim();

    const info = `NitCliente=${codEmp}`;
    const path = "usuario/getCapacitacionesEmp.php";

    const respApi = await fetchPost(path, info);
    const { status, data } = respApi;
    if (status) {
      if (data.Correcto == 1 && data.Programa.length > 0) {
        setLoader(false);
        data.Programa.sort(comparar);
        setAllListCapac(data.Programa);
        setListCapac(data.Programa);
      } else {
        setLoader(false);
        setAllListCapac([]);
        setListCapac([]);
      }
    } else {
      setLoader(false);
      showToast("Error en el servidor", "error");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getCapacitations();
      return () => {};
    }, [])
  );

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getCapacitations();
    setRefreshing(false);
  }, []);

  const handleInputChange = (noRad) => {
    let filteredList = [];
    for (let i = 0; i < allListCapac.length; i++) {
      const lista = allListCapac[i];
      if (lista.Documento.includes(noRad)) {
        filteredList.push(lista);
      }
    }
    filteredList.sort(comparar);
    setListCapac(filteredList);
  };
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
          title={"Capacitaciones"}
          buttonText="Buscar"
          inputText="Ingresa el radicado"
          showButton={false}
          showInput={true}
          handleGoBack={() => navigation.navigate("EmployeeManagement")}
          onInputChange={handleInputChange}
        />

        {!loader ? (
          <CapacitationsList listado={listCapac} />
        ) : (
          <View style={styles.loaderContainer}>
            <LoaderItemSwitchDark />
          </View>
        )}
      </ScrollView>
    </Layout>
  );
};

export default Capacitations;

const styles = StyleSheet.create({
  loaderContainer: {
    marginTop: heightPercentageToPx(5),
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
