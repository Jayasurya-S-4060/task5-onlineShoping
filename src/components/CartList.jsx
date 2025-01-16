import React from "react";
import { Rating } from "@fluentui/react-rating";
import { useNavigate } from "react-router";

export const CartList = ({ cartList, removeFromCart }) => {
  const navigate = useNavigate();

  // Calculate totals dynamically
  const totalItems = cartList.length;
  const totalCost = cartList.reduce((sum, product) => sum + product.price, 0);
  const discountPercent = 10;
  const discountAmount = (totalCost * discountPercent) / 100;
  const toPay = totalCost - discountAmount;

  return (
    <div>
      {cartList.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {/* Product List */}
          <div className="grid grid-cols-1 gap-4">
            {cartList.map((product, index) => (
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
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="px-4 py-2 mt-2 text-white bg-red-400 rounded-xl hover:bg-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="min-h-32 p-3 shadow-md rounded-lg bg-gray-100 w-[80%] self-start">
            <div className="mb-1">
              <span className="text-lg">{`Subtotal (${totalItems} items):`}</span>
              <span className="text-lg font-bold">
                {" "}
                ₹{totalCost.toFixed(2)}
              </span>
            </div>
            <div className="mb-1">
              <span className="text-lg">Discount (10%):</span>
              <span className="text-lg font-bold">
                {" "}
                -₹{discountAmount.toFixed(2)}
              </span>
            </div>
            <div className="mb-3">
              <span className="text-lg">Total:</span>
              <span className="text-lg font-bold"> ₹{toPay.toFixed(2)}</span>
            </div>
            <button
              className="bg-yellow-400 w-full text-center px-3 py-2 rounded-lg hover:bg-yellow-500"
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
