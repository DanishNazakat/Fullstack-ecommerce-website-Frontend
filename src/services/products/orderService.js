import { apiRequest } from "./../apiServices";

export const placeOrder = async (orderData) => {
  try {
    const data = await apiRequest("/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    return data;
  } catch (error) {
    throw error;
  }
};