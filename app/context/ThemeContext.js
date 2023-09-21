import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import themes from "../config/themes";

export const ThemeContext = createContext();

export default function ThemeContextProvider(props) {
  const [current, setCurrent] = useState("dark");

  let themeKey = "@Theme_Key";

  // Toggle theme
  const changeTheme = async () => {
    let theme = current;
    if (current === "dark") {
      theme = "light";
    } else {
      theme = "dark";
    }
    setCurrent(theme);
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
        setCurrent(storageTheme);
      } else {
        saveInStorage(current);
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
    let mounted = true;

    if (mounted) {
      loadTheme();
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: { themes, current }, changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
