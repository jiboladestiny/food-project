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
      state.products = state.products.filter((item) => item.id !== payload.id);
      state.quantity -= 1;
      state.total -= payload.price;
    },
    increase: (state, { payload }) => {
      const cartItem = state.products.find((item) => item.id === payload.id);
      cartItem.quantity += 1;
      
      state.total += cartItem.price
      // console.log(cartItem.quantity)
    },
    decrease: (state, { payload }) => {
     const cartItem = state.products.find((item) => item.id === payload.id);
     if (cartItem.quantity > 0) {
      cartItem.quantity -= 1;
      state.total -= cartItem.price;
     }
      

    },
  },
});

export const { addProduct, reset, deleteProduct, increase, decrease } =
  cartSlice.actions;
export default cartSlice.reducer;
