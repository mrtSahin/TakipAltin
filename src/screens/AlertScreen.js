import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Text, TextInput, Button, Switch, Card } from 'react-native-paper';
import { saveAlertLimits, getAlertLimits } from '../services/storageService';
import { requestNotificationPermissions } from '../services/notificationService';
import { theme } from '../theme/theme';

export const AlertScreen = () => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    loadLimits();
  }, []);

  const loadLimits = async () => {
    const limits = await getAlertLimits();
    setMinPrice(limits.min ? String(limits.min) : '');
    setMaxPrice(limits.max ? String(limits.max) : '');
    setIsActive(limits.active || false);
  };

  const handleSave = async (forceInactive = false) => {
    const active = forceInactive ? false : isActive;
    
    if (active) {
      const hasPermission = await requestNotificationPermissions();
      if (!hasPermission) {
        Alert.alert("Permission Required", "Notifications are disabled. The alert cannot be activated.");
        setIsActive(false);
        return;
      }
    }

    const limits = {
      min: minPrice ? parseFloat(minPrice) : null,
      max: maxPrice ? parseFloat(maxPrice) : null,
      active: active
    };

    await saveAlertLimits(limits);
    if (!forceInactive) {
      Alert.alert("Success", "Alerts saved and updated successfully.");
    }
  };

  const toggleSwitch = async () => {
    const newActive = !isActive;
    setIsActive(newActive);
    
    // Save immediately on toggle
    if (newActive) {
      const hasPermission = await requestNotificationPermissions();
      if (!hasPermission) {
        Alert.alert("Permission Required", "Please allow notifications from your device settings.");
        setIsActive(false);
        return;
      }
    }
    
    const limits = {
      min: minPrice ? parseFloat(minPrice) : null,
      max: maxPrice ? parseFloat(maxPrice) : null,
      active: newActive
    };
    await saveAlertLimits(limits);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.header}>
              <Text variant="titleLarge" style={styles.title}>Price Alerts</Text>
              <Switch value={isActive} onValueChange={toggleSwitch} color={theme.colors.primary} />
            </View>

            <Text style={styles.subtitle}>Receive push notifications when price crosses the limits.</Text>

            <TextInput
              label="Minimum Price (TRY)"
              value={minPrice}
              onChangeText={setMinPrice}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
              outlineColor={theme.colors.textSecondary}
              activeOutlineColor={theme.colors.primary}
              textColor={theme.colors.text}
            />

            <TextInput
              label="Maximum Price (TRY)"
              value={maxPrice}
              onChangeText={setMaxPrice}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
              outlineColor={theme.colors.textSecondary}
              activeOutlineColor={theme.colors.primary}
              textColor={theme.colors.text}
            />

            <Button 
              mode="contained" 
              onPress={() => handleSave()} 
              style={styles.button}
              buttonColor={theme.colors.primary}
              textColor={theme.colors.background}
            >
              Save Alerts
            </Button>
          </Card.Content>
        </Card>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.roundness,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  subtitle: {
    color: theme.colors.textSecondary,
    marginBottom: 20,
  },
  input: {
    backgroundColor: theme.colors.surface,
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
    borderRadius: 8,
  }
});
