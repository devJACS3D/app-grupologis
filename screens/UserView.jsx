import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import UserForm from "../components/HomeScreen/profileView/UserForm";
import UserInfo from "../components/HomeScreen/profileView/UserInfo";
import Layout from "../components/layout/Layout";
import authContext from "../context/auth/authContext";
import { colors, heightPercentageToPx, widthPercentageToPx } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchPost } from "../utils/functions";
import Toast from "react-native-toast-message";
import LoadFullScreen from "../components/common/loaders/LoadFullScreen";
import { useFocusEffect } from "@react-navigation/native";
import LoaderProgContext from "../context/loader/LoaderProgContext";
import { cancelarSolicitudesApi } from "../utils/axiosInstance";

const UserView = (props) => {
  const { navigation } = props;
  const { userData, updateUser } = useContext(authContext);
  const [dataUs, setDataUs] = useState({ ...userData });
  const [loaderComp, setLoaderComp] = useState(false);
  const { showLoader, setLoaderProg } = useContext(LoaderProgContext);

  const estadoCiv = [
    "DESCONOCIDO",
    "SOLTERO",
    "CASADO",
    "VIUDO",
    "SEPARADO",
    "UNION LIBRE",
    "RELIGIOSO",
    "OTRO",
  ];

  const getUserDataFromAsyncStorage = async () => {
    try {
      const userDataJSON = await AsyncStorage.getItem("logged");
      if (userDataJSON !== null) {
        const userData = JSON.parse(userDataJSON);
        for (let key in userData) {
          if (userData[key] === "null") {
            userData[key] = "";
          }
        }
        setDataUs(userData);
        setLoaderComp(false);
      }
    } catch (error) {
      console.log(error);
      setLoaderComp(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoaderComp(true);
      getUserDataFromAsyncStorage();
      return () => {
        cancelarSolicitudesApi();
        setLoaderProg(false);
      };
    }, [])
  );

  const showToast = (smg, type) => {
    Toast.show({
      type: type, //"success", error
      text1: smg,
      position: "bottom",
      visibilityTime: 2000,
    });
  };

  const handleChangeInput = (field, value) => {
    setDataUs({
      ...dataUs,
      [field]: value,
    });
  };

  const handleUpdateUser = async () => {
    if (!showLoader) {
      setLoaderProg(true);
      let infoLog = await AsyncStorage.getItem("logged");
      infoLog = JSON.parse(infoLog);

      let path;
      let info;
      if (infoLog.type === "employee") {
        // es 1
        if (dataUs.Id_Est_Civ == undefined) {
          dataUs.Id_Est_Civ = estadoCiv
            .indexOf(dataUs.Est_Civ.trim())
            .toString();
        }
        path = "usuario/getLoadEditar.php";
        info = `CodEmpleado=${dataUs.codEmp.trim()}&Direccion=${
          dataUs.dir_res && dataUs.dir_res.trim()
        }&Email=${dataUs.e_mail && dataUs.e_mail.trim()}`;
        info += `&Telefono=${dataUs.tel_res && dataUs.tel_res.trim()}&Celular=${
          dataUs.tel_cel && dataUs.tel_cel.trim()
        }`;
        info += `&EstadoCivil=${
          dataUs.Id_Est_Civ && dataUs.Id_Est_Civ.trim()
        }&Empresa=${dataUs.empSel.trim()}`;
      } else {
        // es 2
        path = "usuario/getLoadEditarClien.php";
        info = `NitCliente=${dataUs.codEmp.trim()}&Direccion=${
          dataUs.Direccion && dataUs.Direccion.trim()
        }`;
        info += `&Email=${dataUs.Correo && dataUs.Correo.trim()}&Telefono=${
          dataUs.Telefono && dataUs.Telefono.trim()
        }`;
      }

      const respApi = await fetchPost(path, info);

      const { status, data } = respApi;
      if (status) {
        if (data == "Perfil actualizado correctamente" || data.Correcto == 1) {
          setLoaderProg(false);
          showToast("Perfil actualizado correctamente", "success");

          await updateUser(dataUs);
          await AsyncStorage.setItem("logged", JSON.stringify(dataUs));
        } else {
          setLoaderProg(false);
          showToast("Ocurrio un error al actualizar", "error");
        }
      } else {
        if (data == "limitExe") {
          setLoaderProg(false);
          showToast("El servicio demoro mas de lo normal", "error");
        } else if (data != "abortUs") {
          setLoaderProg(false);
          showToast("Ocurrio un error en el servidor", "error");
        }
      }
    }
  };

  const handleImgUser = () => {
    getUserDataFromAsyncStorage();
    navigation.navigate("ProfileView");
  };

  return (
    <Layout props={{ ...props }}>
      <ScrollView
        style={styles.userView}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {!loaderComp ? (
          <>
            <UserInfo userData={dataUs} />
            <UserForm
              userData={dataUs}
              navigation={navigation}
              handleChange={handleChangeInput}
              handleUpdateUser={handleUpdateUser}
              handleImgUser={handleImgUser}
            />
          </>
        ) : (
          <View style={styles.infoUserView}>
            <LoadFullScreen />
          </View>
        )}
      </ScrollView>
    </Layout>
  );
};

export default UserView;

const styles = StyleSheet.create({
  userView: {
    height: heightPercentageToPx(100),
    width: widthPercentageToPx(100),
    marginTop: heightPercentageToPx(2),
  },
  infoUserView: {
    height: heightPercentageToPx(70),
  },
});
