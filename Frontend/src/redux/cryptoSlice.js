import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCurrency: "bitcoin",
  priceHistory: [],
  currentPrice: null,
  isLoading: false,
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
  addPriceHistory,
  setCurrentPrice,
  setLoading,
} = cryptoSlice.actions;

export default cryptoSlice.reducer;