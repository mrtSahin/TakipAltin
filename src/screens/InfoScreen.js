import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { theme } from '../theme/theme';

export const InfoScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="About TakipAltin" titleStyle={styles.title} />
        <Card.Content>
          <Text style={styles.text}>
            TakipAltin is a comprehensive application for tracking live gold prices, managing price alerts, performing currency conversions, and displaying historical data.
          </Text>
          <Text style={styles.subtitle}>Features</Text>
          <Text style={styles.text}>• Real-time updates for Gram Gold in TRY.</Text>
          <Text style={styles.text}>• Customizable price alerts with push notifications.</Text>
          <Text style={styles.text}>• Historical data visualization through interactive charts.</Text>
          <Text style={styles.text}>• Currency converter tool (TL to Gold & vice versa).</Text>
          
          <Text style={styles.subtitle}>Version</Text>
          <Text style={styles.text}>1.0.0</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.roundness,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  title: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  subtitle: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  text: {
    color: theme.colors.textSecondary,
    marginBottom: 5,
    lineHeight: 20,
  },
});
