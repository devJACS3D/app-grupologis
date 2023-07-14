import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  PixelRatio,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  colors,
  heightPercentageToPx,
  widthPercentageToPx,
} from "../../../utils";
import StatusLine from "../../common/StatusLine";
import CardElement from "../newsView/components/CardElement";
import ShowInfo from "../newEntryView/stepsForm/ShowInfo";
import GLButton from "../../common/buttons/GLButton";

const pixelDensity = parseInt(PixelRatio.get());

const ClaimCard = (props) => {
  const [modal, setModal] = useState(false);

  const closeModal = () => {
    setModal(false);
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.topContent}>
        <CardElement head={"RAD."} content={props.Documento} />
        <CardElement head={"Fecha"} content={props.Fecha} />
        <Pressable onPress={() => setModal(!modal)}>
          <View style={styles.actionButton("ghost")}>
            <AntDesign name="eye" size={18} color={colors.darkGray} />
          </View>
        </Pressable>
      </View>
      <StatusLine status={props.Estado} />
      {modal && (
        <Modal animationType="slide" visible={modal} transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => closeModal()}
              >
                <Ionicons
                  name="md-close"
                  size={32}
                  color={colors.placeholderColor}
                />
              </TouchableOpacity>
              <View style={styles.infoClaim}>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                >
                  <ShowInfo modul="Quejas" info={props} />
                  <GLButton
                    type={"second"}
                    placeholder="Cerrar"
                    width={widthPercentageToPx(74)}
                    onPressAction={() => closeModal()}
                  />
                </ScrollView>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};
export default ClaimCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.white,
    borderRadius: 17,
    marginBottom: 12,
    padding: 15,
  },
  topContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  actionButton: (type) => ({
    width: 36,
    height: 36,
    borderColor: type === "ghost" ? "#DBDBDB" : null,
    borderWidth: type === "ghost" ? 2 : 0,
    backgroundColor:
      type === "ghost" ? colors.white : colors.mainBackgroundColor,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
  }),
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateY: 50 }],
  },
  infoClaim: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  modal: {
    backgroundColor: "white",
    width: widthPercentageToPx(90),
    height: heightPercentageToPx(pixelDensity <= 1 ? 60 : 70),
    borderRadius: 10,
    // padding: 30,
    paddingHorizontal: 30,
    position: "absolute",
    // bottom: -20,
  },
  closeButton: {
    // top: widthPercentageToPx(-7),
    // left: widthPercentageToPx(-4),
    height: 35,
    marginVertical: 10,
    // backgroundColor: colors.black,
  },
});
