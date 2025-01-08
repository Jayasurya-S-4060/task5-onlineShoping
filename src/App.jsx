import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import "./App.css";
import Navbar from "./components/nav";
import { ProductList } from "./components/ProductList";
import Cart from "./components/Cart";

function App() {
  const [data, setData] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

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

      setData(fetchedData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const addToCart = (id) => {
    setCartList((prevCartList) => {
      if (prevCartList.some((item) => item.id === id)) {
        alert("Already added to the cart");
        return prevCartList;
      }
      const toAdd = data.filter((item) => item.id === id);
      return [...prevCartList, ...toAdd];
    });
  };

  const removeFromCart = (id) => {
    setCartList((data) => {
      data.length == 1 ? setShowCart(false) : null;
      return cartList.filter((data) => id !== data.id);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen relative">
      <Navbar setShowCart={setShowCart} cartList={cartList} />

      {loading ? (
        <div className="flex justify-center items-center h-screen absolute top-0 left-0 right-0 bottom-0 bg-white bg-opacity-75">
          <ClipLoader color="#3498db" size={50} />
        </div>
      ) : isFailed ? (
        <div className="flex w-full h-screen flex  justify-center items-center">
          <h1 className="text-red-600  text-2xl font-semibold  ">
            Failed to fetch data
          </h1>{" "}
          <button onClick={fetchData}>Reload</button>
        </div>
      ) : (
        <ProductList data={data} addToCart={addToCart} productData={data} />
      )}

      <Cart
        showCart={showCart}
        setShowCart={setShowCart}
        cartList={cartList}
        removeFromCart={removeFromCart}
      />
    </div>
  );
}

export default App;
