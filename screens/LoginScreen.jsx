import { useContext } from "react";
import {
  Image,
  PixelRatio,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import authContext from "../context/auth/authContext";
import {
  colors,
  getFontStyles,
  heightPercentageToPx,
  images,
  widthPercentageToPx,
} from "../utils";
const pixelDensity = parseInt(PixelRatio.get());

const LoginScreen = ({ navigation }) => {
  const { setRole } = useContext(authContext);

  const handleSelection = (type) => {
    setRole(type);
    navigation.navigate("BusinessEmployeeLogin", { type });
  };
  //BusinessEmployeeLogin
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image style={styles.logoImage} source={{ uri: images.colorLogo }} />
        <View style={styles.title}>
          <Text style={styles.welcomeText}>Bienvenido</Text>
          <Text style={styles.subtitle}>a la App Grupo Logis</Text>

          <View style={styles.descriptionContainer}>
            <Text style={styles.welcomeDesc}>
              Trabajamos para mejorar tu experiencia como empleado o empresa.
            </Text>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <Pressable onPress={() => handleSelection("employee")}>
            <View style={styles.asEmployeeButton}>
              <Text style={{ color: colors.white }}>SOY COLABORADOR</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => handleSelection("business")}>
            <View style={styles.asBusinessButton}>
              <Text style={{ color: colors.white }}>SOY EMPRESA</Text>
            </View>
          </Pressable>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.loginBackgroundImages}
          source={images.loginImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.generalBackgroundColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: heightPercentageToPx(4),
    height: heightPercentageToPx(107),
  },
  topContainer: {
    display: "flex",
    alignItems: "center",
    height: heightPercentageToPx(55),
    width: widthPercentageToPx(75),
  },
  imageContainer: {
    height: heightPercentageToPx(pixelDensity <= 1 ? 30 : 40),
    width: widthPercentageToPx(pixelDensity <= 1 ? 90 : 100),
  },
  logoImage: {
    width: widthPercentageToPx(36.5),
    height: heightPercentageToPx(9),
    marginTop: 50,
    marginBottom: 50,
    overflow: "visible",
  },
  welcomeText: {
    fontFamily: "Poppins-Bold",
    color: colors.mainBlue,
    ...getFontStyles(30),
    textAlign: "center",
  },
  subtitle: {
    ...getFontStyles(22),
    fontFamily: "Poppins-Bold",
    textAlign: "center",
  },
  descriptionContainer: {
    width: widthPercentageToPx(60),
  },
  welcomeDesc: {
    fontFamily: "Volks-Serial-Light",
    color: colors.descriptionColors,
    ...getFontStyles(14, 0.4, 1),
    textAlign: "center",
  },
  buttonsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: widthPercentageToPx(100),
    marginTop: 30,
  },
  asEmployeeButton: {
    backgroundColor: colors.mainPink,
    fontFamily: "Poppins-Regular",
    height: 55,
    width: widthPercentageToPx(65),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  asBusinessButton: {
    backgroundColor: colors.mainBlue,
    fontFamily: "Poppins-Regular",
    height: 55,
    width: widthPercentageToPx(65),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  imageContainer: {
    height:
      Platform.OS === "ios"
        ? heightPercentageToPx(50)
        : heightPercentageToPx(44),
    width: widthPercentageToPx(100),
  },
  loginBackgroundImages: {
    height: Platform.OS === "ios" ? "90%" : heightPercentageToPx(52),
    width: Platform.OS === "ios" ? "100%" : widthPercentageToPx(100),
    // height: "90%",
    // width: "100%",
  },
});
export default LoginScreen;
