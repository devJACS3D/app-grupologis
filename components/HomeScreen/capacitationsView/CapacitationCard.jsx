import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  colors,
  heightPercentageToPx,
  widthPercentageToPx,
} from "../../../utils";
import { View } from "react-native";
import CardElement from "../newsView/components/CardElement";
import { useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Modal } from "react-native";
import ShowInfo from "../newEntryView/stepsForm/ShowInfo";
import GLButton from "../../common/buttons/GLButton";

const CapacitationsCard = (props) => {
  const [modal, setModal] = useState(false);

  const closeModal = () => {
    setModal(false);
  };

  if (props.Estado == "Approve") {
    props.Estado = "Aprobar";
  } else if (props.Estado == "Realize") {
    props.Estado = "Realizar";
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.topContent}>
        <CardElement head={"Doc."} content={props.Documento} />
        <CardElement head={"Fecha"} content={props.Fecha} />
        <CardElement head={"Estado"} content={props.Estado} />
        <Pressable onPress={() => setModal(!modal)}>
          <View style={styles.actionButton("ghost")}>
            <AntDesign name="eye" size={18} color={colors.darkGray} />
          </View>
        </Pressable>
      </View>

      {/* modal  */}
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
            <View style={styles.modalContainerInfo}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              >
                <View style={{ paddingBottom: 80 }}>
                  <ShowInfo modul="Capac" info={props} />
                  <GLButton
                    type={"second"}
                    placeholder="Cerrar"
                    width={widthPercentageToPx(70)}
                    onPressAction={() => closeModal()}
                  />
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CapacitationsCard;

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
    margin: 16,
    borderRadius: 8,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainerInfo: {
    // marginBottom: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    top: 90,
    backgroundColor: "white",
    width: widthPercentageToPx(90),
    height: heightPercentageToPx(80),
    borderRadius: 20,
    // padding: 30,
    // paddingTop: 10,
    paddingHorizontal: 30,
    position: "absolute",
    // bottom: -20,
  },
  closeButton: {
    // top: widthPercentageToPx(-8),
    // left: widthPercentageToPx(-5),
    // top: 10,
    height: 35,
    marginVertical: 10,
  },
});
