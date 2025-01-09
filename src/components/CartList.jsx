import React from "react";
import { Rating, RatingDisplay } from "@fluentui/react-rating";

export const CartList = ({ cartList, removeFromCart }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {cartList.map((product, index) => {
        return (
          <div
            key={index}
            className="p-4 bg-white rounded-lg shadow-md flex gap-8 flex-col sm:flex-row"
          >
            <img
              className="object-contain w-full h-80 rounded-md max-w-56 sm:max-w-xs"
              src={product.image}
              alt=""
            />
            <div className="mt-4 sm:mt-0">
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <h5 className="text-sm">{product.description}</h5>
              <div className="flex items-center text-md">
                {product.rating.rate}
                <Rating
                  value={product.rating.rate}
                  onChange={() => {}}
                  className="text-yellow-500"
                  size="medium"
                />
                <span className="text-blue-500">{product.rating.count}</span>
              </div>
              <div>
                <sup className="text-lg">$</sup>
                <span className="text-3xl text-black-600">{product.price}</span>
              </div>
              <button
                onClick={() => {
                  removeFromCart(product.id);
                }}
                className="px-4 py-2 mt-2 text-white bg-red-400 rounded-xl hover:bg-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
