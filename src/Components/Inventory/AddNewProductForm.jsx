import React, { useState, useContext } from "react";
import StoreContext from "../../Context/StoreContext";
import Storage from "../../Utils/Storage";
import "./EditableProductForm.css";

const AddNewProductForm = () => {
  // Initialize form data state with default values
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    price: "",
    status: "available",
  });

  // Use the StoreContext to access the dispatch method for updating the global state
  const { dispatch } = useContext(StoreContext);

  // Handle form field changes and update the formData state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate required fields
    if (!formData.title || !formData.price) {
      alert("Please fill in all required fields.");
      return;
    }

    // Prepare newProduct object with parsed price
    const newProduct = {
      ...formData,
      price: parseFloat(formData.price), 
    };

    Storage.addProduct(newProduct);
    dispatch({ type: "ADD_PRODUCT", payload: newProduct });
    
    // Reset form data to default values after submission
    setFormData({
      title: "",
      description: "",
      imageUrl: "",
      price: "",
      status: "available",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-row">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          pattern="[0-9]+(\.[0-9]{1,2})?"
          required
        />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
      </div>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <div className="input-row-2">
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <button type="submit">Add Product</button>
      </div>
    </form>
  );
};

export default AddNewProductForm;
