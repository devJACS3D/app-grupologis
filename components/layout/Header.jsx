import React, { useContext, useEffect, useRef, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, View, Pressable, Text, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  colors,
  getFontStyles,
  heightPercentageToPx,
  images,
  widthPercentageToPx,
} from "../../utils";
import authContext from "../../context/auth/authContext";
import NotificationForm from "../HomeScreen/notificationForm/FormNotification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import imgEmp from "../../assets/images/users/user-empresa.png";
import imgFem from "../../assets/images/users/user-female.png";
import imgMal from "../../assets/images/users/user-male.png";
import { get } from "../../utils/axiosInstance";

const Header = ({}) => {
  const { userData } = useContext(authContext);
  const [dataUs, setDataUs] = useState({ userData });
  const [modal, setModal] = useState(false);
  const [number, setNumber] = useState(0);
  const navigation = useNavigation();

  const getUserDataFromAsyncStorage = async () => {
    try {
      const userDataJSON = await AsyncStorage.getItem("logged");
      if (userDataJSON !== null) {
        let photo = await AsyncStorage.getItem("photo");
        photo = JSON.parse(photo);
        const userData = JSON.parse(userDataJSON);
        const dataUss = { ...userData, foto: photo };
        setDataUs(dataUss);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getNotification = async () => {
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
      }
      setNumber(cantNoLeid);
    }
  };

  // const handleProfileChange = async () => {
  //   try {
  //     const userDataJSON = await AsyncStorage.getItem("logged");
  //     if (userDataJSON !== null) {
  //       const userData = JSON.parse(userDataJSON);
  //       setDataUs(userData);

  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    getUserDataFromAsyncStorage();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", (e) => {
      // La URL ha cambiado
      getNotification();
      getUserDataFromAsyncStorage();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.notbar}>
      <View style={styles.notbarInfoUser}>
        <View style={styles.userImgContainer}>
          {typeof dataUs.foto ? (
            <View style={styles.userImgContainer}>
              <Image
                style={styles.userImg}
                source={{
                  uri: dataUs.foto,
                }}
              />
              <View style={styles.onlineIndicator} />
            </View>
          ) : (
            <View style={styles.userImgContainer}>
              {dataUs.type == "business" ? (
                <Image style={styles.userImg} source={imgEmp} />
              ) : dataUs.sexo == "M" ? (
                <Image style={styles.userImg} source={imgFem} />
              ) : (
                <Image style={styles.userImg} source={imgMal} />
              )}
              <View style={styles.onlineIndicator} />
            </View>
          )}
        </View>
        <View style={styles.infoUser}>
          <Text style={styles.hello}>Hola,</Text>
          <Text style={styles.nameUser}>
            {dataUs.Nombre != undefined
              ? dataUs.Nombre.length > 20
                ? dataUs.Nombre.slice(0, 20) + "..."
                : dataUs.Nombre
              : dataUs.nom1_emp + " " + dataUs.ap1_emp}
          </Text>
        </View>
      </View>
      <View>
        <Pressable onPress={() => setModal(!modal)}>
          <View style={styles.containerNot}>
            <Ionicons name="md-notifications-outline" size={30} color="white" />
            {number > 0 && (
              <View style={styles.notification}>
                <Text style={styles.notificationText}>{number}</Text>
              </View>
            )}
          </View>
        </Pressable>
      </View>
      {modal && (
        <Modal animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <NotificationForm closeM={() => setModal(false)} />
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Header;

// ...Platform.select({
//       ios: {
//         backgroundColor: "red",
//       },
//       android: {
//         backgroundColor: "blue",
//       },
//     }),

const styles = StyleSheet.create({
  notbar: {
    width: widthPercentageToPx(90),
    height: heightPercentageToPx(9),
    marginTop: 60,
    marginBottom: 10,
    overflow: "visible",
    backgroundColor: colors.mainBlue,
    borderRadius: 9,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },

  notbarInfoUser: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  hello: {
    color: colors.light,
    fontFamily: "Poppins-Regular",
    ...getFontStyles(14, 0.5, 0.9),
  },

  nameUser: {
    color: colors.light,
    fontFamily: "Poppins-SemiBold",
    ...getFontStyles(15, 0.5, 0.7),
  },

  infoUser: {
    marginLeft: 10,
  },

  userImg: {
    height: heightPercentageToPx(10),
    width: widthPercentageToPx(20),
    height: 45,
    width: 45,
    borderRadius: 50,
    backgroundColor: colors.purpleIcons,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: -3,
    right: -3,
    height: 16,
    width: 16,
    borderRadius: 50,
    borderWidth: 2.5,
    borderColor: colors.mainBlue,
    backgroundColor: colors.green,
    zIndex: 9,
  },
  modalContainer: {
    alignItems: "center",
    top: heightPercentageToPx(10),
    // bottom: 0,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    transform: [{ translateY: 55 }],
    width: widthPercentageToPx(90.5),
    height: heightPercentageToPx(86),
    left: 18,
  },
  containerNot: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  notification: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "red",
    borderRadius: 50,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
