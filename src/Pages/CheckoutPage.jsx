import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { placeOrder } from "../services/products/orderService";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // MUI Icon
import { useLocation } from "react-router-dom";

const CheckoutPage = () => {
  const location = useLocation();
  // Cart page se bheja gaya data yahan se milega
  const { cartItems, total } = location.state || { cartItems: [], total: 0 };
  
  const { user } = useAuth();
  const [address, setAddress] = useState("");

  const handleOrder = async () => {
    if (!user) return alert("Please login to place order!");

    const orderData = {
      items: cartItems, // Cart se items array
      totalAmount: total,
      address: address,
    };

    try {
      const response = await placeOrder(orderData);
      alert(response.message);
      // Order ke baad cart clear karne ka logic yahan aayega
    } catch (error) {
      alert("Order failed!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3> <ShoppingCartIcon color="primary" /> Checkout</h3>
      <input 
        type="text" 
        placeholder="Enter Delivery Address" 
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ width: '100%', padding: '10px', margin: '10px 0' }}
      />
      <button onClick={handleOrder} className="login-btn">
        Place Order Now
      </button>
    </div>
  );
};

export default CheckoutPage;