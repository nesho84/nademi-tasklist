import React, { createContext, useState, useEffect } from "react";
import colors from "../config/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext();

const themes = {
  light: {
    foreground: colors.light,
    background: "dodgerblue",
  },
  dark: {
    foreground: colors.dark,
    background: colors.dark,
  },
};

export default function ThemeContextProvider(props) {
  const [isLightTheme, setIsLightTheme] = useState(true);

  // @TODO: save theme in storage and load with useEffect
  let themeKey = "@Theme_Key";

  // Toggle theme
  const toggleTheme = () => {
    setIsLightTheme(!isLightTheme);
    saveInStorage(!isLightTheme);
  };

  // Save in Storage
  const saveInStorage = async (newIsLightTheme) => {
    try {
      await AsyncStorage.setItem(themeKey, JSON.stringify(newIsLightTheme));
    } catch (err) {
      console.log(err);
    }
  };

  // Read from storage
  const loadTheme = async () => {
    try {
      let storageisLightTheme = await AsyncStorage.getItem(themeKey);
      storageisLightTheme = JSON.parse(storageisLightTheme);

      if (storageisLightTheme !== null) {
        setIsLightTheme(storageisLightTheme);
      } else {
        saveInStorage(isLightTheme);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Clear stoage or Remove all items from storage
  const clearTheme = async () => {
    try {
      await AsyncStorage.removeItem(themeKey);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // clearTheme();

    let mounted = true;

    loadTheme();

    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ isLightTheme, themes, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
