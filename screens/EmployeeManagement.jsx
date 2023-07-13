import { default as React } from "react";
import { Linking, Platform, ScrollView, StyleSheet, View } from "react-native";
import EmployeeMcard from "../components/HomeScreen/EmployeeManagement/EmployeeMcard";
import MainCardInfo from "../components/HomeScreen/homeView/MainCardInfo";
import Layout from "../components/layout/Layout";
import {
  employeeManagement,
  heightPercentageToPx,
  images,
  widthPercentageToPx,
} from "../utils";

import SvgHvida from "../assets/images/components/HomeScreen/EmployeeManagement/SvgHvida";
import SvgMaestroE from "../assets/images/components/HomeScreen/EmployeeManagement/SvgMaestroE";
import SvgNovedaI from "../assets/images/components/HomeScreen/EmployeeManagement/SvgNovedaI";
import SvgCapacitations from "../assets/images/home/downloadView/SvgCapacitations";
import SvgNdisciplinarias from "../assets/images/home/downloadView/ndisciplinarias";
import { useFocusEffect } from "@react-navigation/core";
import { cancelarSolicitudesApi } from "../utils/axiosInstance";

const displaySvg = (type) => {
  switch (type) {
    case "hvida":
      return <SvgHvida />;
    case "novedai":
      return <SvgNovedaI />;
    case "maestroe":
      return <SvgMaestroE />;
    case "capacit":
      return <SvgCapacitations />;
    case "ndiscip":
      return <SvgNdisciplinarias />;
    default:
      return null;
  }
};

const EmployeeManagement = (props) => {
  //const [dataCard, setDataCard] = useState()

  const { navigation } = props;
  //const [dataCard, setDataCard] = useState()
  const handleRedirect = (id) => {
    switch (id) {
      case "novedai":
        navigation.navigate("NewEntryView");
        break;
      case "maestroe":
        navigation.navigate("MasterEmployee");
        break;
      case "capacit":
        navigation.navigate("Capacitations");
        break;
      case "ndiscip":
        Linking.openURL("https://forms.office.com/r/XzKHTNk6Zp");
        break;
      default:
        break;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        cancelarSolicitudesApi();
      };
    }, [])
  );

  return (
    <Layout props={{ ...props }}>
      <MainCardInfo
        firstTitle={"Gestión de"}
        secondTitle="empleados"
        description={
          "Podrás descargar hojas de vida, certificados y generar novedades"
        }
        image={images.employeeNimage}
      />
      <View style={styles.containerScroll}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.employeemCardsContainer}>
            {employeeManagement.map((e) => (
              <EmployeeMcard
                key={e.id}
                desc={e.description}
                title={e.title}
                onRedirect={handleRedirect}
                image={displaySvg(e.id)}
                id={e.id}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
};

export default EmployeeManagement;

const styles = StyleSheet.create({
  generalView: {
    height: heightPercentageToPx(100),
    width: widthPercentageToPx(100),
  },

  containerScroll: {
    width: widthPercentageToPx(90),
    height:
      Platform.OS === "android"
        ? heightPercentageToPx(35)
        : heightPercentageToPx(31),
    paddingTop: 20,
  },
  employeemCardsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
});
