import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Keyboard } from "react-native";
import { v4 as uuidv4 } from "uuid";

export default useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

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
          key: uuidv4(),
          name: text,
          date: new Date(),
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
    setTasks(updatedTasks.sort((a, b) => a.checked - b.checked));
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

  // Clear stoage or Remove all items from storage
  const clearAllTasks = async () => {
    try {
      await AsyncStorage.removeItem(tasksKey);
      // set state
      setTasks([]);
    } catch (e) {
      console.log(e);
    }
  };

  // Read from storage
  const getAllTasks = async (key) => {
    try {
      const storageTasks = await AsyncStorage.getItem(key);
      // console.log(storageTasks);
      const sortedTasks = JSON.parse(storageTasks).sort(
        (a, b) => a.checked - b.checked
      );
      // (Fix TypeError: Invalid attempt to spread non-iterable instance)
      storageTasks && setTasks(sortedTasks);
    } catch (e) {
      console.log(e);
    }
  };

  // Screen first renders
  useEffect(() => {
    getAllTasks(tasksKey);
  }, []);

  return {
    tasks,
    modalVisible,
    setModalVisible,
    handleAdd,
    handleChecked,
    handleDelete,
    writeToStorage,
    getAllTasks,
    clearAllTasks,
  };
};
