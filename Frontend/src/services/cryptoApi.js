import axios from "axios";

const API_URL = "https://api.coingecko.com/api/v3/coins/markets";

const HISTORY_API_URL = "https://api.coingecko.com/api/v3/coins";

export const fetchCryptoPrices = async () => {
  const response = await axios.get(API_URL, {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 50,
      page: 1,
      sparkline: false,
    },
  });

  return response.data;
};

export const fetchCryptoHistory = async (coinId, days = 1) => {
  const response = await axios.get(
    `${HISTORY_API_URL}/${coinId}/market_chart`,
    {
      params: {
        vs_currency: "usd",
        days,
      },
    },
  );

  return response.data;
};