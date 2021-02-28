import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";

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
        nademi-tasklist
      </Text>
      <Text
        style={{
          paddingBottom: 10,
          fontWeight: "bold",
          fontSize: 15,
          color: "#888",
        }}
      >
        Version {Constants.nativeAppVersion}
      </Text>
      <TouchableOpacity
        onPress={async () => await Linking.openURL("https://nademi.com")}
      >
        <Text
          style={{
            paddingBottom: 10,
            fontWeight: "bold",
            fontSize: 12,
            color: "#999",
          }}
        >
          ©2021{" "}
          <Text style={{ color: "skyblue", fontSize: 14 }}>nademi.com</Text>
        </Text>
      </TouchableOpacity>
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
