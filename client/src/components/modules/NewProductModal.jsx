import React, { useState } from "react";

const NewProductModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    method: "Pickup",
    description: "",
    image: "",
  });

  // Add image conversion function
  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  // Modify handleImageChange
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const base64String = await convertImageToBase64(file);
        setFormData({ ...formData, image: base64String });
      } catch (err) {
        console.error("Error converting image:", err);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        {/* ...existing form fields... */}
        <input type="file" accept="image/*" onChange={handleImageChange} required />
        {/* ...rest of the form... */}
      </form>
    </div>
  );
};

export default NewProductModal;
