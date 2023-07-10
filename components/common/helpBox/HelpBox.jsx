import React, { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet } from "react-native";
import { Image, Text, View } from "react-native";
import {
  colors,
  getFontStyles,
  heightPercentageToPx,
  widthPercentageToPx,
} from "../../../utils";
import { htmlChatBot } from "../../../utils/functions";
import imgBot from "../../../assets/images/components/helpBox/bot-info.png";
import WebView from "react-native-webview";
import Layout from "../../layout/Layout";
import CardEinfo from "../../HomeScreen/homeView/CardEinfo";
import ZendeskChat from "../../../utils/Zendesk";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as Zendesk from "react-native-zendesk-messaging";
import SvgVisualize from "../../../assets/images/components/helpBox/SvgVisualize";

const HelpBox = (props) => {
  const { navigation } = props;
  const [isShowChat, setIsShowChat] = useState(false);
  const [infoUs, setInfoUs] = useState(null);

  const getInfoUser = async () => {
    let infoLog = await AsyncStorage.getItem("logged");
    infoLog = JSON.parse(infoLog);
    const info = {
      name: infoLog.Nombre != undefined ? infoLog.Nombre : infoLog.nom1_emp,
      email: infoLog.Correo,
      phone: infoLog.Telefono,
    };
    setInfoUs(info);
    setIsShowChat(true);
  };

  useFocusEffect(
    React.useCallback(() => {
      getInfoUser();
      return () => {
        setIsShowChat(false);
      };
    }, [])
  );

  return (
    <Layout props={{ ...props }}>
      <View style={styles.contenBox}>
        {isShowChat && (
          <View style={{ flex: 1 }}>
            <ZendeskChat user={infoUs} title="text2" />
          </View>
        )}
      </View>
    </Layout>
  );
};

export default HelpBox;

const styles = StyleSheet.create({
  contenBox: {
    width: widthPercentageToPx(90),
    height: heightPercentageToPx(75),
  },
});
