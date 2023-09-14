import React, { createContext, useEffect, useRef, useState } from "react";
import 'react-native-get-random-values';
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import tempLabels from "../../tempData";

// BACKGROUND Task
const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";
TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK,
  ({ data, error, executionInfo }) => {
    console.log('Received a notification in the background!', Platform.OS, data);
  }
);
// Register BACKGROUND Task
Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

// Notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const TasksContext = createContext();

export default function TasksContextProvider(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [labels, setLabels] = useState([]);
  const [hasPermission, setHasPermission] = useState(null);

  // ---------------------- Notifications START ---------------------- //

  async function checkAndScheduleNotifications() {
    console.log("Checking notifications called...");

    // Check for notifications permissions
    handleNotificationsPermission();

    // Extract tasks into a single array
    const allTasks = [].concat(...labels.map((label) => label.tasks));

    for (const task of allTasks) {
      if (task.reminderDate && task.reminderDone === false) {
        // Date today
        const currentDateTime = new Date();
        // Convert to JavaScript Date
        const reminderDateTime = new Date(task.reminderDate);

        const timeDifferenceInSeconds = Math.max(0, (reminderDateTime - currentDateTime) / 1000);

        console.log("timeDifferenceInSeconds: " + timeDifferenceInSeconds);

        if (timeDifferenceInSeconds > 0) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "Task Reminder",
              body: task.name,
              data: { taskKey: task.key },
            },
            trigger: {
              seconds: timeDifferenceInSeconds,
            },
          });
        }
      }
    }
  };

  async function handleNotificationsPermission() {
    // Check if the user has previously granted permission
    AsyncStorage.getItem('notificationPermission').then((value) => {
      if (value === 'granted') {
        if (!hasPermission) {
          setHasPermission(true);
        }
      } else {
        setHasPermission(false);
      }
    });

    // Check if notifications permissions are set
    if (!hasPermission && hasPermission === null) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        // User granted permission
        setHasPermission(true);
        // Store the permission choice
        AsyncStorage.setItem('notificationPermission', 'granted');
      } else {
        // User denied permission
        setHasPermission(false);
        // Store the permission choice
        AsyncStorage.setItem('notificationPermission', 'denied');
        Alert.alert(
          `Notifications`,
          `You need to enable permissions in order to receive notifications`,
          [{ text: "OK" }],
          { cancelable: false }
        );
        return;
      }
    }
  };
  // ---------------------- Notifications END ---------------------- //

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
    saveInStorage(storageKey, newLabel);
    // Then set the new state
    setLabels(newLabel);
  };

  // Add Task
  const addTask = (labelKey, taskName) => {
    let newTask = {
      key: uuidv4(),
      name: taskName,
      date: moment(new Date()).format('DD.MM.YYYY HH:mm'),
      checked: false,
      reminderDate: "",
      reminderDone: false,
    };

    const updatedLabel = labels.map((label) =>
      label.key === labelKey
        ? { ...label, tasks: [newTask, ...label.tasks] }
        : label
    );
    // Update Storage
    saveInStorage(storageKey, updatedLabel);
    // Then set the new state
    setLabels(updatedLabel);
  };

  // Edit Task
  const editTask = (taskKey, taskInput, reminderDate) => {
    const updatedLabels = labels.map((label) => {
      label.tasks = label.tasks.map((task) => {
        if (task.key === taskKey) {
          task.name = taskInput;
          task.reminderDate = reminderDate;
        }
        return task;
      });
      return label;
    });

    // Update Storage
    saveInStorage(storageKey, updatedLabels);
    // Then set the new state
    setLabels(updatedLabels);
    // Schedule a notification only if reminderDate is set
    if (reminderDate) {
      checkAndScheduleNotifications();
    }
  };

  // Task Notication Done
  const reminderTaskDone = (taskKey) => {
    const updatedLabels = labels.map((label) => {
      label.tasks = label.tasks.map((task) => {
        if (task.key === taskKey) {
          task.reminderDone = true;
        }
        return task;
      });
      return label;
    });

    // Update Storage
    saveInStorage(storageKey, updatedLabels);
    // Then set the new state
    setLabels(updatedLabels);
  };

  // Edit label
  const editLabel = (labelKey, input, color) => {
    const updatedLabel = labels.map((label) =>
      label.key === labelKey ? { ...label, title: input, color: color } : label
    );
    // Update Storage
    saveInStorage(storageKey, updatedLabel);
    // Then set the new state
    setLabels(updatedLabel);
  };

  // Delete a single Label from the Storage
  const deleteLabel = (labelKey) => {
    const updatedLabels = labels.filter((label) => label.key !== labelKey);

    // Update Storage
    saveInStorage(storageKey, updatedLabels);
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
    saveInStorage(storageKey, updatedLabels);
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
    saveInStorage(storageKey, updatedLabels);
    // Then set the new state
    setLabels(updatedLabels);
  };

  // Ordering Labels with drag and drop
  const orderLabels = (orderedTasks) => {
    // Update Storage
    saveInStorage(storageKey, orderedTasks);
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
    saveInStorage(storageKey, updatedLabel);
    // Then set the new state
    setLabels(updatedLabel);
  };

  // Write to the storage
  const saveInStorage = async (key, item) => {
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
      setLabels([]);
    } catch (err) {
      alert(err);
    }
  };

  // Get Labels from Storage
  const loadLabels = async () => {
    try {
      let storageTasks = await AsyncStorage.getItem(storageKey);
      storageTasks = JSON.parse(storageTasks);
      // console.log(storageTasks);

      if (storageTasks !== null) {
        setLabels(storageTasks);
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      // // Temp Labels for testing...
      // saveInStorage(storageKey, tempLabels);

      loadLabels();


      // Timeout for loading...
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }

    // Handle Received Notifications
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      console.log("NOTIFICATION Received");
      const taskKey = notification.request.content.data.taskKey;
      // Reminder Task done
      reminderTaskDone(taskKey);
    });

    return () => {
      mounted = false;
      subscription.remove();
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
