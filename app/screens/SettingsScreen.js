import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, Button, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import colors from "../config/colors";
import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";
import { TasksContext } from "../context/TasksContext";

export default function SettingsScreen(props) {
  const { labels, clearStorage } = useContext(TasksContext);
  const { theme, changeTheme } = useContext(ThemeContext);
  const { lang, changeLanguage } = useContext(LanguageContext);

  const [selectedLanguage, setSelectedLanguage] = useState(lang.current);

  const handleLanguage = (lang) => {
    setSelectedLanguage(lang);
    changeLanguage(lang);
  };

  const handleDeleteAll = () => {
    if (labels === null) {
      Alert.alert(
        "",
        `${lang.languages.alerts.deleteAll.nothingToDelete[lang.current]}`,
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
        `${lang.languages.alerts.deleteAll.title[lang.current]}`,
        `${lang.languages.alerts.deleteAll.message[lang.current]}`,
        [
          {
            text: `${lang.languages.alerts.yes[lang.current]}`,
            onPress: () => {
              clearStorage();
              props.navigation.goBack();
            },
          },
          {
            text: `${lang.languages.alerts.no[lang.current]}`,
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
          backgroundColor: theme.themes.settingsScreen.container[theme.current],
        },
      ]}
    >
      <View
        style={[
          styles.menu,
          {
            borderColor: theme.themes.settingsScreen.menuBorder[theme.current],
            borderBottomWidth: 1,
          },
        ]}
      >
        {/* Theme */}
        <Text style={styles.title}>
          {lang.current
            ? lang.languages.settings.displayOptions[lang.current]
            : "DISPLAY OPTIONS"}
        </Text>
        <View style={styles.actionContainer}>
          <Text style={styles.action}>Theme</Text>
          <MaterialCommunityIcons
            color={theme.themes.settingsScreen.switchColor[theme.current]}
            type="FontAwesome5"
            size={40}
            name={
              theme.current === "light" ? "toggle-switch-off" : "toggle-switch"
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
            borderColor: theme.themes.settingsScreen.menuBorder[theme.current],
            borderBottomWidth: 1,
          },
        ]}
      >
        <Text style={styles.title}>
          {lang.current
            ? lang.languages.settings.language[lang.current]
            : "LANGUAGE"}
        </Text>
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
          {lang.current ? lang.languages.settings.tasks[lang.current] : "TASKS"}
        </Text>
        <View style={styles.actionContainer}>
          <Text style={styles.action}>
            {lang.current
              ? lang.languages.settings.clearStorage[lang.current]
              : "Clear Storage"}
          </Text>
          <View style={styles.deleteButton}>
            <Button
              color={colors.danger}
              title={
                lang.current
                  ? lang.languages.settings.deleteButton[lang.current]
                  : "DELETE"
              }
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
