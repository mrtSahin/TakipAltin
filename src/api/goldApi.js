import axios from 'axios';

export const getGoldPrice = async () => {
  try {
    // Tüm engelleri ve Cloudflare bloklarını aşabilmek için %100 açık olan Bigpara API'sini kullanıyoruz.
    const res = await axios.get("https://api.bigpara.hurriyet.com.tr/doviz/headerlist/altin");
    
    // Yanıtın data dizisinde 'GLDGR' yani Gram Altın sembolünü buluyoruz
    const goldData = res.data.data.find(item => item.SEMBOL === "GLDGR");
    
    if (!goldData || !goldData.SATIS) {
      throw new Error("Geçersiz API Yanıtı (Altın verisi bulunamadı)");
    }

    const finalPrice = parseFloat(goldData.SATIS);
    console.log("💰 Uygulama İçinden Çekilen Altın Fiyatı (Satış):", finalPrice, "TL");
    
    return finalPrice;
  } catch (error) {
    if (error.response) console.error("API HTTP Hatası:", error.response.status);
    throw error;
  }
};
