import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

import { useNavigation } from "@react-navigation/native";
import {
  colors,
  notices,
  getFontStyles,
  heightPercentageToPx,
  widthPercentageToPx,
} from "../../../utils";

import NewsDailyHomeCard from "./newsDailyHomeCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "../../../utils/axiosInstance";
import LoaderItemSwitch from "../../common/loaders/LoaderItemSwitch";
import LoaderItemSwitchDark from "../../common/loaders/LoaderItemSwitchDark";

const newsDailyHome = ({ closeM }) => {
  const navigation = useNavigation();
  const [listNotic, setListNotic] = useState([]);
  const [loaderSwi, setLoaderSwi] = useState(false);
  const urlImg = "https://appgrupologis.com/app/managers/usuario/";

  useEffect(() => {
    getNews();
  }, []);

  const showToast = (smg, type) => {
    Toast.show({
      type: type, //"success", error
      text1: smg,
      position: "bottom",
      visibilityTime: 2000,
    });
  };

  const getNews = async () => {
    setLoaderSwi(true);
    let infoLog = await AsyncStorage.getItem("logged");
    infoLog = JSON.parse(infoLog);
    const empSel = infoLog.empSel;
    const codEmp = infoLog.codEmp;
    const infoType = infoLog.type === "employee" ? 1 : 2;
    let path = "noticia/getNoticiasHabilitadas.php";
    path += `?empresaId=${empSel}&tipousuarioId=${infoType}`;
    const respApi = await get(path);
    const { status, data } = respApi;
    if (status) {
      if (data != "ERROR") {
        data.shift();
        data.splice(data.length - 3, 3);
        setListNotic(data);
        setLoaderSwi(false);
      } else {
        setListNotic([]);
        setLoaderSwi(false);
      }
    } else {
      if (data == "limitExe") {
        showToast("El servicio demoro mas de lo normal", "error");
        setListNotic([]);
        setLoaderSwi(false);
      } else if (data != "abortUs") {
        showToast("Error al obtener noticias", "error");
        setListNotic([]);
        setLoaderSwi(false);
      }
    }
  };

  return (
    <View styles={styles.modalnForm}>
      <View style={styles.titlesContainer}>
        <Text style={styles.subtitle}>Noticias</Text>
      </View>
      <View styles={styles.inputContainer}>
        {!loaderSwi ? (
          listNotic.map((e, ind) => (
            <Pressable
              key={`noticia-${ind}`}
              onPress={() => navigation.navigate("NewsDailyView")}
            >
              <NewsDailyHomeCard
                descNot={e.mensaje}
                titleNot={e.titulo}
                id={`noticia-${ind}`}
                imageNot={urlImg + e.ruta}
              />
            </Pressable>
          ))
        ) : (
          <LoaderItemSwitchDark />
        )}
      </View>
      {!loaderSwi && (
        <Pressable onPress={() => navigation.navigate("NewsDailyView")}>
          <View style={styles.downloadButton}>
            <Text
              style={{ color: colors.buttonsColor, fontFamily: "Volks-Bold" }}
            >
              Ver más
            </Text>
          </View>
        </Pressable>
      )}
    </View>
  );
};

export default newsDailyHome;

const styles = StyleSheet.create({
  modalnForm: {
    top: 45,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  goBackButton: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lightGray,
    borderRadius: 15,
    height: 30,
    width: 30,
  },
  titlesContainer: {
    paddingHorizontal: 30,
  },
  subtitle: {
    ...getFontStyles(17),
    marginBottom: 20,
    marginTop: 20,
    fontFamily: "Poppins-Bold",
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
  downloadButton: {
    borderWidth: 1,
    borderColor: colors.buttonsColor,
    fontFamily: "Volks-Bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 47,
    borderRadius: 7,
    marginTop: 10,
    padding: 0,
    flex: 0,
  },
});
