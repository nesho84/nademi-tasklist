import React, { createContext, useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import useNotifications from "../hooks/useNotifications";

import tempLabels from "../../tempData";

export const TasksContext = createContext();

export default function TasksContextProvider(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [labels, setLabels] = useState([]);

  // Notifications Hook
  const { scheduleNotification, cancelScheduledNotification } = useNotifications();

  // Show Keyboard on TextInput focus
  const inputRef = useRef();

  let storageKey = "@TaskList_Key";

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
    saveInStorage(newLabel);
    // Then set the new state
    setLabels(newLabel);
  };

  // Add Task
  const addTask = (labelKey, taskInput) => {
    let newTask = {
      key: uuidv4(),
      name: taskInput,
      date: moment(new Date()).format('DD.MM.YYYY HH:mm'),
      checked: false,
      // reminder: {
      //   dateTime: null,
      //   notificationId: null,
      // }
    };

    const updatedLabel = labels.map((label) =>
      label.key === labelKey
        ? { ...label, tasks: [newTask, ...label.tasks] }
        : label
    );
    // Update Storage
    saveInStorage(updatedLabel);
    // Then set the new state
    setLabels(updatedLabel);
  };

  // Edit Task
  const editTask = async (taskObject) => {
    // Check if there's an existing reminder
    if (taskObject.reminder.dateTime) {
      // If there's an existing reminder and an existing notificationId, cancel the existing notification
      if (taskObject.reminder.notificationId) {
        await cancelScheduledNotification(taskObject.reminder.notificationId);
      }
      // Schedule a new notification
      const notificationId = await scheduleNotification(taskObject);
      // Update the task notificationId
      taskObject.reminder.notificationId = notificationId;
    }

    const updatedLabels = labels.map((label) => {
      return {
        ...label,
        tasks: label.tasks.map((task) => {
          if (task.key === taskObject.key) {
            return {
              ...task,
              name: taskObject.name,
              reminder: {
                dateTime: taskObject.reminder.dateTime,
                notificationId: taskObject.reminder.notificationId,
              },
            };
          }
          return task;
        }),
      };
    });

    // Update Storage and set the new state
    await saveInStorage(updatedLabels);
    setLabels(updatedLabels);
    // console.log(JSON.stringify(updatedLabels, null, 2));
  };

  // Edit label
  const editLabel = (labelKey, input, color) => {
    const updatedLabel = labels.map((label) =>
      label.key === labelKey ? { ...label, title: input, color: color } : label
    );
    // Update Storage
    saveInStorage(updatedLabel);
    // Then set the new state
    setLabels(updatedLabel);
  };

  // Delete a single Label from the Storage
  const deleteLabel = (labelKey) => {
    const updatedLabels = labels.filter((label) => label.key !== labelKey);

    // Update Storage
    saveInStorage(updatedLabels);
    // Then set the new state
    setLabels(updatedLabels);
  };

  // Delete a single task from the Storage
  const deleteTask = (taskKey) => {
    let updatedLabels = labels.map((lab) => {
      lab.tasks = lab.tasks.filter((task) => taskKey !== task.key);
      return lab;
    });
    // Update Storage
    saveInStorage(updatedLabels);
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
    saveInStorage(updatedLabels);
    // Then set the new state
    setLabels(updatedLabels);
  };

  // Ordering Labels with drag and drop
  const orderLabels = (orderedTasks) => {
    // Update Storage
    saveInStorage(orderedTasks);
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
    saveInStorage(updatedLabel);
    // Then set the new state
    setLabels(updatedLabel);
  };

  // Write to the storage
  const saveInStorage = async (item) => {
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(item));
    } catch (err) {
      alert(err);
    }
  };

  // Clear stoage or Remove all items from storage
  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem(storageKey);
      // set state
      setLabels([]);
    } catch (err) {
      alert(err);
    }
  };

  // Get Labels from Storage
  const loadLabels = async () => {
    try {
      let storageTasks = await AsyncStorage.getItem(storageKey);
      if (storageTasks !== null) {
        setLabels(JSON.parse(storageTasks));
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      // // Temp Labels for testing...
      // saveInStorage(tempLabels);
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
