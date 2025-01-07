import React from "react";

export const ProductList = ({ data, addToCart, productData }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {productData.map((product, index) => {
        return (
          <div
            key={index}
            className="p-4 bg-white rounded-lg shadow-md  md:flex gap-8"
          >
            <img
              className="object-contain w-full md:h-80 rounded-md max-w-56"
              src={product.image}
              alt=""
            />
            <div className="mt-4">
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <h5 className="text-sm ">{product.description}</h5>

              <div className="">
                $.
                <span className="text-3xl text-black-600">{product.price}</span>
              </div>
              <button
                onClick={() => {
                  addToCart(product.id);
                }}
                className=" px-4 py-2 mt-2 text-white bg-yellow-400 rounded-xl hover:bg-yellow-500"
              >
                Add to Cart
              </button>
              <span></span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
