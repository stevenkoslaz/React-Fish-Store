import React, { useState, useContext, useEffect } from "react";
import "./EditableProductForm.css";
import StoreContext from "../../Context/StoreContext";

const EditableProductForm = ({ product }) => {
  const { products, dispatch } = useContext(StoreContext);
  const [editedProduct, setEditedProduct] = useState(product);
  const [isModified, setIsModified] = useState(false); // Track if the form has unsaved changes
  const [isSubmitted, setIsSubmitted] = useState(true); // Track if the changes have been submitted

  // Resets the form to the initial state or when the selected product changes
  const resetForm = () => {
    setEditedProduct(product);
    setIsModified(false);
    setIsSubmitted(true);
  };
  
  // Effect to reset the form when the global products list or the selected product changes
  useEffect(() => {
    resetForm(); 
  }, [products, product]); 

  // Handles form submission, updates global state, and resets submission flags
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "UPDATE_PRODUCT", payload: editedProduct });
    setIsSubmitted(true);
  };

  // Effect to check if the form data has been modified compared to the original product data
  useEffect(() => {
    const modified =
      JSON.stringify(editedProduct) !== JSON.stringify(product);
    setIsModified(modified);
  }, [editedProduct, product]);

  // Updates local form state when form fields are changed
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setIsSubmitted(false);
  };

  // Determines button color based on form state (saved vs unsaved changes)
  const buttonColor = isSubmitted
    ? "#007bff"
    : isModified
    ? "orange"
    : "#007bff";
  const statusText = isSubmitted ? "Saved" : "Pending Save";

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-row">
        <input
          type="text"
          name="title"
          value={editedProduct.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <input
          type="text"
          name="price"
          value={editedProduct.price}
          onChange={handleChange}
          placeholder="Price"
          pattern="[0-9]+(\.[0-9]{1,2})?"
        />
        <select
          name="status"
          value={editedProduct.status}
          onChange={handleChange}
        >
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
      </div>
      <textarea
        name="description"
        value={editedProduct.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <div className="input-row-2">
        <input
          type="text"
          name="imageUrl"
          value={editedProduct.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <button type="submit" style={{ backgroundColor: buttonColor }}>
          {statusText}
        </button>
      </div>
    </form>
  );
};

export default EditableProductForm;
