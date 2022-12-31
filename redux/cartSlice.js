import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.quantity += 1;
      state.total += action.payload.price * action.payload.quantity;
    },
    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    deleteProduct: (state, { payload }) => {
      // console.log(state.products);
      state.products = state.products.filter((item) => item.id !== payload.id);
      state.quantity -= 1
      state.total -= payload.price
      
    },
  },
});

export const { addProduct, reset, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;
