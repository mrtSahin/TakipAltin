import React from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { useGoldPrice } from '../hooks/useGoldPrice';
import { AdBanner } from '../components/AdBanner';
import { theme } from '../theme/theme';

export const HomeScreen = () => {
  const { data: price, isLoading, isError, history } = useGoldPrice();

  // Basic diff from the last recorded point
  const previousPoint = history?.length > 1 ? history[history.length - 2] : null;
  const isUp = previousPoint && price > previousPoint.price;
  const isDown = previousPoint && price < previousPoint.price;
  const color = isUp ? theme.colors.success : isDown ? theme.colors.danger : theme.colors.textSecondary;
  const arrow = isUp ? '↑' : isDown ? '↓' : '-';

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.centerAlign}>
          <Text variant="titleMedium" style={{ color: theme.colors.textSecondary }}>
            Gram Gold (TRY)
          </Text>
          
          {isLoading ? (
            <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loader} />
          ) : isError ? (
            <Text style={{ color: theme.colors.danger }}>Error fetching price</Text>
          ) : (
            <>
              <Text variant="displayMedium" style={styles.priceText}>
                ₺{price?.toFixed(2)}
              </Text>
              
              {previousPoint && (
                <View style={styles.diffContainer}>
                  <Text style={[styles.diffText, { color }]}>
                    {arrow} {Math.abs(price - previousPoint.price).toFixed(2)} TL
                  </Text>
                </View>
              )}
            </>
          )}
        </Card.Content>
      </Card>
      
      <View style={{ marginTop: 20 }}>
        <Text variant="bodyMedium" style={styles.infoText}>
          Price updates automatically every 60 seconds.
        </Text>
      </View>
      
      <AdBanner />
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
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  centerAlign: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  priceText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginTop: 10,
  },
  loader: {
    marginVertical: 20,
  },
  diffContainer: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
  },
  diffText: {
    fontSize: 16,
    fontWeight: '600',
  },
  infoText: {
    textAlign: 'center',
    color: theme.colors.textSecondary,
    marginBottom: 20,
  }
});
