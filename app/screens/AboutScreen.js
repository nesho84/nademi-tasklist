import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Linking,
  Image,
  TouchableOpacity,
} from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function AboutScreen(props) {
  // Contexts
  const { themes, currentTheme } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themes.aboutScreen.container[currentTheme],
        },
      ]}
    >
      <Image style={styles.logo} source={require("../assets/nademi.png")} />
      <Text style={styles.title}>nademi-tasklist</Text>
      <Text style={styles.versionText}>Version 3.0.7</Text>
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
  },
  logo: {
    marginBottom: 10,
    width: 150,
    height: 150,
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
