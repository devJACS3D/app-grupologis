import {
  Feather,
  AntDesign,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { colors, heightPercentageToPx, widthPercentageToPx } from "../../utils";

import authContext from "../../context/auth/authContext";

const Footer = (props) => {
  const { userData } = useContext(authContext);
  const { role } = userData;
  const { navigation } = props;
  const [screen, setScreen] = useState("DownloadView");
  const tabsScreens = [
    {
      id: "downloads",
      icon: "download",
      screen: "DownloadView",
      show: true,
    },
    {
      id: "employesManager",
      icon: "users",
      screen: "EmployeeManagement",
      show: role === "business",
    },
    {
      id: "clientsInvoices",
      icon: "attach-money",
      screen: "ClientsInvoices",
      show: role === "business",
    },
    // {
    //   id: "news",
    //   icon: "calendar",
    //   screen: "NewsView",
    //   show: role === "employee",
    // },
    {
      id: "pqr",
      icon: "message-square",
      screen: "ClaimsView",
      show: true,
    },
    {
      id: "profile",
      icon: "user",
      screen: "ProfileView",
      show: true,
    },
    {
      id: "bot",
      icon: "customerservice",
      screen: "HelpBox",
      show: true,
    },
  ];

  const handleChangeScreen = (screen) => {
    setScreen(screen);
    navigation.navigate(screen);
  };
  return (
    <View style={styles.footerContainer}>
      {tabsScreens
        .filter((e) => e.show)
        .map((sc) => (
          <Pressable key={sc.id} onPress={() => handleChangeScreen(sc.screen)}>
            <View style={styles.navbarOption(screen === sc.screen)}>
              {sc.id == "clientsInvoices" ? (
                <MaterialIcons
                  name={sc.icon}
                  size={24}
                  color={screen === sc.screen ? "#1A68FC" : "#fff"}
                />
              ) : sc.id != "bot" ? (
                <Feather
                  name={sc.icon}
                  size={24}
                  color={screen === sc.screen ? "#1A68FC" : "#fff"}
                />
              ) : (
                <AntDesign
                  name={sc.icon}
                  size={24}
                  color={screen === sc.screen ? "#1A68FC" : colors.white}
                />
              )}
            </View>
          </Pressable>
        ))}
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footerContainer: {
    marginHorizontal: 20,
    position: "absolute",
    bottom:
      Platform.OS === "android"
        ? heightPercentageToPx(2)
        : heightPercentageToPx(3),
    width: widthPercentageToPx(90),
    height: 52,

    backgroundColor: "#1A68FC",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    borderRadius: 30,
  },
  navbarOption: (isSelected) => ({
    width: 45,
    height: 45,
    borderRadius: 40,
    backgroundColor: isSelected ? colors.white : "#1A68FC",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
});
