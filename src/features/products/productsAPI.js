export const productsAPI = async () => {
  const resp = await fetch("https://fakestoreapi.com/products");
  if (!resp.ok) {
    throw new Error("failed to fetch data");
  }
  return resp.json();
};
