import {
  Alert,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import FormInput from "./FormInput";
import GLButton from "../../common/buttons/GLButton";
import {
  colors,
  getFontStyles,
  heightPercentageToPx,
  widthPercentageToPx,
} from "../../../utils";
import FormuBussines from "../../LoginScreen/FormBussinessEntry/FormBussinesEntry";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Toast from "react-native-toast-message";

import { fetchPost, reduceImageQuality } from "../../../utils/functions";

const UserForm = ({
  userData,
  navigation,
  handleChange,
  handleUpdateUser,
  handleImgUser,
}) => {
  const [nomImg, setNomImg] = useState("Seleccione la foto");
  const estadoCiv = [
    [
      { label: "DESCONOCIDO", value: "0" },
      { label: "SOLTERO", value: "1" },
      { label: "CASADO", value: "2" },
      { label: "VIUDO", value: "3" },
      { label: "SEPARADO", value: "4" },
      { label: "UNION LIBRE", value: "5" },
      { label: "RELIGIOSO", value: "6" },
      { label: "OTRO", value: "7" },
    ],
  ];

  const showToast = (smg, type) => {
    Toast.show({
      type: type, //"success", error
      text1: smg,
      position: "bottom",
      visibilityTime: 2000,
    });
  };

  const closeApp = async () => {
    try {
      // borrar todos los datos del almacenamiento local
      await AsyncStorage.clear();

      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const reloadPhoto = (b64All, mime, b64) => {
    updateFoto(b64All, mime, b64);
  };

  const updateFoto = async (b64All, mime, b64) => {
    let infoLog = await AsyncStorage.getItem("logged");
    let infoPho = await AsyncStorage.getItem("photo");
    infoLog = JSON.parse(infoLog);
    infoPho = JSON.parse(infoPho);
    const { codEmp, empSel } = infoLog;

    const info = `CodEmpleado=${codEmp}&Empresa=${empSel}&filename=${nomImg}&fileBase64=${b64All}`;
    const path = "usuario/updatePhotoPer.php";
    const respApi = await fetchPost(path, info, true);
    const { data, status } = respApi;
    console.log("respApi", respApi);
    if (!status) {
      if (data == "limitExe") {
        reloadPhoto(b64All, mime, b64);
      } else if (data != "abortUs") {
        showToast("Error al actualizar foto", "error");
      }
      return;
    }
    if (data.Correcto == 1) {
      const imgRed = `data:${mime}:base64,${b64}`;
      const reducedImage = await reduceImageQuality(imgRed);
      const stringifiedImage = JSON.stringify(reducedImage);
      await AsyncStorage.setItem("photo", stringifiedImage);
      showToast("Foto actualizada correctamente", "success");
      handleImgUser();
    } else {
      showToast("Error al actualizar foto", "error");
    }
  };

  const openAppSettings = () => {
    Linking.openSettings();
  };

  const selectPhoto = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permiso denegado",
          "Se requiere permiso para acceder la biblioteca multimedia y asi poder seleccionar la imagen",
          [
            {
              text: "Aceptar",
              onPress: () => console.log("Botón Aceptar presionado"),
            },
            { text: "Ir a Configuración", onPress: openAppSettings },
          ]
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        base64: true,
      });

      if (!result.canceled) {
        const localUri = result.assets[0].uri;
        const filename = localUri.split("/").pop();
        const match = /\.(\w+)$/.exec(filename);
        const extension = match ? match[1] : "";
        const fullName = `${filename}`;
        const mimeType = `image/${extension}`;

        const base64Image = await FileSystem.readAsStringAsync(localUri, {
          encoding: "base64",
        });
        setNomImg(fullName);
        const prefixedBase64Image = `data:${mimeType};base64,${base64Image}`;

        updateFoto(prefixedBase64Image, mimeType, base64Image);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <View style={styles.formContainer}>
      <FormInput
        type="numeric"
        name="codEmp"
        label={"Identificación"}
        value={userData.codEmp}
        onChange={handleChange}
        disabled={true}
      />
      <FormInput
        name={userData.Direccion !== undefined ? "Direccion" : "dir_res"}
        label={"Dirección"}
        value={userData.Direccion ?? userData.dir_res}
        onChange={handleChange}
        disabled={false}
      />
      <FormInput
        name={userData.Correo !== undefined ? "Correo" : "e_mail"}
        type="email-address"
        label={"Correo electrónico"}
        value={userData.Correo ?? userData.e_mail}
        onChange={handleChange}
        disabled={false}
      />
      <FormInput
        type="phone-pad"
        name={userData.Telefono !== undefined ? "Telefono" : "tel_res"}
        label={"Teléfono"}
        value={userData.Telefono ?? userData.tel_res}
        onChange={handleChange}
        disabled={false}
      />
      {userData.type === "employee" && (
        <>
          <FormInput
            type="numeric"
            name="tel_cel"
            label={"Celular"}
            value={userData.tel_cel}
            onChange={handleChange}
            disabled={false}
          />
          <FormInput
            name="empSel"
            label={"Empresa"}
            value={userData.empSel}
            onChange={handleChange}
            disabled={true}
          />
          <View style={styles.formInputContainer}>
            <Text style={styles.label}>Estado Civil</Text>
            <FormuBussines
              title={userData.Est_Civ.trim()}
              list={estadoCiv[0]}
              onOptionSel={(e) => handleChange("Id_Est_Civ", e)}
            />
          </View>
          <View style={styles.formInputContainer}>
            <Text style={styles.foto}>Foto</Text>
            <Pressable
              style={styles.containerFoto}
              onPress={() => selectPhoto()}
            >
              <Text>{nomImg}</Text>
            </Pressable>
          </View>
        </>
      )}
      <GLButton
        type={"default"}
        placeholder="Actualizar"
        width={widthPercentageToPx(70)}
        onPressAction={handleUpdateUser}
      />
      <GLButton
        type={"second"}
        placeholder="Cancelar"
        width={widthPercentageToPx(70)}
        onPressAction={() => null}
      />
      <GLButton
        type={"default"}
        placeholder="Cerrar Sesión"
        width={widthPercentageToPx(70)}
        onPressAction={closeApp}
      />
    </View>
  );
};

export default UserForm;

const styles = StyleSheet.create({
  formContainer: {
    marginVertical: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: heightPercentageToPx(15),
  },
  label: {
    fontFamily: "Poppins-Regular",
    // marginLeft: 10,
    paddingHorizontal: 20,
    ...getFontStyles(14, 0.5, 0.9),
  },
  formInputContainer: {
    width: widthPercentageToPx(70),
    marginBottom: 12,
  },
  foto: {
    fontSize: 16,
    fontFamily: "Volks-Serial-Medium",
    color: colors.placeholderColor,
  },
  containerFoto: {
    backgroundColor: colors.inputBackground,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    height: 50,
    // marginTop: 20,
  },
});
