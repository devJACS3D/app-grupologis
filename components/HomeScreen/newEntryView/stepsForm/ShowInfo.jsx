import { StyleSheet, Text, View } from "react-native";
import StatusLine from "../../../common/StatusLine";
import { colors, getFontStyles } from "../../../../utils";
import InfoClaim from "../../../../assets/images/components/infoModal/InfoClaim";
import SvgCapacitations from "../../../../assets/images/home/downloadView/SvgCapacitations";
import SvgInfoCapacitations from "../../../../assets/images/components/infoModal/InfoCapacitation";
import InfoNovedadIng from "../../../../assets/images/components/infoModal/InfoNovedadIng";

const ShowInfo = ({ modul, info }) => {
  if (info.Estado == "Approve") {
    info.Estado = "Aprobar";
  } else if (info.Estado == "Realize") {
    info.Estado = "Realizar";
  }
  return (
    <View>
      {modul == "NovIngreso" ? (
        <View style={styles.containerResume}>
          <View style={styles.infoBoxImag}>
            <InfoNovedadIng />
          </View>
          {/* <Text>{JSON.stringify(info)}</Text> */}
          <View style={styles.boxResume}>
            <View style={styles.resume}>
              <Text style={styles.textHead}>Identificacion</Text>
              <Text style={styles.textContent}>{info.cod_emp.trim()}</Text>

              <Text style={styles.textHead}>Apellidos</Text>
              <Text style={styles.textContent}>
                {info.ap1_emp.trim()} {info.ap2_emp.trim()}
              </Text>
              <Text style={styles.textHead}>Correo electrónico</Text>
              <Text style={styles.textContent}>{info.e_mail.trim()}</Text>
            </View>

            <View style={styles.resume}>
              <Text style={styles.textHead}>Rad.</Text>
              <Text style={styles.textContent}>{info.ID_oi}</Text>

              <Text style={styles.textHead}>Nombre</Text>
              <Text style={styles.textContent}>
                {info.nom1_emp.trim()}{" "}
                {info.nom2_emp ? info.nom2_emp.trim() : ""}
              </Text>

              <Text style={styles.textHead}>Celular</Text>
              <Text style={styles.textContent}>{info.cel_emp.trim()}</Text>
            </View>
          </View>

          <View style={styles.boxResume}>
            <View style={styles.resume}>
              <Text style={styles.textHead}>Fecha Ingreso</Text>
              <Text style={styles.textContent}>{info.fecha_ing.trim()}</Text>

              <Text style={styles.textHead}>Fecha Realizada</Text>
              <Text style={styles.textContent}>{info.fecha_oi.trim()}</Text>

              <Text style={styles.textHead}>Estado</Text>
              <Text style={styles.textContent}>{info.estado.trim()}</Text>

              <Text style={styles.textHead}>Tipo trabajo</Text>
              <Text style={styles.textContent}>{info.tip_tra.trim()}</Text>

              <Text style={styles.textHead}>Valor Auxilio/Bonif...</Text>
              <Text style={styles.textContent}>{parseInt(info.nov_val)}</Text>
            </View>
            <View style={styles.resume}>
              <Text style={styles.textHead}>Fecha Egreso</Text>
              <Text style={styles.textContent}>{info.fecha_egr.trim()}</Text>

              <Text style={styles.textHead}>Tipo Novedad</Text>
              <Text style={styles.textContent}>{info.tip_nov.trim()}</Text>

              <Text style={styles.textHead}>Salario</Text>
              <Text style={styles.textContent}>
                {info.tip_sal.trim()} {parseInt(info.sal_bas.trim())}
              </Text>

              <Text style={styles.textHead}>Pago 31</Text>
              <Text style={styles.textContent}>
                {info.pag_d31 == 0 ? "No" : "Si"}
              </Text>
            </View>
          </View>
          {info.dot_emp == 1 && (
            <View style={styles.boxResume}>
              <View style={styles.resume}>
                <Text style={styles.textHead}>Talla camiseta</Text>
                <Text style={styles.textContent}>{info.camisa_emp.trim()}</Text>

                <Text style={styles.textHead}>Talla overol</Text>
                <Text style={styles.textContent}>{info.overol_emp.trim()}</Text>

                <Text style={styles.textHead}>Talla guantes</Text>
                <Text style={styles.textContent}>
                  {info.guantes_emp.trim()}
                </Text>
              </View>
              <View style={styles.resume}>
                <Text style={styles.textHead}>Talla pantalon</Text>
                <Text style={styles.textContent}>
                  {info.pantalon_emp.trim()}
                </Text>

                <Text style={styles.textHead}>Talla zapatos</Text>
                <Text style={styles.textContent}>
                  {info.zapatos_emp.trim()}
                </Text>
              </View>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.infoBoxContainer}>
          <View style={styles.infoBoxImag}>
            {modul == "Quejas" ? <InfoClaim /> : <SvgInfoCapacitations />}
          </View>
          {modul == "Quejas" ? (
            <View>
              {/* <Text>{JSON.stringify(info)}</Text> */}
              <StatusLine status={info.Estado} />
            </View>
          ) : (
            <Text style={styles.textStyle}>{info.Estado}</Text>
          )}
          <View style={styles.infoBox}>
            <View style={{ width: "33%" }}>
              <Text style={styles.textHead}>Año</Text>
              <Text>{info.Fecha.trim().split("/")[2]}</Text>
            </View>
            <View style={{ width: "33%" }}>
              <Text style={styles.textHead}>Mes</Text>
              <Text>{info.Fecha.trim().split("/")[1]}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.textHead}>No. Radicado</Text>
              <Text>{info.Documento.trim()}</Text>
            </View>
          </View>

          <Text style={styles.secondTitle}>{info.Asunto.trim()}</Text>
          <Text style={styles.descrip}>{info.Comentario.trim()}</Text>

          {modul == "Capac" && (
            <View style={styles.infoBox}>
              <View style={{ width: "33%" }}>
                <Text style={styles.textHead}>Personal</Text>
                <Text>{info.Personal.trim()}</Text>
              </View>
              <View style={{ width: "33%" }}>
                <Text style={styles.textHead}>Tema</Text>
                <Text>{info.Tema.trim()}</Text>
              </View>

              {info.Tipo != null && (
                <View style={{ flex: 1 }}>
                  <Text style={styles.textHead}>Tipo</Text>
                  <Text>{info.Tipo.trim()}</Text>
                </View>
              )}
            </View>
          )}

          {modul == "Quejas" && info.Respuesta.trim() != "" && (
            <>
              <Text>Respuesta</Text>
              <Text style={styles.descrip}>{info.Respuesta.trim()}</Text>
            </>
          )}
        </View>
      )}
    </View>
  );
};

export default ShowInfo;

const styles = StyleSheet.create({
  infoBoxContainer: {
    marginBottom: 40,
  },
  containerResume: {
    display: "flex",
    flexDirection: "column",
  },
  infoBox: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    marginBottom: 20,
  },
  secondTitle: {
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    ...getFontStyles(18, 0.5, 0.9),
  },
  descrip: {
    fontFamily: "Volks-Serial-Light",
    color: colors.descriptionColors,
    ...getFontStyles(14, 1, 1.2),
    textAlign: "center",
  },
  textHead: {
    fontFamily: "Volks-Serial-Medium",
    color: colors.boldGray,
    ...getFontStyles(14, 0.5, 0.9),
  },
  infoBoxImag: {
    // top: -10,
    alignItems: "center",
  },
  textContent: {
    fontFamily: "Volks-Bold",
    color: colors.darkGray,
    ...getFontStyles(16, 0.8, 0.9),
    marginBottom: 6,
  },
  boxResume: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    marginLeft: 5,
  },
  resume: {
    flex: 1,
    marginBottom: 5,
  },
  textStyle: {
    textAlign: "center",
    fontSize: 18,
    color: colors.boldGray,
    fontFamily: "Poppins-Bold",
  },
});
