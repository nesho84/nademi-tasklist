import React, { useContext } from "react";
import {
  createStackNavigator,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";

import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";

import LabelsScreen from "../screens/LabelsScreen";
import LabelDetailsScreen from "../screens/LabelDetails";
import AboutScreen from "../screens/AboutScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createStackNavigator();

export default function MainStackNavigator() {
  // Contexts
  const { languages, currentLanguage } = useContext(LanguageContext);
  const { themes, currentTheme } = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName="Labels"
      mode="modal"
      screenOptions={{
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
        name="Label-Details"
        component={LabelDetailsScreen}
        options={({ route }) => ({
          // title: route.params.label.title,
          title: "",
          headerTitleContainerStyle: { paddingVertical: 5 },
          headerStyle: {
            backgroundColor: themes.mainNavHeaderStyle.background[currentTheme],
          },
          gestureDirection: "horizontal",
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        })}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: languages.about[currentLanguage],
          headerStyle: {
            backgroundColor: themes.mainNavHeaderStyle.background[currentTheme],
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
          title: languages.settings[currentLanguage],
          headerStyle: {
            backgroundColor: themes.mainNavHeaderStyle.background[currentTheme],
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
