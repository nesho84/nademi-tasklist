import { useEffect, useContext } from "react";
import { Alert, BackHandler } from "react-native";
import { LanguageContext } from "../context/LanguageContext";

export default function useAppExit() {
  const { languages, currentLanguage } = useContext(LanguageContext);

  // confirm Exit application
  const backAction = () => {
    Alert.alert(
      `${languages.alerts.appExit.title[currentLanguage]}`,
      `${languages.alerts.appExit.message[currentLanguage]}`,
      [
        {
          text: `${languages.alerts.appExit.cancel[currentLanguage]}`,
          onPress: () => null,
          style: "cancel",
        },
        {
          text: `${languages.alerts.appExit.yes[currentLanguage]}`,
          onPress: () => BackHandler.exitApp(),
        },
      ]
    );
    return true;
  };

  return { backAction };
}
