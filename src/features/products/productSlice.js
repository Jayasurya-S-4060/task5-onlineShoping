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
      let { products, cart } = state;
      let { data, type } = action.payload;
      let selectedItem = data;
      let updateType = type;

      let indexOfProduct = products.findIndex(
        (item) => item.id === selectedItem.id
      );
      let indexOfCart = cart.findIndex((item) => item.id === selectedItem.id);

      if (indexOfProduct !== -1) {
        if (updateType === "add") {
          products[indexOfProduct].qty += 1;
        } else if (
          updateType === "remove" &&
          products[indexOfProduct].qty > 0
        ) {
          products[indexOfProduct].qty -= 1;
        }
      }

      let isInCart = cart.some((e) => e.id === selectedItem.id);
      let addToCart = { ...selectedItem };

      if (!isInCart && updateType === "add") {
        addToCart.qty = 1;
        state.cart = [...cart, addToCart];
        console.log("added to cart");
      } else if (isInCart && updateType === "add" && indexOfCart !== -1) {
        state.cart[indexOfCart].qty += 1;
      } else if (
        updateType === "remove" &&
        selectedItem.qty > 0 &&
        isInCart &&
        indexOfCart !== -1
      ) {
        if (selectedItem.qty === 1) {
          state.cart.splice(indexOfCart, 1);
        } else {
          state.cart[indexOfCart].qty -= 1;
        }
      }
    },
  },
});

export const { addToProducts, updateCart } = productSlice.actions;
export default productSlice.reducer;
