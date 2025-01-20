import React from "react";
import { Rating } from "@fluentui/react-rating";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../features/products/productSlice";

export const ProductList = () => {
  let dispatch = useDispatch();
  let products = useSelector((state) => state.products.products);
  let sendToCart = (product, type) => {
    let selectedItem = {
      type,
      data: { ...product },
    };
    dispatch(updateCart(selectedItem));
  };
  return (
    <div className="grid grid-cols-1  md:grid-cols-2  bg-gray-200">
      {products.map((product, index) => {
        return (
          <div
            key={index}
            className="grid md:grid-cols-2 grid-cols-1 items-center  mx-0 mt-4  md:mx-8 md:mt-9 p-4 bg-white rounded-lg shadow-md   gap-8"
          >
            <div className="flex justify-center w-full">
              <img
                className="object-contain w-full md:h-80 rounded-md max-w-56"
                src={product.image}
                alt=""
              />
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <h5 className="text-sm ">{product.description}</h5>
              <div className="flex items-center text-md">
                {product.rating.rate}
                <Rating
                  value={product.rating.rate}
                  className="text-yellow-500"
                  size="medium"
                />
                <span className="text-blue-500">{product.rating.count}</span>
              </div>

              <div className="">
                <sup className="text-lg">$</sup>
                <span className="text-3xl text-black-600">{product.price}</span>
              </div>

              {product.qty >= 1 ? (
                <button className=" flex justify-between px-4 py-2 mt-2 w-36 text-white bg-yellow-400 rounded-xl hover:bg-yellow-500">
                  <span
                    onClick={() => {
                      sendToCart(product, "remove");
                    }}
                  >
                    -
                  </span>
                  <span className="text-lg font-bold">{`${product.qty}`}</span>
                  <span
                    onClick={() => {
                      sendToCart(product, "add");
                    }}
                  >
                    +
                  </span>
                </button>
              ) : (
                <button
                  className=" px-4 py-2 mt-2 w-36 text-white bg-yellow-400 rounded-xl hover:bg-yellow-500"
                  onClick={() => {
                    sendToCart(product, "add");
                  }}
                >
                  Add to cart
                </button>
              )}

              <span></span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
