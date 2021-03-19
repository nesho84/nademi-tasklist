import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Header, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import SimplePopupMenu from "react-native-simple-popup-menu";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";

export default function AppNavbar() {
  // Contexts
  const { themes, currentTheme } = useContext(ThemeContext);
  const { languages, currentLanguage } = useContext(LanguageContext);

  const navigation = useNavigation();

  return (
    <View>
      <Header
        leftComponent={
          <Icon
            name="menu"
            type="material-community"
            color="#fff"
            size={30}
            onPress={() => navigation.openDrawer()}
          />
        }
        centerComponent={{
          text: "SIMPLE TASKLIST",
          style: styles.title,
        }}
        rightComponent={
          <SimplePopupMenu
            items={[
              {
                screen: "Settings",
                label: languages.settings[currentLanguage],
                visible: true,
              },
            ]}
            onSelect={(item) =>
              // navigation.navigate(item.screen, { itemId: item.screen })
              navigation.navigate(item.screen)
            }
            onCancel={() => {}}
          >
            <MaterialCommunityIcons
              name="dots-vertical"
              type="material-community"
              color="#fff"
              size={30}
              style={{ marginRight: -5 }}
            />
          </SimplePopupMenu>
        }
        containerStyle={{
          backgroundColor: themes.appNavbar.header[currentTheme],
          borderBottomColor: "#616161",
          borderBottomWidth: 1,
          elevation: 10,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
});
