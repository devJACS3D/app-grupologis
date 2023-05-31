import { Ionicons } from "@expo/vector-icons";
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
import { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSer } from "../../../../../utils/axiosInstance";
import Toast from "react-native-toast-message";
import { ScrollView } from "react-native";

class FormStepTwo extends Component {
  state = {
    selContrato: "Tipo de contrato",
    selContrato2: "",
    selTrabajador: "Tipo de trabajador",
    selConvenio: "Convenio",
    selConvenio2: "",
    selJornada: "Tipo de jornada",
    selCargo: "Cargo - Seleccione convenio",
    selCargo2: "Cargo",
    modalOptionsCargo: [null],
    showJornPer: false,
    inputJornPer: "",
    modalVisible: false,
    modalOptions: [],
    modalSelect: "",
  };

  showToast(smg, type) {
    Toast.show({
      type: type, //"success", error
      text1: smg,
      position: "bottom",
      visibilityTime: 2000,
    });
  }

  openModal = (select) => {
    let modalOptions = [];
    switch (select) {
      case "selContrato":
        modalOptions = this.props.lisCont;
        break;
      case "selTrabajador":
        modalOptions = [
          "Manejo y confianza",
          "Direccion manejo y confianza",
          "Aprendiz etapa productiva",
        ];
        break;
      case "selConvenio":
        modalOptions = this.props.listConv;
        break;
      case "selJornada":
        modalOptions = [
          "Sin transporte",
          "Jornada completa",
          "Pago por dias",
          "Pago por dias asumida a la seguridad social",
          "Jonada incompleta (Especificar la jornada)",
        ];
        break;
      case "selCargo":
        this.state.modalOptionsCargo[0] != null
          ? (modalOptions = this.state.modalOptionsCargo)
          : this.showToast("Seleccione el convenio", "error");
        break;
      default:
        break;
    }
    this.setState({ modalVisible: true, modalOptions, modalSelect: select });
  };

  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  getListCargos = async (codCon) => {
    this.setState({ selCargo: "Buscando convenio" });
    let infoLog = await AsyncStorage.getItem("logged");
    infoLog = JSON.parse(infoLog);
    const empSel = infoLog.empSel.toUpperCase();
    const codEmp = infoLog.codEmp;

    let pathCarg = `GetDatosOrdenIngreso.php`;
    pathCarg += `?cod_cli=${codEmp}&empresa=${empSel}&cod_conv=${codCon}`;

    const respReg = await getSer(pathCarg);
    if (respReg == "limitExe") {
      console.log("limitExe");
    } else {
      if (respReg.status) {
        const { data } = respReg;
        this.state.modalOptionsCargo = data.cargos;
        this.setState({ selCargo: "Seleccione convenio" });
      } else {
        this.showToast("Error al buscar listado de cargos", "error");
      }
    }
  };

