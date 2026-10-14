import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCurrency: "bitcoin",
  selectedInterval: "seconds",
  priceHistory: [],
  currentPrice: null,
  isLoading: false,
  currencies: [],
};

const cryptoSlice = createSlice({
  name: "crypto",

  initialState,

  reducers: {
    setSelectedCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
      state.priceHistory = [];
      state.currentPrice = null;
      state.isLoading = true;
    },

    setSelectedInterval: (state, action) => {
      state.selectedInterval = action.payload;
      state.priceHistory = [];
      state.isLoading = true;
    },

    setCurrencies: (state, action) => {
      state.currencies = action.payload;
    },

    setPriceHistory: (state, action) => {
      state.priceHistory = action.payload;
      state.isLoading = false;
    },

    addPriceHistory: (state, action) => {
      state.priceHistory.push(action.payload);
      state.isLoading = false;
    },

    setCurrentPrice: (state, action) => {
      state.currentPrice = action.payload;
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setSelectedCurrency,
  setSelectedInterval,
  setCurrencies,
  setPriceHistory,
  addPriceHistory,
  setCurrentPrice,
  setLoading,
} = cryptoSlice.actions;

export default cryptoSlice.reducer;