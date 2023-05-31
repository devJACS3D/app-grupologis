import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import {
  colors,
  getFontStyles,
  heightPercentageToPx,
  images,
  widthPercentageToPx,
} from "../../utils";
import Toast from "react-native-toast-message";

import { Feather } from "@expo/vector-icons";
import { useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decode } from "base-64";
import { fetchPost } from "../../utils/functions";
import LoaderItemSwitchDark from "../common/loaders/LoaderItemSwitchDark";

const Code = ({ navigation }) => {
  let codeInputRef = useRef(null);
  const [code, setCode] = useState("");
  const [loader, setLoader] = useState(false);

  const showToast = (smg, type) => {
    Toast.show({
      type: type, //"success", error
      text1: smg,
      position: "bottom",
      visibilityTime: 2000,
    });
  };

  const handlePressCode = () => {
    codeInputRef.current.focus();
  };

  const returnPag = async () => {
    await AsyncStorage.clear();
    navigation.navigate("Login");
  };

  const handleContinueToSelectBusiness = async () => {
    const codeVer = await AsyncStorage.getItem("code");

    if (code.length !== 4 || code != codeVer) {
      showToast("El código no es válido", "error");
      return;
    } else {
      navigation.navigate("BusinessEntry", { type: "business" });
    }
  };

  const resendCode = async () => {
    setLoader(true);
    const phone = await AsyncStorage.getItem("phone");
    const path = "usuario/ReenviarCodigo.php";
    const body = `telefono=${phone}`;
    const respApi = await fetchPost(path, body);
    console.log("respApi code", respApi);
    const { status, data } = respApi;
    if (status) {
      if (data.code) {
        showToast("Mensaje enviado correctamente", "success");
        AsyncStorage.setItem("code", data.code);
        setLoader(false);
      } else {
        showToast("Error al enviar el codigo", "error");
        setLoader(false);
      }
    } else {
      showToast("Error al enviar el codigo", "error");
      setLoader(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image style={styles.logoImage} source={{ uri: images.colorLogo }} />
        <View style={styles.title}>
          <Text style={styles.subtitle}>Ingrese</Text>
          <Text style={styles.subtitle}>el codigo</Text>

          <View style={styles.descriptionContainer}>
            <Text style={styles.welcomeDesc}>
              Ingrese el código de 4 digitos que fue enviado a su celular.
            </Text>
          </View>
        </View>
        <TextInput
          ref={codeInputRef}
          keyboardType="numeric"
          style={{ height: 1 }}
          maxLength={4}
          value={code}
          onChangeText={(e) => setCode(e)}
        />
        {
          <Pressable
            style={styles.textInputContainers}
            onPress={handlePressCode}
          >
            {[0, 1, 2, 3].map((e) => (
              <View style={styles.codeElementContainer} key={e}>
                <Text style={styles.codeElement}>
                  {code.split("")[e] || ""}
                </Text>
              </View>
            ))}
          </Pressable>
        }
        <Pressable onPress={handleContinueToSelectBusiness}>
          <View style={styles.asBusinessButton}>
            <Text style={{ color: colors.white }}>Ingresar</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => resendCode()}>
          <View style={styles.asCodeSend}>
            {!loader ? (
              <Text style={{ color: colors.blueIndicator }}>
                Reenviar codigo
              </Text>
            ) : (
              <LoaderItemSwitchDark />
            )}
          </View>
        </Pressable>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.loginBackgroundImages}
          // source={{ uri: images.loginImage }}
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
    height: heightPercentageToPx(40),
    width: widthPercentageToPx(100),
  },
  logoImage: {
    width: widthPercentageToPx(35),
    height: heightPercentageToPx(9),
    marginTop: 50,
    marginBottom: 50,
    overflow: "visible",
  },
  welcomeText: {
    fontFamily: "Poppins-Bold",
    color: colors.mainBlue,
    ...getFontStyles(30),
  },
  subtitle: {
    ...getFontStyles(22),
    fontFamily: "Poppins-Bold",
  },
  descriptionContainer: {
    width: widthPercentageToPx(60),
  },
  welcomeDesc: {
    fontFamily: "Poppins-Regular",
    color: colors.descriptionColors,
    marginTop: 20,
    ...getFontStyles(14, 0.5, 0.9),
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
    marginTop: 20,
  },
  asCodeSend: {
    fontFamily: "Poppins-Regular",
    height: 55,
    width: widthPercentageToPx(65),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  loginBackgroundImages: {
    width: "100%",
    height: "100%",
  },
  textInputContainers: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 8,
    width: widthPercentageToPx(65),
    height: 50,
    marginTop: 10,
  },
  codeElementContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginTop: 10,
    width: "23%",
    borderRadius: 7,
    backgroundColor: colors.white,
  },
  codeElement: {
    fontFamily: "Poppins-Light",
    color: colors.gray,
    ...getFontStyles(18, 0.5, 0.9),
  },
  goBackButton: {
    position: "relative",
    top: 20,
    left: widthPercentageToPx(-43),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.black,
    opacity: 0.4,
    borderRadius: 15,
    height: 30,
    width: 30,
  },
});

export default Code;