  handleSelection = () => {
    const state = this.state;
    state.selJornada === "Jonada incompleta (Especificar la jornada)"
      ? this.setState({ showJornPer: true })
      : this.setState({ showJornPer: false });

    this.props.onSelectionChange({
      contrato: {
        label: state.selContrato,
        value: state.selContrato2,
      },
      trabajador: {
        label: state.selTrabajador,
      },
      convenio: {
        label: state.selConvenio,
        value: state.selConvenio2,
      },
      jornada: {
        label: state.selJornada,
      },
      cargo: {
        label: state.selCargo,
        value: state.selCargo2,
      },
      jornadaPer: {
        label: state.inputJornPer,
      },
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.boxForm}>
          {/* Selects */}
          <TouchableOpacity
            key={Math.random()}
            style={styles.select}
            onPress={() => this.openModal("selContrato")}
          >
            <Text
              style={
                this.state.selContrato2 == ""
                  ? styles.selectTextDis
                  : styles.selectText
              }
            >
              {this.state.selContrato}
            </Text>
            <Ionicons
              name="chevron-down-outline"
              size={24}
              color={colors.placeholderColor}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.select}
            onPress={() => this.openModal("selTrabajador")}
          >
            <Text
              style={
                this.state.selTrabajador == "Tipo de trabajador"
                  ? styles.selectTextDis
                  : styles.selectText
              }
            >
              {this.state.selTrabajador}
            </Text>
            <Ionicons
              name="chevron-down-outline"
              size={24}
              color={colors.placeholderColor}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.select}
            onPress={() => this.openModal("selConvenio")}
          >
            <Text
              style={
                this.state.selConvenio2 == ""
                  ? styles.selectTextDis
                  : styles.selectText
              }
            >
              {this.state.selConvenio}
            </Text>
            <Ionicons
              name="chevron-down-outline"
              size={24}
              color={colors.placeholderColor}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.select}
            onPress={() => this.openModal("selJornada")}
          >
            <Text
              style={
                this.state.selJornada == "Tipo de jornada"
                  ? styles.selectTextDis
                  : styles.selectText
              }
            >
              {this.state.selJornada}
            </Text>
            <Ionicons
              name="chevron-down-outline"
              size={24}
              color={colors.placeholderColor}
            />
          </TouchableOpacity>

          {this.state.showJornPer && (
            <TextInput
              placeholder="Tipo de Jornada"
              onChangeText={(text) => {
                this.setState({ inputJornPer: text }, () => {
                  this.handleSelection();
                });
              }}
              placeholderTextColor={colors.placeholderColor}
              style={styles.input}
              value={this.state.inputJornPer}
            />
          )}

          <TouchableOpacity
            style={styles.select}
            onPress={() => this.openModal("selCargo")}
          >
            <Text
              style={
                this.state.selCargo2 == "Cargo"
                  ? styles.selectTextDis
                  : styles.selectText
              }
            >
              {this.state.selCargo}
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
                  {this.state.modalOptions.map((option) =>
                    this.state.modalSelect == "selTrabajador" ||
                    this.state.modalSelect == "selJornada" ? (
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
                    ) : // select contratos
                    this.state.modalSelect == "selContrato" ? (
                      <TouchableOpacity
                        key={option.tip_con.trim()}
                        style={styles.modalOptionBox}
                        onPress={() => {
                          // Aquí actualizamos el estado del select correspondiente con la opción seleccionada
                          this.setState(
                            {
                              [this.state.modalSelect]: option.nom_con.trim(),
                              selContrato: option.nom_con.trim(),
                              selContrato2: option.tip_con.trim(),
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
                    ) : // select convenios
                    this.state.modalSelect == "selConvenio" ? (
                      <TouchableOpacity
                        key={option.cod_conv.trim()}
                        style={styles.modalOptionBox}
                        onPress={() => {
                          // Aquí actualizamos el estado del select correspondiente con la opción seleccionada
                          this.setState(
                            {
                              [this.state.modalSelect]: option.nom_conv.trim(),
                              selConvenio: option.nom_conv.trim(),
                              selConvenio2: option.cod_conv.trim(),
                              modalVisible: false,
                              modalOptions: [],
                              modalSelect: "",
                            },
                            () => {
                              this.getListCargos(option.cod_conv.trim());
                              this.handleSelection();
                            }
                          );
                        }}
                      >
                        <Text style={styles.modalOption}>
                          {option.nom_conv.trim()}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      // select cargos
                      <TouchableOpacity
                        key={option.cod_car.trim()}
                        style={styles.modalOptionBox}
                        onPress={() => {
                          // Aquí actualizamos el estado del select correspondiente con la opción seleccionada
                          this.setState(
                            {
                              [this.state.modalSelect]: option.nom_car.trim(),
                              selCargo: option.nom_car.trim(),
                              selCargo2: option.cod_car.trim(),
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
                          {option.nom_car.trim()}
                        </Text>
                      </TouchableOpacity>
                    )
                  )}
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
  selectText: {
    fontSize: 16,
    fontFamily: "Volks-Serial-Medium",
    color: colors.black,
  },
  selectTextDis: {
    fontSize: 16,
    fontFamily: "Volks-Serial-Medium",
    color: colors.placeholderColor,
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

export default FormStepTwo;
