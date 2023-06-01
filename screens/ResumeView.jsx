import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import CardEinfo from "../components/HomeScreen/homeView/CardEinfo";
import ResumeList from "../components/HomeScreen/resumeView/ResumeList";
import Layout from "../components/layout/Layout";
import { heightPercentageToPx, widthPercentageToPx } from "../utils";
import { useFocusEffect } from "@react-navigation/native";
import { cancelarSolicitudesApi } from "../utils/axiosInstance";

const ResumeView = (props) => {
  const { navigation } = props;
  const [identif, setIdentif] = useState("");
  const [sendIdent, setSendIdent] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      handleInputChange("");
      return () => {
        cancelarSolicitudesApi();
      };
    }, [])
  );

  const handleInputChange = (text) => {
    setIdentif(text);
    if (text == "") {
      sendInputChange(text);
    }
  };

  const sendInputChange = (text) => {
    setSendIdent(text);
  };

  return (
    <Layout props={{ ...props }}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <CardEinfo
          title={"Hojas de vida"}
          buttonText="Buscar"
          showButton={true}
          showInput={true}
          onPressAction={() => sendInputChange(identif)}
          handleGoBack={() => navigation.navigate("EmployeeManagement")}
          onInputChange={handleInputChange}
        />
        <ResumeList idenHoja={sendIdent} />
      </ScrollView>
    </Layout>
  );
};

export default ResumeView;

const styles = StyleSheet.create({
  generalView: {
    height: heightPercentageToPx(100),
    width: widthPercentageToPx(100),
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
