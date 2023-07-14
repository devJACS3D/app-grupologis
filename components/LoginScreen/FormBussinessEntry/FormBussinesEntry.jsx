import React, { Component } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  colors,
  heightPercentageToPx,
  widthPercentageToPx,
} from "../../../utils";

class FormuBussines extends Component {
  state = {
    optSelectLab: this.props.title,
    modalVisible: false,
    modalOptions: [],
    modalSelect: "",
  };

  openModal = (select) => {
    let modalOptions = [];
    switch (select) {
      case "select":
        modalOptions = this.props.list;
        break;
      default:
        break;
    }
    this.setState({ modalVisible: true, modalOptions, modalSelect: select });
  };

  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    return (
      <View>
        {/* Selects */}
        <TouchableOpacity
          style={styles.select}
          onPress={() => this.openModal("select")}
        >
          <Text
            style={
              this.state.optSelectLab == this.props.title
                ? styles.selectText
                : styles.selectedText
            }
          >
            {this.state.optSelectLab}
          </Text>
          <Ionicons
            name="chevron-down-outline"
            size={24}
            color={
              this.state.optSelectLab == this.props.title
                ? colors.placeholderColor
                : colors.black
            }
          />
        </TouchableOpacity>

        {/* Modal */}
        <Modal
          visible={this.state.modalVisible}
          animationType="slide"
          transparent={true}
          backgroundColor="white"
        >
          <View style={styles.modalContainer}>
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
                      key={option.value}
                      style={
                        option.value === null
                          ? styles.selectOption
                          : styles.modalOptionBox
                      }
                      onPress={() => {
                        // Aquí actualizamos el estado del select correspondiente con la opción seleccionada
                        this.setState({
                          [this.state.modalSelect]: option.value,
                          modalVisible: false,
                          modalOptions: [],
                          optSelectLab: option.label,
                        });
                        this.props.onOptionSel(option.value);
                      }}
                    >
                      <ScrollView>
                        <Text
                          style={
                            option.value === null
                              ? styles.modalOptionTtl
                              : styles.modalOption
                          }
                        >
                          {option.label}
                        </Text>
                      </ScrollView>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  select: {
    backgroundColor: colors.inputBackground,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    height: 50,
    marginTop: 20,
    width: widthPercentageToPx(70),
  },
  selectText: {
    // paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: "Volks-Serial-Medium",
    color: colors.placeholderColor,
  },
  selectedText: {
    // paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: "Volks-Serial-Medium",
    color: colors.black,
  },
  modalContainer: {
    flex: 1,
    margin: 16,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "white",
    width: widthPercentageToPx(100),
    height: heightPercentageToPx(40),
    borderRadius: 40,
    padding: 30,
    position: "absolute",
    bottom: -20,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 30,
  },
  selectOption: {
    borderColor: "white",
    marginBottom: 25,
  },
  selectContainer: {
    marginTop: 20,
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
  modalOptionTtl: {
    fontSize: 19,
    fontWeight: "bold",
    textAlign: "center",
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
});

export default FormuBussines;
