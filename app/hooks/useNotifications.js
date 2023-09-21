import { useEffect, useContext } from 'react';
import { Alert, Linking } from 'react-native';
import * as Notifications from 'expo-notifications';
import { LanguageContext } from "../context/LanguageContext";

// Notification handler
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export default function useNotifications() {
    // Load Languages
    const { lang } = useContext(LanguageContext);

    // Function to schedule a notification
    const scheduleNotification = async (taskObj) => {
        // First request permission
        requestPermission();
        // Android channel configuration
        setNotificationChannel();

        try {
            let notificationId = null;

            const currentDateTime = new Date();
            const reminderDateTime = new Date(taskObj.reminder.dateTime);
            const timeDifferenceInSeconds = Math.max(0, (reminderDateTime - currentDateTime) / 1000);

            if (timeDifferenceInSeconds > 0) {
                notificationId = await Notifications.scheduleNotificationAsync({
                    content: {
                        title: lang.current ? lang.languages.notifications.title[lang.current] : "Task Reminder",
                        body: `${taskObj.name.substring(0, 40)}...`,
                        data: { taskKey: taskObj.key },
                    },
                    trigger: {
                        seconds: timeDifferenceInSeconds,
                    },
                });
            }
            return notificationId;
        } catch (error) {
            console.error('Error scheduling notification:', error);
        }
    };

    // Function to cancel a scheduled notification
    const cancelScheduledNotification = async (notificationId) => {
        try {
            await Notifications.cancelScheduledNotificationAsync(notificationId);
        } catch (error) {
            console.error('Error canceling notification:', error);
        }
    };

    // Function to request notification permission
    const requestPermission = async () => {
        try {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    lang.current
                        ? lang.languages.alerts.notificationPermission.title[lang.current]
                        : "Notification Permission",
                    lang.current
                        ? lang.languages.alerts.notificationPermission.message[lang.current]
                        : "You have denied notification permission. Please enable it in your device settings to receive notifications.",
                    [
                        {
                            text: "OK",
                            onPress: async () => {
                                // Open device settings
                                Linking.openSettings();
                            },
                        },
                    ],
                    { cancelable: false }
                );
            }
        } catch (error) {
            console.error('Error requesting notification permission:', error);
        }
    };

    const setNotificationChannel = async () => {
        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#ffffff',
            });
        }
    }

    useEffect(() => {
        // Handle received notifications here (app open in Foreground)
        const receivedListener = Notifications.addNotificationReceivedListener(async (notification) => {
            // console.log('Received notification:', notification);
            await Notifications.setBadgeCountAsync(1);
        });
        // Handle received responses here (app closed in backgrdound)
        const responseReceivedListener = Notifications.addNotificationResponseReceivedListener(async (response) => {
            // console.log('User responded to received notification:', response);
        });

        return () => {
            // Cleanup listeners when unmounting
            receivedListener.remove();
            responseReceivedListener.remove();
        };
    }, []);

    return { scheduleNotification, cancelScheduledNotification };
}