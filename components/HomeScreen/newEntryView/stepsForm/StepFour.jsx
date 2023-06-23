import React from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { colors, getFontStyles } from "../../../../utils";

const StepFour = ({ formData, onComplete, completed }) => {
  // const handlePress = () => {
  //   onComplete({ stepOneData: value });
  // };
  if (completed) {
    const { stepOneData, stepTwoData, stepThreeData } = formData;
    return (
      <View style={styles.containerResume}>
        {/* Resumen numero 1 */}
        <View style={styles.boxResume}>
          <View style={styles.resume}>
            <Text style={styles.textHead}>Identificación</Text>
            <Text style={styles.textContent}>{stepOneData.identificacion}</Text>

            <Text style={styles.textHead}>Apellidos</Text>
            <Text style={styles.textContent}>
              {stepOneData.apellido} {stepOneData.segundoApellido}
            </Text>

            <Text style={styles.textHead}>Correo electronico</Text>
            <Text style={styles.textContent}>{stepOneData.email}</Text>
          </View>
          <View style={styles.resume}>
            <Text style={styles.textHead}>Nombre</Text>
            <Text style={styles.textContent}>
              {stepOneData.nombre} {stepOneData.segundoNombre}
            </Text>

            <Text style={styles.textHead}>Teléfono</Text>
            <Text style={styles.textContent}>{stepOneData.tel}</Text>

            <Text style={styles.textHead}>Ubicación</Text>
            <Text style={styles.textContent}>
              {stepOneData.munic} {stepOneData.depar}
            </Text>
          </View>
        </View>
        {/* Resumen numero 2 */}
        <View style={styles.boxResume}>
          <View style={styles.resume}>
            <Text style={styles.textHead}>Fecha Ingreso</Text>
            <Text style={styles.textContent}>{stepTwoData.fecIngreso}</Text>

            <Text style={styles.textHead}>Tipo contrato</Text>
            <Text style={styles.textContent}>
              {stepTwoData.select.contrato.label}
            </Text>

            <Text style={styles.textHead}>Tipo jornada</Text>
            <Text style={styles.textContent}>
              {stepTwoData.select.jornada.label ==
              "Jonada incompleta (Especificar la jornada)"
                ? stepTwoData.select.jornadaPer.label
                : stepTwoData.select.jornada.label}
            </Text>

            <Text style={styles.textHead}>Convenio</Text>
            <Text style={styles.textContent}>
              {stepTwoData.select.convenio.label}
            </Text>
            <Text style={styles.textHead}>Pago los 31</Text>
            <Text style={styles.textContent}>
              {stepTwoData.pago31 ? "Si" : "No"}
            </Text>
          </View>
          <View style={styles.resume}>
            <Text style={styles.textHead}>Fecha Egreso</Text>
            <Text style={styles.textContent}>{stepTwoData.fecEgreso}</Text>

            <Text style={styles.textHead}>Cargo</Text>
            <Text style={styles.textContent}>
              {stepTwoData.select.cargo.label}
            </Text>

            <Text style={styles.textHead}>Tipo trabajo</Text>
            <Text style={styles.textContent}>
              {stepTwoData.select.trabajador.label}
            </Text>

            <Text style={styles.textHead}>Obra/labor</Text>
            <Text style={styles.textContent}>
              {stepTwoData.laborOrden == "" ? "N/A" : stepTwoData.laborOrden}
            </Text>
          </View>
        </View>
        {/* Resumen numero 3 */}
        <View style={styles.boxResume}>
          <View style={styles.resume}>
            <Text style={styles.textHead}>Auxilio bonificacion</Text>
            <Text style={styles.textContent}>
              {
                (stepThreeData.select.auxBonif.label = "Aux / bonificaciones"
                  ? "Sin bonificacion"
                  : stepThreeData.select.auxBonif.label)
              }
            </Text>

            <Text style={styles.textHead}>Tipo Salario</Text>
            <Text style={styles.textContent}>
              {stepThreeData.select.salario.label}
            </Text>

            <Text style={styles.textHead}>Centro Costos</Text>
            <Text style={styles.textContent}>
              {stepThreeData.select.centCostos.label}
            </Text>
          </View>
          <View style={styles.resume}>
            <Text style={styles.textHead}>Valor bonificacion</Text>
            <Text style={styles.textContent}>
              {stepThreeData.select.valorAuxBonifi.label == ""
                ? "Sin bonificacion"
                : stepThreeData.select.valorAuxBonifi.label}
            </Text>

            <Text style={styles.textHead}>Valor Salario</Text>
            <Text style={styles.textContent}>
              {stepThreeData.select.valorSalario.label}
            </Text>

            {!stepThreeData.dotacion && (
              <>
                <Text style={styles.textHead}>Dotación</Text>
                <Text style={styles.textContent}>No</Text>
              </>
            )}
          </View>
        </View>

        {/* Dotacion  */}
        {stepThreeData.dotacion && (
          <View style={styles.boxResume}>
            <View style={styles.resume}>
              <Text style={styles.textHead}>Talla Camisa</Text>
              <Text style={styles.textContent}>
                {stepThreeData.select.camisa.label}
              </Text>
              <Text style={styles.textHead}>Talla Guantes</Text>
              <Text style={styles.textContent}>
                {stepThreeData.select.guantes.label}
              </Text>
              <Text style={styles.textHead}>Talla Overol</Text>
              <Text style={styles.textContent}>
                {stepThreeData.select.overol.label}
              </Text>
            </View>
            <View style={styles.resume}>
              <Text style={styles.textHead}>Talla Pantalon</Text>
              <Text style={styles.textContent}>
                {stepThreeData.select.pantalon.label}
              </Text>
              <Text style={styles.textHead}>Talla Zapatos</Text>
              <Text style={styles.textContent}>
                {stepThreeData.select.zapatos.label}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }
};

export default StepFour;

const styles = StyleSheet.create({
  containerResume: {
    display: "flex",
    flexDirection: "column",
  },
  boxResume: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 25,
  },
  resume: {
    flex: 1,
    marginBottom: 20,
  },
  textHead: {
    fontFamily: "Volks-Serial-Medium",
    color: colors.boldGray,
    ...getFontStyles(14, 0.5, 0.8),
  },
  textContent: {
    fontFamily: "Volks-Bold",
    color: colors.darkGray,
    ...getFontStyles(16, 0.8, 0.9),
    marginBottom: 6,
  },
});
