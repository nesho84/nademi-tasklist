import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function SettingsScreen({ route, navigation }) {
  // const { itemId, otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <MaterialIcons name="construction" size={94} color="black" />
      <Text style={styles.text}>UNDER {"\n"}CONSTRUCTION</Text>
      {/* <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text> */}
      <View style={{ paddingTop: 20 }}>
        {/* <Button title="Go back" onPress={() => navigation.navigate("Main")} /> */}
        {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    paddingVertical: 10,
    fontWeight: "bold",
    fontSize: 18,
    color: "#777",
    textAlign: "center",
  },
});
