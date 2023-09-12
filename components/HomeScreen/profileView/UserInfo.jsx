import { StyleSheet, Text, View, Image } from "react-native";
import React, { useContext } from "react";
import authContext from "../../../context/auth/authContext";
import imgEmp from "../../../assets/images/users/user-empresa.png";
import imgFem from "../../../assets/images/users/user-female.png";
import imgMal from "../../../assets/images/users/user-male.png";
import {
  colors,
  getFontStyles,
  heightPercentageToPx,
  images,
  widthPercentageToPx,
} from "../../../utils";

const UserInfo = (props) => {
  const { userData, navigation } = props;

  return (
    <View style={styles.userInfoContainer}>
      {userData.foto ? (
        <View>
          <Image
            style={styles.userImg}
            source={{
              uri: userData.foto,
            }}
          />
        </View>
      ) : (
        <View>
          {userData.type == "business" ? (
            <Image style={styles.userImg} source={imgEmp} />
          ) : userData.sexo === "M" ? (
            <Image style={styles.userImg} source={imgFem} />
          ) : (
            <Image style={styles.userImg} source={imgMal} />
          )}
        </View>
      )}
      <Text style={styles.nameText}>
        {userData.Nombre ?? userData.nom1_emp + " " + userData.ap1_emp}
      </Text>

      <Text style={styles.roleText}>
        {userData.type === "business" ? "Empresa" : "Empleado"}
      </Text>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  userInfoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    height: 88,
    width: 88,
  },
  nameText: {
    fontFamily: "Poppins-Bold",
    marginTop: 10,
    ...getFontStyles(17, 0.5, 0.9),
  },
  roleText: {
    fontFamily: "Volks-Serial-Light",
    color: colors.descriptionColors,
    ...getFontStyles(14, 0.5, 0.9),
  },

  userImg: {
    height: heightPercentageToPx(10),
    width: widthPercentageToPx(20),
    height: 85,
    width: 85,
    borderRadius: 50,
    backgroundColor: colors.purpleIcons,
  },
});
