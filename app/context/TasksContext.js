import React, { createContext, useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";

export const TasksContext = createContext();

export default function TasksContextProvider(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [labels, setLabels] = useState(null);

  // Show Keyboard on TextInput focus
  const inputRef = useRef();

  const storageKey = "@TaskList_Key";

  // Add Label
  const addLabel = (text, color) => {
    const newLabel = [
      {
        key: uuidv4(),
        title: text,
        color: color,
        category: "",
        tasks: [],
      },
      ...labels,
    ];

    // Update Storage
    writeToStorage(storageKey, newLabel);
    // Then set the new state
    setLabels(newLabel);
  };

  // Add Task
  const addTask = (labelKey, taskName) => {
    let newTask = {
      key: uuidv4(),
      name: taskName,
      date: new Date(),
      checked: false,
    };

    const updatedLabel = labels.map((label) =>
      label.key === labelKey
        ? { ...label, tasks: [newTask, ...label.tasks] }
        : label
    );
    // Update Storage
    writeToStorage(storageKey, updatedLabel);
    // Then set the new state
    setLabels(updatedLabel);
  };

  // Edit Task
  const editTask = (taskKey, input) => {
    // const updatedLabels = [];
    // for (let label of labels) {
    //   for (let task of label.tasks) {
    //     if (taskKey === task.key) {
    //       task.name = input;
    //     }
    //   }
    //   updatedLabels.push(label);
    // }
    const updatedLabels = labels.map((label) => {
      label.tasks.map((task) => task.key === taskKey && (task.name = input));
      return label;
    });

    // Update Storage
    writeToStorage(storageKey, updatedLabels);
    // Then set the new state
    setLabels(updatedLabels);
  };

  // Edit label
  const editLabel = (labelKey, input, color) => {
    const updatedLabel = labels.map((label) =>
      label.key === labelKey ? { ...label, title: input, color: color } : label
    );
    // Update Storage
    writeToStorage(storageKey, updatedLabel);
    // Then set the new state
    setLabels(updatedLabel);
  };

  // Delete a single Label from the Storage
  const deleteLabel = (labelKey) => {
    const updatedLabels = labels.filter((label) => label.key !== labelKey);

    // Update Storage
    writeToStorage(storageKey, updatedLabels);
    // Then set the new state
    setLabels(updatedLabels);
  };

  // Delete a single task from the Storage
  const deleteTask = (taskKey) => {
    // const updatedLabels = [];
    // for (let label of labels) {
    //   label.tasks = label.tasks.filter((task) => taskKey !== task.key);
    //   updatedLabels.push(label);
    // }

    let updatedLabels = labels.map((lab) => {
      lab.tasks = lab.tasks.filter((task) => taskKey !== task.key);
      return lab;
    });
    // Update Storage
    writeToStorage(storageKey, updatedLabels);
    // Then set the new state
    setLabels(updatedLabels);
  };

  // Change to checked or unchecked
  const checkUncheckTask = (taskKey) => {
    let updatedLabels = labels.map((lab) => {
      lab.tasks.map(
        (task) => taskKey === task.key && (task.checked = !task.checked)
      );
      return lab;
    });

    // Update Storage
    writeToStorage(storageKey, updatedLabels);
    // Then set the new state
    setLabels(updatedLabels);
  };

  // Ordering Labels with drag and drop
  const orderLabels = (orderedTasks) => {
    // Update Storage
    writeToStorage(storageKey, orderedTasks);
    // Then set the new state
    setLabels(orderedTasks);
  };

  // Ordering Tasks with drag and drop
  const orderTasks = (labelKey, orderedTasks) => {
    const updatedLabel = [];

    for (let label of labels) {
      if (labelKey === label.key) {
        // Filter uncheched
        let unCheckedTasks = label.tasks.filter(
          (task) => task.checked === false
        );
        // Filter checked
        let checkedTasks = label.tasks.filter((task) => task.checked === true);

        orderedTasks.map((task) => {
          // If the order of unchecked tasks was changed
          if (task.checked === false) {
            label.tasks = [...orderedTasks, ...checkedTasks];
          }
          // If the order of checked tasks was changed
          else if (task.checked === true) {
            label.tasks = [...orderedTasks, ...unCheckedTasks];
          }
        });
      }
      updatedLabel.push(label);
    }
    // Update Storage
    writeToStorage(storageKey, updatedLabel);
    // Then set the new state
    setLabels(updatedLabel);
  };

  // Write to the storage
  const writeToStorage = async (key, item) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(item));
    } catch (err) {
      alert(err);
    }
  };

  // Clear stoage or Remove all items from storage
  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem(storageKey);
      // set state
      setLabels(null);
    } catch (err) {
      alert(err);
    }
  };

  // Get Labels from Storage
  const loadLabels = async () => {
    try {
      let storageTasks = await AsyncStorage.getItem(storageKey);
      storageTasks = JSON.parse(storageTasks);

      if (storageTasks !== null) {
        setLabels(storageTasks);
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    // addLabel(1);

    let mounted = true;

    if (mounted) {
      loadLabels().then(() => {
        // Timeout for loading...
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
    }

    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (
    <TasksContext.Provider
      value={{
        isLoading,
        inputRef,
        labels,
        addLabel,
        editLabel,
        deleteLabel,
        orderLabels,
        addTask,
        editTask,
        deleteTask,
        checkUncheckTask,
        orderTasks,
        clearStorage,
      }}
    >
      {props.children}
    </TasksContext.Provider>
  );
}
