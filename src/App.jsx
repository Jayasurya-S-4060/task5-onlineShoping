import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import "./App.css";
import Navbar from "./components/Navbar";
import { ProductList } from "./components/ProductList";
import { Route, Routes } from "react-router";
import { CartList } from "./components/CartList";
import { useDispatch } from "react-redux";
import { addToProducts } from "./features/products/productSlice";

function App() {
  const [loading, setLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const dispatch = useDispatch();

  const fetchData = async () => {
    if (isFailed == true) {
      setIsFailed(false);
    }
    try {
      setLoading(true);
      let response = await fetch("https://fakestoreapi.com/products");

      if (!response.ok) {
        setIsFailed(true);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let fetchedData = await response.json();

      let updatedData = fetchedData.map((e) => ({ ...e, qty: 0 }));
      dispatch(addToProducts(updatedData));

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const Products = () => {
    return (
      <>
        {loading ? (
          <div className="flex justify-center items-center h-screen absolute top-0 left-0 right-0 bottom-0 bg-white bg-opacity-75">
            <ClipLoader color="#3498db" size={50} />
          </div>
        ) : isFailed ? (
          <div className="flex w-full h-screen   justify-center items-center">
            <h1 className="text-red-600  text-2xl font-semibold  ">
              Failed to fetch data
            </h1>{" "}
            <button onClick={fetchData}>Reload</button>
          </div>
        ) : (
          <>
            <ProductList />
          </>
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen relative  bg-gray-200 ">
      <Navbar />
      <Routes>
        <Route index path="/" element={<Products />} />
        <Route path="/cartlist" element={<CartList />} />
      </Routes>
    </div>
  );
}

export default App;
