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
// import * as Zendesk from "react-native-zendesk-messaging";

const HelpBox = (props) => {
  const { navigation } = props;

  return (
    <Layout props={{ ...props }}>
      <View style={styles.contenBox}>
        <ZendeskChat />
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
