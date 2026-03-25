import { useQuery } from '@tanstack/react-query';
import { getGoldPrice } from '../api/goldApi';
import { savePriceHistory, getPriceHistory, getAlertLimits } from '../services/storageService';
import { sendPriceAlertNotification } from '../services/notificationService';
import { useState, useEffect } from 'react';

export const useGoldPrice = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      const saved = await getPriceHistory();
      if (saved) setHistory(saved);
    };
    loadHistory();
  }, []);

  const query = useQuery({
    queryKey: ['goldPrice'],
    queryFn: async () => {
      const price = await getGoldPrice();
      if (!price) throw new Error("Could not fetch price");
      
      const now = new Date();
      const timeLabel = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      const newPoint = { time: timeLabel, price: price };
      
      setHistory(prev => {
        // Prevent adding duplicate points in the same minute unless price changed
        const lastPoint = prev[prev.length - 1];
        if (lastPoint && lastPoint.time === timeLabel && lastPoint.price === price) {
          return prev;
        }

        const updated = [...prev, newPoint].slice(-50); // Keep max 50 points
        savePriceHistory(updated);
        return updated;
      });

      // Check alerts
      const limits = await getAlertLimits();
      if (limits.active) {
        if (limits.min && price < parseFloat(limits.min)) {
          sendPriceAlertNotification("Gold Price Alert 📉", `Price dropped to ${price} TL`);
        } else if (limits.max && price > parseFloat(limits.max)) {
          sendPriceAlertNotification("Gold Price Alert 📈", `Price rose to ${price} TL`);
        }
      }
      
      return price;
    },
    refetchInterval: 60 * 1000, // Fetch every 60s
    retry: false, // Do not retry silently, show errors instantly
  });

  return { ...query, history };
};
