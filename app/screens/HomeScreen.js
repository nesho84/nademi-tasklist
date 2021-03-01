import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
// Custom colos Object
import colors from "../config/colors";
// Custom Hook
import useTasks from "../hooks/useTasks";
// Custom Components
import AppScreen from "../components/AppScreen";
import AddText from "../components/AddText";
import AppList from "../components/AppList";
import AppModal from "../components/AppModal";
import AppPopup from "../components/AppPopup";

export default function HomeScreen({ navigation }) {
  // Custom Hook returned functions
  const {
    tasks,
    modalVisible,
    setModalVisible,
    handleAdd,
    handleChecked,
    handleDelete,
    clearAllTasks,
  } = useTasks();

  // confirm Exit application
  const exitApp = () => {
    Alert.alert("Hold on!", "Are you sure you want to go exit?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  // Screen first renders
  useEffect(() => {
    // Exit app Handler
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      exitApp
    );
    return () => backHandler.remove();
  }, []);

  // Trick to show Keyboard on input focus
  const inputRef = React.useRef();

  return (
    <AppScreen>
      <View style={styles.container}>
        <Image style={styles.logo} source={require("../assets/nademi.png")} />
        <Text style={styles.title}>Simple TaskList</Text>

        <AppPopup
          navigation={navigation}
          clearAllTasks={clearAllTasks}
          exitApp={exitApp}
          itemsList={tasks}
        />

        <TouchableOpacity
          style={styles.addButtonContainer}
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.addButton}>
            <MaterialIcons name="add-circle" size={45} color="white" />
          </View>
        </TouchableOpacity>

        <AppList
          items={tasks}
          handleChecked={handleChecked}
          handleDelete={handleDelete}
        />

        <AppModal
          modalVisible={modalVisible}
          handleModalVisible={setModalVisible}
          inputRef={inputRef}
        >
          <AddText handleAdd={handleAdd} inputRef={inputRef} />
          <TouchableOpacity
            style={styles.cancelModalButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.cancelModalButtonText}>CANCEL</Text>
          </TouchableOpacity>
        </AppModal>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "dodgerblue",
    paddingVertical: StatusBar.currentHeight || 0,
  },
  logo: { marginTop: 50 },
  title: {
    marginTop: 10,
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  addButtonContainer: {
    width: "80%",
    paddingVertical: 2,
    alignItems: "center",
    backgroundColor: colors.successLight,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
  },
  cancelModalButton: {
    width: "80%",
    backgroundColor: colors.danger,
    padding: 11,
    marginVertical: 8,
  },
  cancelModalButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
});
