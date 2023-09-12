import React, { useContext } from "react";
import { View, Image, Text, Linking, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
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
  const { lang } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);

  // Exit application custom Hook
  const { backAction } = useAppExit();

  return (
    <View style={{
      flex: 1,
      backgroundColor:
        theme.themes.drawerNavigator.drawerContentOptions[theme.current],
    }}>
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
          label={lang.current ? lang.languages.about[lang.current] : "About"}
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
            lang.current ? lang.languages.settings[lang.current] : "Settings"
          }
          labelStyle={{
            color: colors.light,
            fontSize: 17,
            fontWeight: "600",
          }}
          icon={({ focused, color, size }) => (
            <Ionicons
              color={colors.light}
              type="Ionicons"
              size={size}
              name={focused ? "settings" : "settings-outline"}
            />
          )}
          onPress={() => props.navigation.navigate("Settings")}
        />
        {/* Exit app Link */}
        <DrawerItem
          label={lang.current ? lang.languages.exit[lang.current] : "Exit"}
          labelStyle={{
            color: colors.light,
            fontSize: 17,
            fontWeight: "600",
          }}
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

      {/* Footer */}
      <View
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
          paddingVertical: 7,
          borderColor: colors.muted,
          borderTopWidth: 1,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={async () => await Linking.openURL("https://nademi.com")}
          >
            <Text style={{ color: colors.muted, fontSize: 15 }}>
              www.nademi.com
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { theme } = useContext(ThemeContext);

  return (
    // -----Drawer Screens (stack navigators)-----
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={MainStackNavigator}
        options={{
          drawerLabelStyle: { color: colors.light, fontSize: 17, fontWeight: "600" },
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
