import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  cart: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToProducts: (state, action) => {
      state.products = action.payload.map((e) => ({
        ...e,
        inCart: false,
        qty: 0,
      }));
    },
    updateCart: (state, action) => {
      const indexOfProduct = state.products.findIndex(
        (e) => e.id === action.payload.id
      );

      if (indexOfProduct !== -1) {
        const updatedItem = {
          ...state.products[indexOfProduct],
          qty: state.products[indexOfProduct].qty + action.payload.qty,
        };

        state.products[indexOfProduct] = updatedItem;

        const productInCartIndex = state.cart.findIndex(
          (e) => e.id === action.payload.id
        );

        if (productInCartIndex === -1) {
          state.cart.push(updatedItem);
        } else {
          state.cart[productInCartIndex].qty += action.payload.qty;
        }
      }
    },
  },
});

export const { addToProducts, updateCart } = productSlice.actions;
export default productSlice.reducer;
