import { useEffect } from 'react';
import { Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

// Notification handler
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export default function useNotifications() {
    // Function to schedule a notification
    const scheduleNotification = async (task) => {
        try {
            const currentDateTime = new Date();
            const reminderDateTime = new Date(task.reminderDate);
            const timeDifferenceInSeconds = Math.max(0, (reminderDateTime - currentDateTime) / 1000);

            if (timeDifferenceInSeconds > 0) {
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: 'Task Reminder',
                        body: `${task.name.substring(0, 40)}...`,
                        data: { taskKey: task.key },
                    },
                    trigger: {
                        seconds: timeDifferenceInSeconds,
                    },
                });
            }
        } catch (error) {
            console.error('Error scheduling notification:', error);
        }
    };

    // Function to request notification permission
    const requestPermission = async () => {
        try {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Notification Permission Denied', 'You have denied notification permission. Please enable it in your device settings to receive reminders.');
            }
        } catch (error) {
            console.error('Error requesting notification permission:', error);
        }
    };

    const setNotificationChannel = async () => {
        // some android configuration
        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
    }

    useEffect(() => {
        requestPermission();

        setNotificationChannel();

        // Handle received notifications here
        const receivedListener = Notifications.addNotificationReceivedListener(async (notification) => {
            console.log('Received notification:', notification);
            await Notifications.setBadgeCountAsync(1);
        });

        // Handle received responses here
        const responseReceivedListener = Notifications.addNotificationResponseReceivedListener((response) => {
            console.log('Received response from notification:', response);
            // Logic for handling received responses here
        });

        return () => {
            // Cleanup listeners when unmounting
            receivedListener.remove();
            responseReceivedListener.remove();
        };
    }, []);

    return { scheduleNotification };
}