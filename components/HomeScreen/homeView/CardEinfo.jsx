import { Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import {
  colors,
  heightPercentageToPx,
  widthPercentageToPx,
} from "../../../utils";

const CardEinfo = ({
  title,
  inputText = "",
  buttonText,
  buttonIcon,
  onPressAction,
  handleGoBack,
  showInput,
  showButton,
  onInputChange,
}) => {
  const [identif, setIdentif] = useState("");
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (isPressed) {
        setIsPressed(false);
      }
    }, 2000);
  }, [isPressed]);

  return (
    <View style={styles.cardContainer}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Pressable onPress={handleGoBack}>
          <View style={styles.goBackButton}>
            <Entypo name="chevron-left" size={24} color={colors.purpleIcons} />
          </View>
        </Pressable>
        <Text style={styles.titleText}>{title}</Text>
        {showButton ? (
          <Pressable
            onPress={() => {
              setIsPressed(true);
              onPressAction();
            }}
            style={styles.buttonCont}
          >
            <View style={styles.newButton(isPressed)}>
              {buttonIcon && (
                <Entypo name={buttonIcon} size={24} color={colors.white} />
              )}
              {buttonText && (
                <Text style={styles.buttonText}>{buttonText}</Text>
              )}
            </View>
          </Pressable>
        ) : null}
      </View>
      {showInput ? (
        <TextInput
          style={styles.titleContainer}
          placeholder={
            inputText != "" ? inputText : "Ingresa la identificación"
          }
          placeholderTextColor="#999999"
          value={identif}
          onChangeText={(text) => {
            setIdentif(text);
            onInputChange(text); // Llama a la función onInputChange con el nuevo valor del input
          }}
        />
      ) : null}
    </View>
  );
};

export default CardEinfo;

const styles = StyleSheet.create({
  cardContainer: {
    width: widthPercentageToPx(90),
    padding: 13,
    backgroundColor: colors.white,
    borderRadius: 12,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 10,
    fontSize: 18,
  },
  titleText: {
    color: colors.black,
    textTransform: "uppercase",
    fontFamily: "Poppins-Bold",
    marginLeft: widthPercentageToPx(5),
  },
  buttonCont: {
    marginLeft: "auto",
  },
  newButton: (press) => ({
    borderRadius: 8,
    backgroundColor: press ? colors.gray : colors.yellow,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    width: 80,
  }),
  buttonText: {
    color: colors.white,
    fontFamily: "Poppins-Regular",
  },
  titleContainer: {
    backgroundColor: colors.mainBackgroundColor,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    fontFamily: "Poppins-Regular",
    height: 50,
    borderRadius: 10,
    padding: 15,
    marginTop: heightPercentageToPx(1),
  },
  goBackButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lightGray,
    borderRadius: 15,
    height: 30,
    width: 30,
  },
});
