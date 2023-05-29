import React, { Component } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  colors,
  heightPercentageToPx,
  widthPercentageToPx,
} from "../../../../../utils";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";

class FormDotacion extends Component {
  state = {
    selGuantes: "Talla guantes",
    selOverol: "Talla overol",
    selCamisa: "Talla camisa",
    tallPantalon: "",
    tallZapatos: "",
    modalVisible: false,
    modalOptions: [],
    modalSelect: "",
  };

  openModal = (select) => {
    // let modalOptions = [];
    let modalOptions = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
    switch (select) {
      case "selGuantes":
        modalOptions = modalOptions;
        break;
      case "selOverol":
        modalOptions = modalOptions;
        break;
      case "selCamisa":
        modalOptions = modalOptions;
        break;
      default:
        break;
    }
    this.setState({ modalVisible: true, modalOptions, modalSelect: select });
  };

  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  handleSelection = () => {
    const state = this.state;
    this.props.onSelectionChange({
      camisa: {
        label: state.selCamisa,
      },
      guantes: {
        label: state.selGuantes,
      },
      overol: {
        label: state.selOverol,
      },
      pantalon: {
        label: state.tallPantalon,
      },
      zapatos: {
        label: state.tallZapatos,
      },
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.boxForm}>
          <TouchableOpacity
            style={styles.select}
            onPress={() => this.openModal("selGuantes")}
          >
            <Text
              style={
                this.state.selGuantes == "Talla guantes"
                  ? styles.selectTextDis
                  : styles.selectText
              }
            >
              {this.state.selGuantes}
            </Text>
            <Ionicons
              name="chevron-down-outline"
              size={24}
              color={colors.placeholderColor}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.select}
            onPress={() => this.openModal("selOverol")}
          >
            <Text
              style={
                this.state.selOverol == "Talla overol"
                  ? styles.selectTextDis
                  : styles.selectText
              }
            >
              {this.state.selOverol}
            </Text>
            <Ionicons
              name="chevron-down-outline"
              size={24}
              color={colors.placeholderColor}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.select}
            onPress={() => this.openModal("selCamisa")}
          >
            <Text
              style={
                this.state.selCamisa == "Talla camisa"
                  ? styles.selectTextDis
                  : styles.selectText
              }
            >
              {this.state.selCamisa}
            </Text>
            <Ionicons
              name="chevron-down-outline"
              size={24}
              color={colors.placeholderColor}
            />
          </TouchableOpacity>

          <TextInput
            placeholder="Talla pantalon"
            keyboardType="numeric"
            onChangeText={(text) => {
              this.setState({ tallPantalon: text }, () => {
                this.handleSelection();
              });
            }}
            placeholderTextColor={colors.placeholderColor}
            style={styles.input}
            value={this.state.tallPantalon}
          />

          <TextInput
            placeholder="Talla zapatos"
            keyboardType="numeric"
            onChangeText={(text) => {
              this.setState({ tallZapatos: text }, () => {
                this.handleSelection();
              });
            }}
            placeholderTextColor={colors.placeholderColor}
            style={styles.input}
            value={this.state.tallZapatos}
          />

          {/* Modal */}
          <Modal
            visible={this.state.modalVisible}
            animationType="slide"
            transparent={true}
            backgroundColor="white"
          >
            <View style={styles.modal}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => this.closeModal()}
              >
                <Ionicons
                  name="md-close"
                  size={32}
                  color={colors.placeholderColor}
                />
              </TouchableOpacity>
              <View style={styles.selectContainer}>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                >
                  {this.state.modalOptions.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={styles.modalOptionBox}
                      onPress={() => {
                        // Aquí actualizamos el estado del select correspondiente con la opción seleccionada
                        this.setState(
                          {
                            [this.state.modalSelect]: option,
                            modalVisible: false,
                            modalOptions: [],
                            modalSelect: "",
                          },
                          () => {
                            this.handleSelection();
                          }
                        );
                      }}
                    >
                      <Text style={styles.modalOption}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    top: 20,
  },
  boxForm: {
    marginBottom: 10,
  },
  select: {
    backgroundColor: colors.mainBackgroundColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  selectTextDis: {
    fontSize: 16,
    fontFamily: "Volks-Serial-Medium",
    color: colors.placeholderColor,
  },
  selectText: {
    fontSize: 16,
    fontFamily: "Volks-Serial-Medium",
    color: colors.black,
  },
  input: {
    backgroundColor: colors.mainBackgroundColor,
    height: 50,
    paddingLeft: 20,
    marginBottom: 10,
    borderRadius: 10,
    width: "100%",
    fontFamily: "Volks-Serial-Medium",
    fontSize: 16,
    fontWeight: "normal",
  },
  modal: {
    backgroundColor: "white",
    width: widthPercentageToPx(100),
    height: heightPercentageToPx(40),
    borderRadius: 40,
    padding: 30,
    position: "absolute",
    bottom: -20,
    // flex: 1,
    // backgroundColor: "#FFFFFF",
    // margin: 16,
    // borderRadius: 8,
    // padding: 15,
    // alignItems: "center",
    // justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 30,
  },
  selectContainer: {
    marginTop: heightPercentageToPx(5),
  },
  modalOptionBox: {
    fontSize: 15,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.purpleIcons,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalOption: {
    fontSize: 15,
    fontFamily: "Volks-Serial-Medium",
  },
});

export default FormDotacion;
