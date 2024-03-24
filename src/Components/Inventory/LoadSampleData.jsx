import React, { useContext } from "react";
import StoreContext from "../../Context/StoreContext";
import Storage from "../../Utils/Storage";
import "./LoadSampleData.css"

const LoadSampleData = () => {
  const { dispatch } = useContext(StoreContext);
  
  //load sample data from products.json and update global and local storage
  const loadSampleData = () => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((sampleData) => {
        Storage.saveProducts(sampleData);
        dispatch({ type: "SET_PRODUCTS", payload: sampleData });
      })
      .catch((error) => console.error("Failed to load sample data", error));
  };

  return (
    <div className="load-data">
    <button onClick={loadSampleData}>Load Sample Data</button>
    </div>
  );
};

export default LoadSampleData;
