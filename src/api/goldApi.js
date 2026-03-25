import axios from 'axios';

export const getGoldPrice = async () => {
  try {
    const res = await axios.get("https://finans.truncgil.com/today.json");
    // "gram-altin" node'undan "Satış" fiyatını alıyoruz, örneğin "6.469,52"
    const priceStr = res.data["gram-altin"]["Satış"];
    // Noktaları (binlik ayracı) silip, virgülü (ondalık ayracı) noktaya çeviriyoruz
    const formattedPrice = priceStr.replace(/\./g, '').replace(',', '.');
    return parseFloat(formattedPrice);
  } catch (error) {
    console.error("Gold API Error:", error);
    throw error;
  }
};
