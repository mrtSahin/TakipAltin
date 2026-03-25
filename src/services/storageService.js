import AsyncStorage from '@react-native-async-storage/async-storage';

export const savePriceHistory = async (history) => {
  try {
    const jsonValue = JSON.stringify(history);
    await AsyncStorage.setItem('@gold_price_history', jsonValue);
  } catch (e) {
    console.error("Error saving history:", e);
  }
};

export const getPriceHistory = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@gold_price_history');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Error getting history:", e);
    return [];
  }
};

export const saveAlertLimits = async (limits) => {
  try {
    const jsonValue = JSON.stringify(limits);
    await AsyncStorage.setItem('@gold_alert_limits', jsonValue);
  } catch (e) {
    console.error("Error saving limits:", e);
  }
};

export const getAlertLimits = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@gold_alert_limits');
    return jsonValue != null ? JSON.parse(jsonValue) : { min: '', max: '', active: false };
  } catch (e) {
    console.error("Error getting limits:", e);
    return { min: '', max: '', active: false };
  }
};
