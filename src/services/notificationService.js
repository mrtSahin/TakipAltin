import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Expo Go SDK 53+ does not support expo-notifications, so we wrap it in a try-catch to prevent crashes.
try {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
} catch (error) {
  console.warn("Notifications disabled: Not supported in Expo Go");
}

export const requestNotificationPermissions = async () => {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      return false;
    }
    
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#D4AF37',
      });
    }
    
    return true;
  } catch (error) {
    console.warn("Notifications permissions error (Expo Go limitation):", error);
    return false;
  }
};

export const sendPriceAlertNotification = async (title, body) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title || "Gold Price Alert 🔔",
        body: body || "Price exceeded your defined range!",
        sound: true,
      },
      trigger: null, // trigger immediately
    });
  } catch (error) {
    console.warn("Could not send notification (Expo Go limitation):", error);
  }
};
