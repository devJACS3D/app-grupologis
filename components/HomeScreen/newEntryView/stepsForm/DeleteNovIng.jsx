import { StyleSheet, Text } from "react-native";
import { View } from "react-native-animatable";
import GLButton from "../../../common/buttons/GLButton";
import LoaderItemSwitch from "../../../common/loaders/LoaderItemSwitch";
import { getSer } from "../../../../utils/axiosInstance";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { colors, getFontStyles, widthPercentageToPx } from "../../../../utils";
import RemoveNovIng from "../../../../assets/images/components/infoModal/RemoveNovIng";

const DeleteNovIng = (props) => {
  const { infoDel, showModal } = props;
  const [loader, setLoader] = useState(false);

  const showToast = (smg, type) => {
    Toast.show({
      type: type, //"success", error
      text1: smg,
      position: "bottom",
      visibilityTime: 2000,
    });
  };
  const deleteReg = async () => {
    const { id, emp, est } = infoDel;
    let path = "EliminarOrdenIngreso.php";
    path += `?empresa=${emp}&ID_oi=${id}`;
    path += `&estado=${est}`;

    const respApi = await getSer(path);
    const { status, data } = respApi;

    if (status) {
      if (data.status) {
        showModal(true);
        showToast("se elimino el registro correctamente", "success");
      } else {
        showModal(true);
        showToast("error al eliminar el registro", "error");
      }
    } else {
      if (data == "limitExe") {
        showModal(true);
        showToast("El servicio demoro mas de lo normal", "error");
      } else if (data != "abortUs") {
        showModal(true);
        showToast("error al eliminar el registro", "error");
      }
    }
  };
  return (
    <View>
      <View style={styles.infoBoxImag}>
        <RemoveNovIng />
      </View>
      <Text style={styles.secondTitle}>
        ¿Esta seguro que desea eliminar este registro?
      </Text>
      <Text style={styles.descrip}>
        Si la eliminas no podra ser recuperada posterior mente
      </Text>
      <GLButton
        onPressAction={() => deleteReg()}
        type="default"
        placeholder={!loader ? "Eliminar" : <LoaderItemSwitch />}
        width={widthPercentageToPx(70)}
      />
    </View>
  );
};

export default DeleteNovIng;

const styles = StyleSheet.create({
  infoBoxContainer: {
    marginBottom: 40,
  },
  infoBoxImag: {
    alignItems: "center",
  },
  secondTitle: {
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    ...getFontStyles(21, 0.5, 0.9),
  },
  descrip: {
    fontFamily: "Volks-Serial-Light",
    color: colors.descriptionColors,
    ...getFontStyles(14, 1, 1.2),
    textAlign: "center",
  },
});
