import React, { useContext } from "react";
import {
  createStackNavigator,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";

import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";

import LabelsScreen from "../screens/LabelsScreen";
import LabelDetailsScreen from "../screens/LabelDetailsScreen";
import AboutScreen from "../screens/AboutScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createStackNavigator();

export default function MainStackNavigator() {
  const { lang } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName="Labels"
      screenOptions={{
        presentation: "modal",
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="Labels"
        component={LabelsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LabelDetails"
        component={LabelDetailsScreen}
        options={({ route }) => ({
          // title: route.params.label.title,
          title: "",
          headerTitleContainerStyle: { paddingVertical: 5 },
          headerStyle: {
            backgroundColor:
              theme.themes.mainNavHeaderStyle.background[theme.current],
          },
          gestureDirection: "horizontal",
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        })}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: lang.languages.about[lang.current],
          headerStyle: {
            backgroundColor:
              theme.themes.mainNavHeaderStyle.background[theme.current],
            borderBottomColor: "#616161",
            borderBottomWidth: 1,
            elevation: 10,
          },
          gestureDirection: "horizontal",
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: lang.languages.settings[lang.current],
          headerStyle: {
            backgroundColor:
              theme.themes.mainNavHeaderStyle.background[theme.current],
            borderBottomColor: "#616161",
            borderBottomWidth: 1,
            elevation: 10,
          },
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        }}
      />
    </Stack.Navigator>
  );
}