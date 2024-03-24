import React, { useState, useEffect, useContext } from "react";
import EditableProductForm from "./EditableProductForm";
import AddNewProductForm from "./AddNewProductForm";
import StoreContext from "../../Context/StoreContext";
import LoadSampleData from "./LoadSampleData";
import "./Inventory.css";

const Inventory = () => {
  const { state } = useContext(StoreContext);
  const [products, setProducts] = useState([]);

  // synchronize local products state with the global products list
  useEffect(() => {
    setProducts(state.products);
  }, [state.products]);

  // Fetch products from a local JSON file and update local state
  const fetchProducts = async () => {
    try {
      const response = await fetch("/products.json");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const productsData = await response.json();
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  // fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  //handle product updates and synchronize them with local state
  const handleEditProduct = async (updatedProductData) => {
    try {
      const response = await fetch(`/products/${updatedProductData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProductData),
      });

      if (!response.ok) {
        throw new Error(
          "Failed to update product. Server returned status: " + response.status
        );
      }

      const updatedProduct = await response.json();

      const updatedProducts = products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );

      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // handle adding a new product and updating local state
  const handleAddProduct = (newProductData) => {
    Storage.addProduct(newProductData);
    setProducts((prevProducts) => [
      ...prevProducts,
      { ...newProductData, id: new Date().getTime() },
    ]);
  };

  return (
    <div className="inventory">
      <h2>INVENTORY</h2>
      {products.map((product) => (
        <div className="form-container" key={product.id}>
          <EditableProductForm
            product={product}
            onEditProduct={handleEditProduct}
          />
        </div>
      ))}

      <h2>ADD A NEW FISH</h2>
      <div className="form-container">
        <AddNewProductForm onAddProduct={handleAddProduct} />
      </div>
      <LoadSampleData />
    </div>
  );
};

export default Inventory;