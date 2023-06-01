import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  RefreshControl,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import CardEinfo from "../components/HomeScreen/homeView/CardEinfo";
import Layout from "../components/layout/Layout";
import {
  colors,
  notices,
  getFontStyles,
  heightPercentageToPx,
  widthPercentageToPx,
} from "../utils";
import Toast from "react-native-toast-message";

import NewsDailyCard from "../components/HomeScreen/newsDaily/newsDailyCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { cancelarSolicitudesApi, get } from "../utils/axiosInstance";
import LoaderItemSwitchDark from "../components/common/loaders/LoaderItemSwitchDark";
import Pagination from "../components/common/pagination/Pagination";
import { useFocusEffect } from "@react-navigation/core";

const NewsDailyView = (props) => {
  const { navigation } = props;
  const [loaderSwi, setLoaderSwi] = useState(false);
  const [listNotic, setListNotic] = useState([]);
  const [pagAct, setPagAct] = useState(1);
  const [cantInfo, setCantInfo] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const urlImg = "https://appgrupologis.com/app/managers/usuario/";

  const showToast = (smg, type) => {
    Toast.show({
      type: type, //"success", error
      text1: smg,
      position: "bottom",
      visibilityTime: 2000,
    });
  };

  useEffect(() => {
    getNews(1);
  }, []);

  const reloadNot = (pag) => {
    getNews(pag);
  };

  const getNews = async (pag) => {
    setLoaderSwi(true);
    let infoLog = await AsyncStorage.getItem("logged");
    infoLog = JSON.parse(infoLog);
    const empSel = infoLog.empSel;
    const codEmp = infoLog.codEmp;
    const infoType = infoLog.type === "employee" ? 1 : 2;
    setPagAct(pag);
    let path = "noticia/getNoticiasHabilitadas.php";
    path += `?empresaId=${empSel}&tipousuarioId=${infoType}`;
    path += pag > 1 ? `&page=${pag}` : "";

    const respApi = await get(path);
    const { status, data } = respApi;
    if (status) {
      if (data != "ERROR") {
        const cant = data.shift();
        setCantInfo(parseInt(cant.cant));
        setListNotic(data);
        setLoaderSwi(false);
      } else {
        setListNotic([]);
        setLoaderSwi(false);
      }
    } else {
      if (data == "limitExe") {
        reloadNot(pag);
      } else if (data != "abortUs") {
        showToast("Error al obtener noticias", "error");
        setListNotic([]);
        setLoaderSwi(false);
      }
    }
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getNews();
    setRefreshing(false);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        cancelarSolicitudesApi();
      };
    }, [])
  );

  return (
    <Layout props={{ ...props }}>
      <CardEinfo
        title={"Noticias"}
        showButton={false}
        showInput={false}
        handleGoBack={() => navigation.navigate("DownloadView")}
      />
      {!loaderSwi ? (
        <ScrollView
          styles={styles.inputContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {listNotic.map((e, i) => (
            <NewsDailyCard
              key={i}
              descNot={e.mensaje}
              titleNot={e.titulo}
              dateIn={e.fhingreso}
              link={e.link}
              id={i}
              imageNot={urlImg + e.ruta}
            />
          ))}
          <Pagination
            styles={styles.pagination}
            pagAct={pagAct}
            cantInfo={cantInfo}
            changeOpt={(pag) => getNews(pag)}
          />
        </ScrollView>
      ) : (
        <LoaderItemSwitchDark />
      )}
    </Layout>
  );
};

export default NewsDailyView;

const styles = StyleSheet.create({
  titlesContainer: {
    paddingHorizontal: 30,
  },
  subtitle: {
    ...getFontStyles(17),
    marginBottom: 20,
    marginTop: 20,
    fontFamily: "Poppins-Bold",
  },
  inputContainer: {
    width: widthPercentageToPx(90),
  },
  welcomeDesc: {
    fontFamily: "Poppins-Regular",
    color: colors.descriptionColors,
    marginBottom: 15,
    marginTop: 15,
    ...getFontStyles(13, 0.5, 0.9),
  },
  titleContainer: {
    backgroundColor: colors.mainBackgroundColor,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: widthPercentageToPx(70),
    fontFamily: "Poppins-Regular",
    height: 50,
    borderRadius: 17,
    padding: 15,
  },
  descriptionContainer: {
    backgroundColor: colors.mainBackgroundColor,
    width: widthPercentageToPx(70),
    fontFamily: "Poppins-Regular",
    height: heightPercentageToPx(20),
    borderRadius: 17,
    padding: 15,
    display: "flex",
    alignItems: "flex-start",
  },
  pagination: {
    marginBottom: 60,
  },
});
