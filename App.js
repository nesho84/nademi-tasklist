import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./app/navigation/DrawerNavigator";
// Custom Contexts
import LanguageContextProvider from "./app/context/LanguageContext";
import ThemeContextProvider from "./app/context/ThemeContext";
import TasksContextProvider from "./app/context/TasksContext";

export default function App() {
  return (
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
