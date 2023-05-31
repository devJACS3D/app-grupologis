import React, { Pressable, StyleSheet, View } from "react-native";
import { colors } from "../../../utils";
import CardElement from "../newsView/components/CardElement";
import { AntDesign } from "@expo/vector-icons";

const ItemDesc = (props) => {
  const { infoItm, infoDesc } = props;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.topContent}>
        <View style={{ flex: 1 }}>
          <CardElement head={"Nombre"} content={infoItm.NombreDocumento} />
        </View>
        <View style={{ width: "10%", top: 10 }}>
          <Pressable onPress={() => infoDesc(infoItm)}>
            <View style={styles.actionButton("ghost")}>
              <AntDesign name="download" size={18} color={colors.darkGray} />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ItemDesc;
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.white,
    borderRadius: 17,
    marginBottom: 5,
    padding: 15,
  },
  topContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  actionButton: (type) => ({
    width: 36,
    height: 36,
    borderColor: type === "ghost" ? "#DBDBDB" : null,
    borderWidth: type === "ghost" ? 2 : 0,
    backgroundColor:
      type === "ghost" ? colors.white : colors.mainBackgroundColor,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
  }),
});
