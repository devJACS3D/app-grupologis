import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import {
  colors,
  getFontStyles,
  heightPercentageToPx,
  widthPercentageToPx,
} from "../../../utils";
import NotCard from "./NotificationCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "../../../utils/axiosInstance";
import Toast from "react-native-toast-message";
import { useFocusEffect } from "@react-navigation/native";
import LoaderItemSwitch from "../../common/loaders/LoaderItemSwitch";
import LoaderItemSwitchDark from "../../common/loaders/LoaderItemSwitchDark";
// import pathImg from "../../../assets/images/components/notifications/";

const NotificationForm = ({ closeM }) => {
  const [notificationInfo, setNotificationInfo] = useState([]);
  const [loader, setLoader] = useState(false);

  const showToast = (smg, type) => {
    Toast.show({
      type: type, //"success", error
      text1: smg,
      position: "bottom",
      visibilityTime: 2000,
    });
  };

  const getNotification = async () => {
    setLoader(true);
    let infoLog = await AsyncStorage.getItem("logged");
    infoLog = JSON.parse(infoLog);
    const empSel = infoLog.empSel;
    const codEmp = infoLog.codEmp;
    const type = infoLog.type === "employee" ? "1" : "2";

    let path = "usuario/getNotificaciones.php";
    path += `?empresa=${empSel}&tipUser=${type}`;

    const respApi = await get(path);

    const { status, data } = respApi;
    if (status) {
      let cantNoLeid = 0;
      if (data.length > 0) {
        data.forEach((noti) => {
          if (noti.estado == 0) {
            cantNoLeid += 1;
          }
        });
        setNotificationInfo(data);
        setLoader(false);
      } else {
        setNotificationInfo([]);
        setLoader(false);
      }
    } else {
      showToast("Ocurrio un error en el servidor", "error");
      setLoader(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getNotification();
      return () => {};
    }, [])
  );

  return (
    <View styles={styles.modalnForm}>
      <Pressable onPress={closeM}>
        <View style={styles.goBackButton}>
          <Feather name="x" size={24} color={colors.purpleIcons} />
        </View>
      </Pressable>
      <View style={styles.titlesContainer}>
        <Text style={styles.subtitle}>Notificaciones</Text>
      </View>
      <View style={styles.itemsContai}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View styles={styles.inputContainer}>
            {!loader ? (
              notificationInfo.length > 0 ? (
                notificationInfo.map((e) => (
                  <NotCard
                    key={e.id}
                    descNot={e.descripcion}
                    titleNot={e.titulo}
                    dateNot={e.fecha}
                    id={e.id}
                    imageNot={e.icono}
                    type={e.tipo}
                    close={closeM}
                  />
                ))
              ) : (
                <Text>Sin notificaciones</Text>
              )
            ) : (
              <View styles={styles.loaderItem}>
                <LoaderItemSwitchDark />
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default NotificationForm;

const styles = StyleSheet.create({
  modalnForm: {
    top: 45,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    transform: [{ translateY: 52 }],
    width: widthPercentageToPx(90),
    height: heightPercentageToPx(50),
    // marginBottom: 30,
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
    marginLeft: 10,
  },
  titlesContainer: {
    paddingHorizontal: 30,
    // marginBottom: 10,
  },
  welcomeText: {
    fontFamily: "Poppins-Bold",
    marginBottom: 2,
    marginTop: 2,
    color: colors.mainBlue,
    ...getFontStyles(30),
  },
  subtitle: {
    ...getFontStyles(17),
    marginBottom: 2,
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

  inputContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
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
  sendButton: {
    backgroundColor: colors.buttonsColor,
    fontFamily: "Poppins-Regular",
    width: widthPercentageToPx(70),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    height: 50,
    marginTop: 15,
  },
  loaderItem: {
    width: widthPercentageToPx(100),
  },
  itemsContai: {
    width: widthPercentageToPx(90),
    height: heightPercentageToPx(67),
  },
});
