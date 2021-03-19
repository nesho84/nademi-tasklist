import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, Button, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import colors from "../config/colors";
import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";
import { TasksContext } from "../context/TasksContext";

export default function SettingsScreen(props) {
  // Contexts
  const { labels, clearStorage } = useContext(TasksContext);
  const { themes, currentTheme, changeTheme } = useContext(ThemeContext);
  const { languages, currentLanguage, changeLanguage } = useContext(
    LanguageContext
  );

  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  const handleLanguage = (lang) => {
    setSelectedLanguage(lang);
    changeLanguage(lang);
  };

  const handleDeleteAll = () => {
    if (labels === null) {
      Alert.alert(
        "",
        `${languages.alerts.deleteAll.nothingToDelete[currentLanguage]}`,
        [
          {
            text: "OK",
            onPress: () => {},
          },
        ],
        { cancelable: false }
      );
      return;
    } else {
      Alert.alert(
        `${languages.alerts.deleteAll.title[currentLanguage]}`,
        `${languages.alerts.deleteAll.message[currentLanguage]}`,
        [
          {
            text: `${languages.alerts.yes[currentLanguage]}`,
            onPress: () => clearStorage(),
          },
          {
            text: `${languages.alerts.no[currentLanguage]}`,
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themes.settingsScreen.container[currentTheme],
        },
      ]}
    >
      <View
        style={[
          styles.menu,
          {
            borderColor: themes.settingsScreen.menuBorder[currentTheme],
            borderBottomWidth: 1,
          },
        ]}
      >
        {/* Theme */}
        <Text style={styles.title}>
          {languages.settings.displayOptions[currentLanguage]}
        </Text>
        <View style={styles.actionContainer}>
          <Text style={styles.action}>Theme</Text>
          <MaterialCommunityIcons
            color={themes.settingsScreen.switchColor[currentTheme]}
            type="FontAwesome5"
            size={40}
            name={
              currentTheme === "light" ? "toggle-switch-off" : "toggle-switch"
            }
            onPress={changeTheme}
          />
        </View>
      </View>

      {/* Language */}
      <View
        style={[
          styles.menu,
          {
            borderColor: themes.settingsScreen.menuBorder[currentTheme],
            borderBottomWidth: 1,
          },
        ]}
      >
        <Text style={styles.title}>{languages.language[currentLanguage]}</Text>
        <Picker
          style={styles.languagePicker}
          dropdownIconColor={colors.muted}
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) => handleLanguage(itemValue)}
        >
          <Picker.Item label="English" value="english" />
          <Picker.Item label="Deutsch" value="deutsch" />
          <Picker.Item label="Shqip" value="shqip" />
        </Picker>
      </View>

      {/* TASKS Delete */}
      <View style={styles.menu}>
        <Text style={styles.title}>
          {languages.settings.tasks[currentLanguage]}
        </Text>
        <View style={styles.actionContainer}>
          <Text style={styles.action}>
            {languages.settings.clearStorage[currentLanguage]}
          </Text>
          <View style={styles.deleteButton}>
            <Button
              color={colors.danger}
              title={languages.settings.deleteButton[currentLanguage]}
              onPress={handleDeleteAll}
            ></Button>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 16,
  },
  menu: {
    paddingBottom: 15,
    marginBottom: 15,
  },
  title: {
    fontSize: 15,
    color: colors.lightDodgerBlue,
    paddingBottom: 10,
  },
  actionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  action: {
    fontSize: 17,
    color: colors.muted,
  },
  languagePicker: {
    color: colors.muted,
    marginLeft: -8,
  },
  deleteButton: {
    backgroundColor: colors.danger,
    fontSize: 10,
  },
});
