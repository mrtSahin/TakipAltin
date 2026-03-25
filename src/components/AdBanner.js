import React from 'react';
import { View, Text } from 'react-native';
import { theme } from '../theme/theme';

export const AdBanner = () => {
  return (
    <View style={{ 
      alignItems: 'center', 
      justifyContent: 'center',
      marginVertical: 10,
      height: 50,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      borderRadius: 8
    }}>
      <Text style={{ color: theme.colors.textSecondary }}>[AdBanner Placeholder - Disabled for Expo Go]</Text>
    </View>
  );
};
