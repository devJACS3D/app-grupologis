import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView } from "react-native-webview";
import {
  colors,
  getFontStyles,
  heightPercentageToPx,
  images,
  widthPercentageToPx,
} from "../../../utils";
import * as Sharing from "expo-sharing";
import WebViewContext from "../../../context/webView/WebViewContext";
import * as FileSystem from "expo-file-system";
import { Modal } from "react-native";

const WebViewScreen = () => {
  const { nameUtiView, setNameUtiView } = useContext(WebViewContext);
  const [fileUri, setFileUri] = useState(null);
  //   const fileUri = null;
  // "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

  const loadInfWebView = async () => {
    if (nameUtiView) {
      setFileUri(nameUtiView);
    } else {
      setFileUri(nameUtiView);
    }
  };

  useEffect(() => {
    loadInfWebView();
  }, [nameUtiView]);

  const handleShare = async () => {
    try {
      await Sharing.shareAsync(fileUri.file, {
        mimeType: fileUri.mime,
        UTI: fileUri.uti,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setNameUtiView(null);
  };

  if (fileUri && fileUri.file) {
    return (
      <View style={styles.containerView}>
        <View style={styles.containerWeb}>
          <WebView
            originWhitelist={["file://"]}
            source={{ uri: fileUri.file }}
          />
        </View>
        <View style={styles.footerView}>
          <View style={styles.infoBtn}>
            <View style={styles.contComp}>
              <TouchableOpacity
                style={{ backgroundColor: "transparent" }}
                onPress={() => handleShare()}
              >
                <Text style={styles.btnViewComp}>Compartir</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.contImage}>
              <Image
                style={styles.logoImage}
                source={{ uri: images.whiteLogo }}
              />
            </View>
            <View style={styles.contClos}>
              <TouchableOpacity
                style={{ backgroundColor: "transparent" }}
                onPress={handleClose}
              >
                <Text style={styles.btnViewClos}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  } else {
    return <View></View>;
  }
};

export default WebViewScreen;

const styles = StyleSheet.create({
  containerView: {
    height: heightPercentageToPx(100),
    width: widthPercentageToPx(100),
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  containerWeb: {
    height: heightPercentageToPx(78),
    width: widthPercentageToPx(100),
  },
  footerView: {
    width: widthPercentageToPx(100),
    height: heightPercentageToPx(11),
    bottom: 2,
    display: "flex",
    alignItems: "center",
  },
  infoBtn: {
    display: "flex",
    flexDirection: "row",
    width: widthPercentageToPx(99),
    height: heightPercentageToPx(6),
    backgroundColor: colors.blueIndicator,
    borderRadius: 10,
  },
  contComp: {
    width: widthPercentageToPx(30),
    height: heightPercentageToPx(6),
    justifyContent: "center",
  },
  contImage: {
    width: widthPercentageToPx(40),
    height: heightPercentageToPx(6),
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: widthPercentageToPx(12),
    height: heightPercentageToPx(4),
    overflow: "visible",
  },
  contClos: {
    flex: 1,
    justifyContent: "center",
  },
  btnViewComp: {
    color: colors.white,
    ...getFontStyles(17, 0.6, 0.9),
    paddingLeft: 15,
  },
  btnViewClos: {
    color: colors.white,
    ...getFontStyles(17, 0.6, 0.9),
    textAlign: "right",
    paddingRight: 20,
  },
});
