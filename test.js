const axios = require('axios');

async function testApi() {
  try {
    const res = await axios.get("https://finans.truncgil.com/today.json");
    const formattedPrice = res.data["gram-altin"]["Satış"].replace(/\./g, '').replace(',', '.');
    console.log("----------------------------------------------------------------");
    console.log("✅ BAŞARILI LOG ÖRNEĞİ!");
    console.log("💰 Uygulama İçinden Çekilen Altın Fiyatı (Satış):", parseFloat(formattedPrice), "TL");
    console.log("----------------------------------------------------------------");
  } catch (error) {
    console.error("Hata:", error.message);
  }
}

testApi();
