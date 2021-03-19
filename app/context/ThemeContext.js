import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import themes from "../config/themes";

export const ThemeContext = createContext();

export default function ThemeContextProvider(props) {
  const [currentTheme, setCurrentTheme] = useState("dark");

  let themeKey = "@Theme_Key";

  // Toggle theme
  const changeTheme = async () => {
    let theme = currentTheme;
    if (currentTheme === "dark") {
      theme = "light";
    } else {
      theme = "dark";
    }
    setCurrentTheme(theme);
    saveInStorage(theme);
  };

  // Save in Storage
  const saveInStorage = async (newTheme) => {
    try {
      await AsyncStorage.setItem(themeKey, JSON.stringify(newTheme));
    } catch (err) {
      console.log(err);
    }
  };

  // Read from storage
  const loadTheme = async () => {
    try {
      let storageTheme = await AsyncStorage.getItem(themeKey);
      storageTheme = JSON.parse(storageTheme);

      if (storageTheme !== null) {
        setCurrentTheme(storageTheme);
      } else {
        saveInStorage(currentTheme);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Clear theme from the Storage
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

    if (mounted) {
      loadTheme();
    }

    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ themes, currentTheme, changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
