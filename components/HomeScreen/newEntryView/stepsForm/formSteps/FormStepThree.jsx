import React, { Component, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  colors,
  heightPercentageToPx,
  widthPercentageToPx,
} from "../../../../../utils";

class Formulario extends Component {
  state = {
    selSalario: "Tipo de salario",
    selCenCost: "Centro de costos",
    selCenCost2: "",
    selAuxBon: "Aux / bonificaciones",
    selAuxBon2: "",
    inputValBon: "",
    inputValSal: "",
    modalVisible: false,
    modalOptions: [],
    modalSelect: "",
  };

  openModal = (select) => {
    let modalOptions = [];
    switch (select) {
      case "selSalario":
        modalOptions = ["Ordinario", "Salario integral"];
        break;
      case "selCenCost":
        modalOptions = this.props.lisCenCost;
        break;
      case "selAuxBon":
        modalOptions = this.props.lisAuxBon;
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
      auxBonif: {
        label: state.selAuxBon,
        value: state.selAuxBon2,
      },
      centCostos: {
        label: state.selCenCost,
        value: state.selCenCost2,
      },
      salario: {
        label: state.selSalario,
      },
      valorSalario: {
        label: state.inputValSal,
      },
      valorAuxBonifi: {
        label: state.inputValBon,
      },
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.boxForm}>
          {/* Selects */}
          <TouchableOpacity
            style={styles.select}
            onPress={() => this.openModal("selCenCost")}
          >
            <Text
              style={
                this.state.selCenCost2 == ""
                  ? styles.selectTextDis
                  : styles.selectText
              }
            >
              {this.state.selCenCost}
            </Text>
            <Ionicons
              name="chevron-down-outline"
              size={24}
              color={colors.placeholderColor}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.select}
            onPress={() => this.openModal("selSalario")}
          >
            <Text
              style={
                this.state.selSalario == "Tipo de salario"
                  ? styles.selectTextDis
                  : styles.selectText
              }
            >
              {this.state.selSalario}
            </Text>
            <Ionicons
              name="chevron-down-outline"
              size={24}
              color={colors.placeholderColor}
            />
          </TouchableOpacity>

          <TextInput
            placeholder="Salario Base"
            style={styles.input}
            keyboardType="numeric"
            placeholderTextColor={colors.placeholderColor}
            value={this.state.inputValSal}
            onChangeText={(text) =>
              this.setState({ inputValSal: text }, () => {
                this.handleSelection();
              })
            }
          />

          <TouchableOpacity
            style={styles.select}
            onPress={() => this.openModal("selAuxBon")}
          >
            <Text
              style={
                this.state.selAuxBon2 == ""
                  ? styles.selectTextDis
                  : styles.selectText
              }
            >
              {this.state.selAuxBon}
            </Text>
            <Ionicons
              name="chevron-down-outline"
              size={24}
              color={colors.placeholderColor}
            />
          </TouchableOpacity>

          <TextInput
            placeholder="Valor Auxilio Bonificación"
            style={styles.input}
            keyboardType="numeric"
            placeholderTextColor={colors.placeholderColor}
            value={this.state.inputValBon}
            onChangeText={(text) =>
              this.setState({ inputValBon: text }, () => {
                this.handleSelection();
              })
            }
          />
        </View>

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
                {this.state.modalOptions.map((option, index) =>
                  this.state.modalSelect == "selSalario" ? (
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
                  ) : this.state.modalSelect == "selCenCost" ? (
                    <TouchableOpacity
                      key={index}
                      style={styles.modalOptionBox}
                      onPress={() => {
                        // Aquí actualizamos el estado del select correspondiente con la opción seleccionada
                        this.setState(
                          {
                            [this.state.modalSelect]:
                              option.conv_cco_des.trim(),
                            selCenCost: option.conv_cco_des.trim(),
                            selCenCost2: option.conv_cco.trim(),
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
                      <Text style={styles.modalOption}>
                        {option.conv_cco_des.trim()}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    // select selAuxBon Auxilio / bonificacion
                    <TouchableOpacity
                      key={option.cod_con.trim()}
                      style={styles.modalOptionBox}
                      onPress={() => {
                        // Aquí actualizamos el estado del select correspondiente con la opción seleccionada
                        this.setState(
                          {
                            [this.state.modalSelect]: option.nom_con.trim(),
                            selAuxBon: option.nom_con.trim(),
                            selAuxBon2: option.cod_con.trim(),
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
                      <Text style={styles.modalOption}>
                        {option.nom_con.trim()}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  modalContainer: {
    flex: 1,
    margin: 16,
    borderRadius: 8,
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
  boxForm: {
    marginBottom: 10,
  },
});

export default Formulario;
