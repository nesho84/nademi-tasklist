import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";

export default function AboutScreen(params) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>nademi-tasklist</Text>
      <Text style={styles.versionText}>
        Version {Constants.nativeAppVersion}
      </Text>
      <TouchableOpacity
        onPress={async () => await Linking.openURL("https://nademi.com")}
      >
        <Text style={styles.yearText}>
          ©2021 <Text style={styles.link}>nademi.com</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    paddingBottom: 10,
    fontWeight: "bold",
    fontSize: 25,
    color: "#777",
  },
  versionText: {
    paddingBottom: 10,
    fontWeight: "bold",
    fontSize: 15,
    color: "#888",
  },
  yearText: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#999",
  },
  link: {
    color: "skyblue",
    fontSize: 14,
  },
});
