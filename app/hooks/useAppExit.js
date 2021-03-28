import { useContext } from "react";
import { Alert, BackHandler } from "react-native";
import { LanguageContext } from "../context/LanguageContext";

export default function useAppExit() {
  const { lang } = useContext(LanguageContext);

  // confirm Exit application
  const backAction = () => {
    Alert.alert(
      `${lang.languages.alerts.appExit.title[lang.current]}`,
      `${lang.languages.alerts.appExit.message[lang.current]}`,
      [
        {
          text: `${lang.languages.alerts.appExit.cancel[lang.current]}`,
          onPress: () => null,
          style: "cancel",
        },
        {
          text: `${lang.languages.alerts.appExit.yes[lang.current]}`,
          onPress: () => BackHandler.exitApp(),
        },
      ]
    );
    return true;
  };

  return { backAction };
}
