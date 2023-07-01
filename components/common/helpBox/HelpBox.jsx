import React, { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet } from "react-native";
import { Image, Text, View } from "react-native";
import { colors, getFontStyles } from "../../../utils";
import { htmlChatBot } from "../../../utils/functions";
import imgBot from "../../../assets/images/components/helpBox/bot-info.png";
import WebView from "react-native-webview";

const HelpBox = () => {
  const [showBot, setShowBot] = useState(false);

  const getHelp = () => {
    console.log("ayuda");
    setShowBot(true);
  };

  useEffect(() => {}, []);

  return (
    <View>
      <Pressable onPress={() => getHelp()}>
        <View style={styles.contenBox}>
          <View style={styles.contenBoxImg}>
            <Image style={styles.image} source={imgBot} />
          </View>
          <View style={styles.contenBoxesDesc}>
            <Text style={styles.textTitle}>¿Necesitas ayuda?</Text>
            <Text style={styles.textDesc}>
              Déjame un mensaje con tus inquietudes.
            </Text>
          </View>
        </View>
      </Pressable>

      <View>
        {showBot && (
          <Modal animationType="slide" visible={showBot} transparent={true}>
            <WebView source={{ html: htmlChatBot }} style={{ flex: 1 }} />
          </Modal>
        )}
      </View>
    </View>
  );
};

export default HelpBox;

const styles = StyleSheet.create({
  contenBox: {
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 17,
    paddingVertical: 13,
    paddingHorizontal: 13,
    alignItems: "center",
    flexDirection: "row",
    display: "flex",
    marginBottom: 10,
  },
  contenBoxImg: {
    width: "35%",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: "contain",
  },
  contenBoxesDesc: {
    width: "65%",
  },
  textTitle: {
    ...getFontStyles(15, 0.9, 1.1),
    fontFamily: "Poppins-Bold",
    marginBottom: 0,
    color: colors.darkGray,
  },
  textDesc: {
    fontFamily: "Volks-Serial-Light",
    color: colors.darkGray,
    ...getFontStyles(12, 0.9, 1.2),
  },
});
