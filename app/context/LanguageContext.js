import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import languages from "../config/languages";

export const LanguageContext = createContext();

export default function LanguageContextProvider(props) {
  const [current, setCurrent] = useState("english");

  let languageKey = "@Language_Key";

  // Toggle language
  const changeLanguage = async (language) => {
    setCurrent(language);
    saveInStorage(language);
  };

  // Save in Storage
  const saveInStorage = async (newLanguage) => {
    try {
      await AsyncStorage.setItem(languageKey, JSON.stringify(newLanguage));
    } catch (err) {
      console.log(err);
    }
  };

  // Read from storage
  const loadLanguage = async () => {
    try {
      let storageLanguage = await AsyncStorage.getItem(languageKey);
      storageLanguage = JSON.parse(storageLanguage);

      if (storageLanguage !== null) {
        setCurrent(storageLanguage);
      } else {
        saveInStorage(current);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Clear language from the Storage
  const clearLanguage = async () => {
    try {
      await AsyncStorage.removeItem(languageKey);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      loadLanguage();
    }

    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        lang: { languages, current },
        changeLanguage,
      }}
    >
      {props.children}
    </LanguageContext.Provider>
  );
}
