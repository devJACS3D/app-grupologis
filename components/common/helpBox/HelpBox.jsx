import React, { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet } from "react-native";
import { Image, Text, View } from "react-native";
import { colors, getFontStyles, heightPercentageToPx } from "../../../utils";
import { htmlChatBot } from "../../../utils/functions";
import imgBot from "../../../assets/images/components/helpBox/bot-info.png";
import WebView from "react-native-webview";
import Layout from "../../layout/Layout";
import CardEinfo from "../../HomeScreen/homeView/CardEinfo";
// import * as Zendesk from "react-native-zendesk-messaging";

const HelpBox = (props) => {
  const { navigation } = props;
  const [showBot, setShowBot] = useState(false);

  const getHelp = () => {
    console.log("ayuda");
    setShowBot(true);
  };

  // useEffect(() => {
  //   Zendesk.initialize({
  //     channelKey: "e1180f20-f981-4a7b-bbc7-6a42560dd999",
  //   })
  //     .then(() => console.log("success"))
  //     .catch((error) => console.error("failed", error));
  // }, []);

  return (
    <View>
      <Layout props={{ ...props }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contenBox}>
            <View style={styles.contenBoxChat}></View>
          </View>
        </ScrollView>
      </Layout>
      {/* <Pressable onPress={() => getHelp()}>
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
      </View> */}
    </View>
  );
};

export default HelpBox;

const styles = StyleSheet.create({
  contenBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  contenBoxChat: {
    width: "100%",
    backgroundColor: colors.red,
    height: heightPercentageToPx(50),
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
