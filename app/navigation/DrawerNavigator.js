import React, { useContext } from "react";
import { View, Image } from "react-native";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import MainStackNavigator from "./MainStackNavigator";
import useAppExit from "../hooks/useAppExit";
import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";

function CustomDrawerContent(props) {
  const { languages, currentLanguage } = useContext(LanguageContext);

  // Exit application custom Hook
  const { backAction } = useAppExit();

  return (
    <>
      {/* -----Navigation Header START----- */}
      <View
        style={{
          backgroundColor: colors.lightDodgerBlue,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: Constants.statusBarHeight,
          minHeight: 160,
          padding: 10,
        }}
      >
        <Image
          style={{ marginBottom: 10, width: 80, height: 80 }}
          source={require("../assets/nademi.png")}
        />
      </View>
      {/* -----Navigation Header END----- */}

      {/* -----Navigation Links START----- */}
      <DrawerContentScrollView
        contentContainerStyle={{
          paddingTop: 10,
        }}
        {...props}
      >
        <DrawerItemList {...props} />
        {/* About Screen */}
        <DrawerItem
          label={currentLanguage ? languages.about[currentLanguage] : "About"}
          // label="About"
          labelStyle={{
            color: colors.light,
            fontSize: 17,
            fontWeight: "600",
          }}
          icon={({ focused, color, size }) => (
            <MaterialCommunityIcons
              color={colors.light}
              type="material-community"
              size={size}
              name={focused ? "information" : "information-outline"}
            />
          )}
          onPress={() => props.navigation.navigate("About")}
        />
        {/* Setting Screen */}
        <DrawerItem
          label={
            currentLanguage ? languages.settings[currentLanguage] : "Settings"
          }
          labelStyle={{
            color: colors.light,
            fontSize: 17,
            fontWeight: "600",
          }}
          icon={({ focused, color, size }) => (
            <MaterialCommunityIcons
              color={colors.light}
              type="material-community"
              size={size}
              name={focused ? "information" : "information-outline"}
            />
          )}
          onPress={() => props.navigation.navigate("Settings")}
        />
        {/* Exit app Link */}
        <DrawerItem
          label={currentLanguage ? languages.exit[currentLanguage] : "Exit"}
          labelStyle={{ color: colors.light, fontSize: 17, fontWeight: "600" }}
          onPress={() => backAction()}
          icon={({ focused, color, size }) => (
            <MaterialCommunityIcons
              color={colors.light}
              type="material-community"
              size={size}
              name={"exit-to-app"}
            />
          )}
        />
      </DrawerContentScrollView>
      {/* -----Navigation Links END----- */}
    </>
  );
}

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { themes, currentTheme } = useContext(ThemeContext);

  return (
    // -----Drawer Screens (stack navigators)-----
    <Drawer.Navigator
      drawerContentOptions={{
        style: {
          backgroundColor:
            themes.drawerNavigator.drawerContentOptions[currentTheme],
        },
        labelStyle: { color: colors.light, fontSize: 17, fontWeight: "600" },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={MainStackNavigator}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              color={colors.light}
              type="material-community"
              size={size}
              name={"home-circle-outline"}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
