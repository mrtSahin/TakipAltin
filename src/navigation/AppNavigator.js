import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/HomeScreen';
import { ChartScreen } from '../screens/ChartScreen';
import { AlertScreen } from '../screens/AlertScreen';
import { CalculatorScreen } from '../screens/CalculatorScreen';
import { InfoScreen } from '../screens/InfoScreen';
import { theme } from '../theme/theme';

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: theme.colors.background },
        headerTintColor: theme.colors.text,
        tabBarStyle: { 
          backgroundColor: theme.colors.surface, 
          borderTopColor: 'transparent',
          paddingBottom: 5,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Chart') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'Alerts') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Calculator') {
            iconName = focused ? 'calculator' : 'calculator-outline';
          } else if (route.name === 'Info') {
            iconName = focused ? 'information-circle' : 'information-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Tracker" }} />
      <Tab.Screen name="Chart" component={ChartScreen} options={{ title: "Chart" }} />
      <Tab.Screen name="Alerts" component={AlertScreen} options={{ title: "Alerts" }} />
      <Tab.Screen name="Calculator" component={CalculatorScreen} options={{ title: "Calc" }} />
      <Tab.Screen name="Info" component={InfoScreen} options={{ title: "Info" }} />
    </Tab.Navigator>
  );
};
