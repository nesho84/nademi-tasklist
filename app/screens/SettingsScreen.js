import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function SettingsScreen({ route, navigation }) {
  const { itemId, otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ paddingBottom: 10, fontWeight: "bold" }}>
        Details Screen
      </Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <View style={{ paddingTop: 20 }}>
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate("Home")}
        />
        {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
