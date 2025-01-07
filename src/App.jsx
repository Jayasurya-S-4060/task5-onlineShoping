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
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      let response = await fetch("https://fakestoreapi.com/products");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let fetchedData = await response.json();

      if (!fetchedData || fetchedData.length === 0) {
        throw new Error("No data returned from API.");
      }

      setData(fetchedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
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
