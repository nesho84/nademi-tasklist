import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Alert,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../config/colors";
// Custom Components
import AppScreen from "../components/AppScreen";
import AddText from "../components/AddText";
import AppList from "../components/AppList";
import AppModal from "../components/AppModal";
import AppPopup from "../components/AppPopup";

export default function HomeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState([]);

  const tasksKey = "@TaskList_Key";

  // Handling Add item function
  const handleAdd = (text) => {
    if (text.length < 3) {
      Alert.alert(
        "Required field",
        "Please insert at least 3 charachters...",
        [{ text: "OK" }],
        { cancelable: false }
      );
    } else {
      const newTask = [
        {
          key: Math.random().toString(),
          name: text,
          checked: false,
        },
        ...tasks,
      ];
      // First write the item to the storage
      writeToStorage(tasksKey, newTask);
      Keyboard.dismiss();
      setModalVisible(false);
      // Then set the new state
      setTasks(newTask);
    }
  };

  // Change item from the state and update the storage
  const handleChecked = (taskKey) => {
    // Update tasks array of objects using 'map' / toggle value 'checked'
    // Fitst method
    const updatedTasks = tasks.map((task) =>
      task.key === taskKey ? { ...task, checked: !task.checked } : task
    );
    // First write the item to the storage
    writeToStorage(tasksKey, updatedTasks);
    // Then set the new state
    setTasks(updatedTasks);
  };

  // Delete item from the state and update the storage
  const handleDelete = (taskKey) => {
    const filteredTasks = tasks.filter((task) => task.key !== taskKey);
    // First write the item to the storage
    writeToStorage(tasksKey, filteredTasks);
    // Then set the new state
    setTasks(filteredTasks);
  };

  // Write to the storage
  const writeToStorage = async (key, item) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(item));
    } catch (e) {
      console.log(e);
    }
  };

  // Read from storage
  const getAllTasks = async () => {
    try {
      const storageTasks = await AsyncStorage.getItem(tasksKey);
      // (TypeError: Invalid attempt to spread non-iterable instance.)
      storageTasks && setTasks(JSON.parse(storageTasks));
    } catch (e) {
      console.log(e);
    }
  };

  // Clear stoage or Remove all items from storage
  const clearAllTasks = async () => {
    try {
      await AsyncStorage.removeItem(tasksKey);
    } catch (e) {
      console.log(e);
    }
    // set state
    setTasks([]);
  };

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

  // Get all stored keys - for testing!!
  getAllKeys = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      console.log(e);
    }
    console.log(keys);
  };

  // Screen first renders
  useEffect(() => {
    // getAllKeys();
    getAllTasks();

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
    marginVertical: 10,
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  addButtonContainer: {
    width: "80%",
    paddingVertical: 2,
    alignItems: "center",
    backgroundColor: colors.successLight,
    marginTop: 15,
    marginBottom: 10,
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
