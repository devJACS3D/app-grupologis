import React, { Component, useState } from "react";
import Toast from "react-native-toast-message";
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
import listDep from "../../../../../utils/json/depart.json";
import listMun from "../../../../../utils/json/municip.json";
import {
  colors,
  heightPercentageToPx,
  widthPercentageToPx,
} from "../../../../../utils";

class Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select1: props.dep === "" ? "Selecciona departamento" : props.dep,
      select2: props.ciu === "" ? "Selecciona municipio" : props.ciu,
      optionAb: null,
      modalVisible: false,
      modalOptions: [],
      modalSelect: "",
    };
  }

  showToast = (smg, type) => {
    Toast.show({
      type: type, //"success", error
      text1: smg,
      position: "bottom",
      visibilityTime: 2000,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.dep !== prevProps.dep || this.props.ciu !== prevProps.ciu) {
      this.setState({
        select1:
          this.props.dep === "" ? "Selecciona departamento" : this.props.dep,
        select2:
          this.props.ciu === "" ? "Selecciona municipio" : this.props.ciu,
      });
    } else if (this.state.select1 !== prevState.select1) {
      this.setState({
        select2: "Selecciona municipio",
      });
    }
  }

  handleSelection = (dep, mun) => {
    this.props.onSelectionChange(dep, mun);
  };

  openModal = (select) => {
    let modalOptions = [];
    switch (select) {
      case "select1":
        modalOptions = listDep.departamentos;

        this.setState({
          modalVisible: true,
          modalOptions,
          optionAb: "select1",
          modalSelect: select,
        });
        break;
      case "select2":
        if (this.state.select1 != "Selecciona departamento") {
          modalOptions = listMun.municipios;
          this.setState({
            modalVisible: true,
            optionAb: null,
            modalOptions,
            modalSelect: select,
          });
        } else {
          this.showToast("Selecciona departamento", "error");
        }
        break;
      default:
        break;
    }
  };

  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    return (
      <View style={styles.container}>
        {/* Selects */}
        <TouchableOpacity
          style={styles.select}
          onPress={() => this.openModal("select1")}
        >
          <Text
            style={
              this.state.select1 == "Selecciona departamento"
                ? styles.selectTextDis
                : styles.selectText
            }
          >
            {this.state.select1}
          </Text>
          <Ionicons
            name="chevron-down-outline"
            size={24}
            color={colors.placeholderColor}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.select}
          onPress={() => this.openModal("select2")}
        >
          <Text
            style={
              this.state.select2 == "Selecciona municipio"
                ? styles.selectTextDis
                : styles.selectText
            }
          >
            {this.state.select2}
          </Text>
          <Ionicons
            name="chevron-down-outline"
            size={24}
            color={colors.placeholderColor}
          />
        </TouchableOpacity>

        {/* Modal */}
        <Modal
          visible={this.state.modalVisible}
          transparent={true}
          animationType="slide"
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
                {this.state.modalOptions.map((option) =>
                  this.state.optionAb == "select1" ? (
                    <TouchableOpacity
                      key={option.nombre}
                      style={styles.modalOptionBox}
                      onPress={() => {
                        // Aquí actualizamos el estado del select correspondiente con la opción seleccionada
                        this.setState({
                          [this.state.modalSelect]: option.nombre,
                          modalVisible: false,
                          modalOptions: [],
                          optionAb: null,
                          modalSelect: "",
                        });
                        this.handleSelection(
                          option.nombre,
                          "Selecciona municipio"
                        );
                      }}
                    >
                      <Text style={styles.modalOption}>{option.nombre}</Text>
                    </TouchableOpacity>
                  ) : (
                    this.state.select1 != "Selecciona departamento" &&
                    option.nombreDepart == this.state.select1 && (
                      <TouchableOpacity
                        key={option.nombre}
                        style={styles.modalOptionBox}
                        onPress={() => {
                          // Aquí actualizamos el estado del select correspondiente con la opción seleccionada
                          this.setState({
                            [this.state.modalSelect]: option.nombre,
                            modalVisible: false,
                            modalOptions: [],
                            optionAb: null,
                            modalSelect: "",
                          });
                          this.handleSelection(
                            this.state.select1,
                            option.nombre
                          );
                          // this.props.selCountry = {
                          //   this.props.selCountry.dep: this.state.select1,
                          //   mun: this.state.select2,
                          // };
                        }}
                      >
                        <Text style={styles.modalOption}>{option.nombre}</Text>
                      </TouchableOpacity>
                    )
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
  modal: {
    // flex: 1,
    // width: widthPercentageToPx(100),
    // height: heightPercentageToPx(40),
    // backgroundColor: "#FFFFFF",
    // margin: 16,
    // borderRadius: 8,
    // padding: 15,
    // alignItems: "center",
    // justifyContent: "center",
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
  selectContainer: {
    marginTop: heightPercentageToPx(5),
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
