export const placeOrder = async (orderData) => {
  const response = await fetch('http://localhost:5000/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` // Auth token zaroori hai
    },
    body: JSON.stringify(orderData),
  });
  return response.json();
};