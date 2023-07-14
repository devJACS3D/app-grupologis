import React from "react";
import {
  PixelRatio,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  colors,
  getFontStyles,
  heightPercentageToPx,
  widthPercentageToPx,
} from "../../../utils";
import { Feather } from "@expo/vector-icons";
import FormTitle from "../../common/form/FormTitle";
import ItemDesc from "./ItemDesc";
import GLButton from "../../common/buttons/GLButton";
const pixelDensity = parseInt(PixelRatio.get());

const MultipleDownloads = (props) => {
  const { listDow, closeModal, infoEmit } = props;
  return (
    <View style={styles.modalForm}>
      <Pressable onPress={closeModal}>
        <View style={styles.goBackButton}>
          <Feather name="x" size={24} color={colors.purpleIcons} />
        </View>
      </Pressable>
      <View style={styles.modalContent}>
        <View style={{ width: "85%", alignItems: "center" }}>
          <Text style={styles.titleText}>Seleccione</Text>
          <Text style={styles.descrText}>Los archivos a descargar</Text>
        </View>

        <View style={styles.infoContent}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {listDow.map((itm, index) => (
              <ItemDesc
                key={index}
                infoItm={itm}
                infoDesc={(i) => infoEmit(i)}
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.modalContent}>
          <GLButton
            type={"second"}
            placeholder="Cerrar"
            width={widthPercentageToPx(70)}
            onPressAction={closeModal}
          />
        </View>
      </View>
    </View>
  );
};

export default MultipleDownloads;

const styles = StyleSheet.create({
  modalForm: {
    top: widthPercentageToPx(4),
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    transform: [{ translateY: 65 }],
    width: widthPercentageToPx(90),
    height: heightPercentageToPx(pixelDensity <= 1 ? 67 : 74),
  },
  goBackButton: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lightGray,
    borderRadius: 15,
    marginBottom: 5,
    height: 30,
    width: 30,
  },
  modalContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontFamily: "Poppins-Bold",
    // marginTop: 5,
    ...getFontStyles(19, 0.5, 0.9),
  },
  descrText: {
    fontFamily: "Volks-Serial-Light",
    color: colors.descriptionColors,
    ...getFontStyles(15, 0.5, 0.9),
  },
  infoContent: {
    width: widthPercentageToPx(90),
    height: heightPercentageToPx(pixelDensity <= 1 ? 43 : 52),
  },
});
