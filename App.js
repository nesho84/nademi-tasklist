import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./app/navigation/DrawerNavigator";
// Custom Contexts
import LanguageContextProvider from "./app/context/LanguageContext";
import ThemeContextProvider from "./app/context/ThemeContext";
import TasksContextProvider from "./app/context/TasksContext";
import { AppDateTime } from "./app/components/AppDateTime";

export default function App() {
  return (
    // // testin datetime
    // <AppDateTime />

    // Context Providers -> DrawerNavigator -> MainNavigator
    <LanguageContextProvider>
      <ThemeContextProvider>
        <TasksContextProvider>
          <NavigationContainer>
            <DrawerNavigator />
          </NavigationContainer>
        </TasksContextProvider>
      </ThemeContextProvider>
    </LanguageContextProvider>
  );
}
