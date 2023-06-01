import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { colors } from "../../../../utils";

const StepIdent = ({ formData, onComplete }) => {
  const [identification, setIdentification] = useState(null);

  const handlePress = () => {
    onComplete({ stepIdentData: identification });
  };

  const handleIdentificationChange = (text) => {
    const parsedText = parseInt(text, 10);
    if (isNaN(parsedText)) {
      setIdentification(0);
    } else {
      setIdentification(parsedText);
      //   onComplete({ stepIdentData: parsedText });
    }
  };

  //   useEffect(() => {
  //     // if (identification !== null) {
  //     //   onComplete({ stepIdentData: identification });
  //     // }
  //   }, [identification, onComplete]);

  return (
    <View>
      <TextInput
        keyboardType="numeric"
        placeholder="Número de Identificación"
        style={styles.input}
        onChangeText={handleIdentificationChange}
        value={identification === null ? "" : identification.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.mainBackgroundColor,
    height: 50,
    paddingLeft: 20,
    marginBottom: 10,
    borderRadius: 10,
    width: "100%",
    fontFamily: "Volks-Serial-Medium",
    fontSize: 16,
    fontWeight: "normal",
  },
});

export default StepIdent;
