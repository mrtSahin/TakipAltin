import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#D4AF37',       // Gold
    background: '#0F1115',    // Dark background
    surface: '#1A1D24',       // Card surface
    text: '#FFFFFF',
    textSecondary: '#A0A0A0',
    accent: '#F3E5AB',        // Light Gold
    danger: '#FF4C4C',        // Red for drops
    success: '#4CD964',       // Green for rises
  },
  roundness: 24, // Liquid UI modern soft corners
};
