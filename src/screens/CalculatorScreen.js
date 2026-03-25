import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, TextInput, Card } from 'react-native-paper';
import { useGoldPrice } from '../hooks/useGoldPrice';
import { theme } from '../theme/theme';

export const CalculatorScreen = () => {
  const { data: currentPrice } = useGoldPrice();
  
  const [tlInput, setTlInput] = useState('');
  const [gramInput, setGramInput] = useState('');

  const handleTLChange = (val) => {
    setTlInput(val);
    const parsed = parseFloat(val);
    if (!isNaN(parsed) && currentPrice) {
      setGramInput((parsed / currentPrice).toFixed(4));
    } else {
      setGramInput('');
    }
  };

  const handleGramChange = (val) => {
    setGramInput(val);
    const parsed = parseFloat(val);
    if (!isNaN(parsed) && currentPrice) {
      setTlInput((parsed * currentPrice).toFixed(2));
    } else {
      setTlInput('');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.headerTitle}>Converter</Text>
            
            <View style={styles.priceRow}>
              <Text style={{ color: theme.colors.textSecondary }}>Live Rate:</Text>
              <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
                {currentPrice ? `₺${currentPrice.toFixed(2)} / gram` : 'Fetching...'}
              </Text>
            </View>

            <TextInput
              label="Try Amount (₺)"
              value={tlInput}
              onChangeText={handleTLChange}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
              outlineColor={theme.colors.primary}
              activeOutlineColor="#F3E5AB"
              textColor={theme.colors.text}
            />

            <View style={styles.iconContainer}>
              <Text style={{ color: theme.colors.textSecondary, fontSize: 24 }}>⇅</Text>
            </View>

            <TextInput
              label="Gold Amount (Gram)"
              value={gramInput}
              onChangeText={handleGramChange}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
              outlineColor={theme.colors.primary}
              activeOutlineColor="#F3E5AB"
              textColor={theme.colors.text}
            />
          </Card.Content>
        </Card>
      </View>
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
    paddingVertical: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  headerTitle: {
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: 8,
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 10,
  }
});
