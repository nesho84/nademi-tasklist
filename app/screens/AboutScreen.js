import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function AboutScreen({ route, navigation }) {
  const { itemId, otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        style={{
          paddingBottom: 10,
          fontWeight: "bold",
          fontSize: 25,
          color: "#777",
        }}
      >
        Simple Shopping List
      </Text>
      <Text
        style={{
          paddingBottom: 10,
          fontWeight: "bold",
          fontSize: 15,
          color: "#888",
        }}
      >
        Version 1.0.0
      </Text>
      <Text
        style={{
          paddingBottom: 10,
          fontWeight: "bold",
          fontSize: 12,
          color: "#999",
        }}
      >
        ©2021 nademi.com
      </Text>
      <View style={{ paddingTop: 20 }}>
        {/* <Button
          title="Go to Home"
          onPress={() => navigation.navigate("Home")}
        /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
