import React, { useState } from "react";
import {
  Keyboard,
  PixelRatio,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  colors,
  heightPercentageToPx,
  listAsuntoPQR,
  widthPercentageToPx,
  getFontStyles,
} from "../../../utils";
import GLButton from "../../common/buttons/GLButton";
import FormTitle from "../../common/form/FormTitle";
import Toast from "react-native-toast-message";
import LoaderItemSwitch from "../../common/loaders/LoaderItemSwitch";
import { useFocusEffect } from "@react-navigation/native";
import FormuBussines from "../../LoginScreen/FormBussinessEntry/FormBussinesEntry";

const pixelDensity = parseInt(PixelRatio.get());
const Form = ({ closeModal, onConfirm }) => {
  const [loader, setLoader] = useState(false);
  const [infoForm, setInfoForm] = useState({
    asunto: "",
    description: "",
  });

  const showToast = (smg, type) => {
    Toast.show({
      type: type, //"success", error
      text1: smg,
      position: "bottom",
      visibilityTime: 2000,
    });
  };

  const handlePress = () => {
    // cerrar el teclado
    Keyboard.dismiss();
  };

  const validarInfo = () => {
    if (!loader) {
      if (infoForm.asunto == "" || infoForm.description == "") {
        showToast("Seleccione todos los campos", "error");
      } else {
        if (infoForm.description.length > 1000) {
          showToast("Solo es permitido 1000 caracteres", "error");
          return;
        }
        setLoader(true);
        onConfirm(infoForm);
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setLoader(false);
      };
    }, [])
  );

  return (
    <View style={styles.modalForm}>
      <Pressable onPress={closeModal}>
        <View style={styles.goBackButton}>
          <Feather name="x" size={24} color={colors.purpleIcons} />
        </View>
      </Pressable>

      <Pressable onPress={handlePress}>
        <FormTitle
          title={"Nueva PQR"}
          description={"Escribe aquí tu queja o reclamo"}
        />

        <View style={styles.inputContainer}>
          <FormuBussines
            title="Selecciona el asunto"
            list={listAsuntoPQR}
            onOptionSel={(asu) => setInfoForm({ ...infoForm, asunto: asu })}
          />
          <TextInput
            style={styles.descriptionContainer}
            placeholder="Cuéntanos más..."
            multiline={true}
            value={infoForm.description}
            onChangeText={(des) =>
              setInfoForm({ ...infoForm, description: des })
            }
          ></TextInput>
          <Text style={styles.cantDesc}>
            {infoForm.description.length + " de 1000"}
          </Text>
          <GLButton
            onPressAction={() => validarInfo()}
            type="default"
            placeholder={!loader ? "Enviar" : <LoaderItemSwitch />}
            width={widthPercentageToPx(70)}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  modalForm: {
    top: widthPercentageToPx(pixelDensity <= 1 ? 18 : 14),
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    // transform: [{ translateY: 50 }],
    width: widthPercentageToPx(90),
    height: heightPercentageToPx(pixelDensity <= 1 ? 70 : 78),
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
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: pixelDensity <= 1 ? 5 : 10,
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
  cantDesc: {
    fontFamily: "Volks-Serial-Light",
    color: colors.descriptionColors,
    alignSelf: "flex-end",
    paddingRight: 30,
    marginBottom: 5,
    marginTop: 5,
    ...getFontStyles(17, 1, 1.2),
  },
});
