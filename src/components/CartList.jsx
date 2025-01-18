import React from "react";
import { Rating } from "@fluentui/react-rating";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { updateCart } from "../features/products/productSlice";

export const CartList = ({ cartList, removeFromCart }) => {
  const navigate = useNavigate();
  let dispatch = useDispatch();

  let cartItems = useSelector((state) => state.products.cart);

  let totalCartItems = cartItems.reduce((accumulator, item) => {
    return accumulator + item.qty;
  }, 0);

  const totalItems = totalCartItems;
  const totalCost = cartItems.reduce((sum, product) => {
    return product.qty * product.price + sum;
  }, 0);

  const discountPercent = 10;
  const discountAmount = (totalCost * discountPercent) / 100;
  const toPay = totalCost - discountAmount;

  let productReducer = (product, type) => {
    let selectedItem = {
      type,
      data: { ...product },
    };
    dispatch(updateCart(selectedItem));
  };

  return (
    <div>
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid grid-cols-1 gap-4">
            {cartItems.map((product, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg shadow-md flex gap-8 flex-col sm:flex-row"
              >
                <img
                  className="object-contain w-full h-80 rounded-md max-w-56 sm:max-w-xs"
                  src={product.image}
                  alt={product.title}
                />
                <div className="mt-4 sm:mt-0">
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                  <h5 className="text-sm">{product.description}</h5>
                  <div className="flex items-center text-md">
                    {product.rating.rate}
                    <Rating
                      value={product.rating.rate}
                      className="text-yellow-500"
                      size="medium"
                    />
                    <span className="text-blue-500">
                      {product.rating.count}
                    </span>
                  </div>
                  <div>
                    <sup className="text-lg">₹</sup>
                    <span className="text-3xl text-black-600">
                      {product.price.toFixed(2)}
                    </span>
                  </div>
                  {product.qty >= 1 ? (
                    <button className="px-4 py-2 mt-2 w-36 text-white flex justify-between bg-yellow-400 rounded-xl hover:bg-yellow-500">
                      <span
                        onClick={() => {
                          productReducer(product, "remove");
                        }}
                      >
                        -
                      </span>
                      <span>{`${product.qty}`}</span>
                      <span
                        onClick={() => {
                          productReducer(product, "add");
                        }}
                      >
                        +
                      </span>
                    </button>
                  ) : (
                    <button
                      className="px-4 py-2 mt-2 w-36 text-white bg-red-400 rounded-xl hover:bg-red-500"
                      onClick={() => {
                        productReducer(product, "add");
                      }}
                    >
                      Add to cart
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="min-h-32 p-3 shadow-md rounded-lg bg-gray-100 w-[40%] self-start">
            <div className="mb-1 flex justify-between">
              <span className="text-lg">{`Subtotal (${totalItems} items):`}</span>
              <span className="text-lg font-bold">₹{totalCost.toFixed(2)}</span>
            </div>
            <div className="mb-1 flex justify-between">
              <span className="text-lg">Discount (10%):</span>
              <span className="text-lg font-bold text-red-500">
                -₹{discountAmount.toFixed(2)}
              </span>
            </div>
            <div className="mb-3 flex justify-between">
              <span className="text-lg">Total:</span>
              <span className="text-lg font-bold">₹{toPay.toFixed(2)}</span>
            </div>
            <button
              className="bg-green-400 w-full text-center px-3 py-2 text-white rounded-lg hover:bg-green-500"
              onClick={() => alert("Proceeding to checkout...")}
            >
              Proceed to Buy
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p>No items in the cart.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};
