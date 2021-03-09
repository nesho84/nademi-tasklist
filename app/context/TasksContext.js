import React, { createContext, useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { v4 as uuidv4 } from "uuid";

export const TasksContext = createContext();

export default function TasksContextProvider(props) {
  const [loading, setloading] = useState(true);
  const [tasks, setTasks] = useState([]);

  // Trick to show Keyboard on input focus
  const inputRef = useRef();

  const tasksKey = "@TaskList_Key";

  // Handling Add item function
  const addTask = (text) => {
    if (text.length < 3) {
      Alert.alert(
        "Required field",
        "Please insert at least 3 charachters.",
        [{ text: "OK" }],
        { cancelable: false }
      );
      return false;
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

      // Update Storage
      writeToStorage(tasksKey, newTask);
      // Then set the new state
      setTasks(newTask);

      return true;
    }
  };

  // Edit item from the state and update the storage
  const editTask = (taskKey, taskName) => {
    if (taskName.length < 3) {
      Alert.alert(
        "Required field",
        "Please insert at least 3 charachters.",
        [{ text: "OK" }],
        { cancelable: false }
      );
      return false;
    } else {
      // Update tasks array of objects using 'map' / edit name
      let updatedTasks = tasks.map((task) =>
        task.key === taskKey ? { ...task, name: taskName } : task
      );
      // Update Storage
      writeToStorage(tasksKey, updatedTasks);
      // Then set the new state
      setTasks(updatedTasks);

      return true;
    }
  };

  // Change to checked or unchecked item from the state and update the storage
  const checkUncheckTask = (taskKey) => {
    // Update tasks array of objects using 'map' / toggle value 'checked'
    let updatedTasks = tasks.map((task) =>
      task.key === taskKey ? { ...task, checked: !task.checked } : task
    );
    // Update Storage
    writeToStorage(tasksKey, updatedTasks);
    // Then set the new state
    setTasks(updatedTasks);
  };

  // Ordering Tasks with drag and drop
  const orderTasks = (orderedTasks) => {
    let unCheckedTasks = tasks.filter((task) => task.checked === false);
    let checkedTasks = tasks.filter((task) => task.checked === true);

    orderedTasks.map((task) => {
      // If the order of unchecked tasks was changed
      if (task.checked === false) {
        // Update Storage
        writeToStorage(tasksKey, [...orderedTasks, ...checkedTasks]);
        // Then set the new state
        setTasks([...orderedTasks, ...checkedTasks]);
      }
      // If the order of checked tasks was changed
      else if (task.checked === true) {
        // Update Storage
        writeToStorage(tasksKey, [...orderedTasks, ...unCheckedTasks]);
        // Then set the new state
        setTasks([...orderedTasks, ...unCheckedTasks]);
      }
    });
  };

  // Delete item from the state and update the storage
  const deleteTask = (taskKey) => {
    const filteredTasks = tasks.filter((task) => task.key !== taskKey);
    // Update Storage
    writeToStorage(tasksKey, filteredTasks);
    // Then set the new state
    setTasks(filteredTasks);
  };

  // Write to the storage
  const writeToStorage = async (key, item) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(item));
    } catch (err) {
      console.log(err);
    }
  };

  // Clear stoage or Remove all items from storage
  const clearAllTasks = async () => {
    try {
      await AsyncStorage.removeItem(tasksKey);
      // set state
      setTasks([]);
    } catch (err) {
      console.log(err);
    }
  };

  // Read from storage
  const loadTasks = async () => {
    try {
      let storageTasks = await AsyncStorage.getItem(tasksKey);
      storageTasks = JSON.parse(storageTasks);

      if (storageTasks !== null) {
        setTasks(storageTasks);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let mounted = true;

    loadTasks().then(() => {
      if (mounted) {
        setloading(false);
      }
    });

    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (
    <TasksContext.Provider
      value={{
        loading,
        tasks,
        inputRef,
        addTask,
        editTask,
        checkUncheckTask,
        orderTasks,
        deleteTask,
        clearAllTasks,
      }}
    >
      {props.children}
    </TasksContext.Provider>
  );
}
