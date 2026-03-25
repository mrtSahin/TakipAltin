import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { useGoldPrice } from '../hooks/useGoldPrice';
import { AdBanner } from '../components/AdBanner';
import { theme } from '../theme/theme';

const screenWidth = Dimensions.get('window').width;

export const ChartScreen = () => {
  const { history } = useGoldPrice();

  const labels = history.length > 0 ? history.map(item => item.time) : ['00:00'];
  const data = history.length > 0 ? history.map(item => item.price) : [0];

  // Limit labels on axis to avoid overcrowding
  const xLabels = labels.filter((_, idx) => idx % Math.ceil(labels.length / 5) === 0 || idx === labels.length - 1);

  const chartConfig = {
    backgroundColor: theme.colors.surface,
    backgroundGradientFrom: theme.colors.surface,
    backgroundGradientTo: theme.colors.surface,
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(212, 175, 55, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: theme.colors.primary,
    },
  };

  return (
    <View style={styles.container}>
      {history.length < 2 ? (
        <View style={styles.center}>
          <Text style={{ color: theme.colors.textSecondary }}>Waiting for more data to generate chart.</Text>
        </View>
      ) : (
        <LineChart
          data={{
            labels: labels,
            datasets: [{ data: data }],
          }}
          getDotColor={() => theme.colors.primary}
          width={screenWidth - 32}
          height={300}
          yAxisLabel="₺"
          chartConfig={chartConfig}
          bezier
          style={styles.chartStyle}
          formatXLabel={(value) => xLabels.includes(value) ? value : ''}
          hidePointsAtIndex={labels.length > 10 ? labels.map((_, i) => i !== labels.length - 1 ? i : -1).filter(i => i !== -1) : undefined}
        />
      )}
      
      <View style={{ flex: 1 }} />
      <AdBanner />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartStyle: {
    marginVertical: 20,
    borderRadius: 16,
  },
});
