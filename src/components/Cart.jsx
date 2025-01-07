import React, { useEffect, useRef } from "react";
import { CartList } from "./CartList";

const Cart = ({ showCart, setShowCart, cartList, removeFromCart }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowCart(false);
      }
    };

    if (showCart) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCart]);

  return showCart ? (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500/75 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className="w-[80%] max-h-[80vh] relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all flex flex-col"
      >
        <div className="bg-gray-50 px-6 py-3 text-xl font-bold">Cart</div>
        <div className="bg-gray-200 px-4 pb-4 pt-5 sm:p-6 sm:pb-4 flex-grow overflow-y-auto">
          <CartList cartList={cartList} removeFromCart={removeFromCart} />
        </div>

        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 sm:ml-3 sm:w-auto"
          >
            Proceed
          </button>
          <button
            type="button"
            onClick={() => setShowCart(false)}
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Cart;
