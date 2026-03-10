// // apiService.js

// /**
//  * A generic function to make a GET request to an API endpoint.
//  * @param {string} url The API endpoint URL.
//  * @returns {Promise<any>} A promise that resolves with the JSON data or rejects with an error.
//  */
// export const apiRequest = (url, params = {}) => {
//   console.log(url, params);
//   return new Promise((resolve, reject) => {
//     fetch(`http://localhost:3000/api${url}`, params )
    
//       .then((response) => {
//         console.log(response);
//         if (!response.ok) {
//           // If the response is not OK (e.g., 404, 500), reject the promise with an error
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         console.log(response);
//         return response.json();
//       })
//       .then((data) => {
//         // Resolve the promise with the data
//         console.log(data);
//         resolve(data);
//       })
//       .catch((error) => {
//         // Catch any errors during the fetch or JSON parsing and reject the promise
//         console.log("Error fetching data:", error);
//         reject(error);
//       });
//   });
// };



// apiService.js

// export const apiRequest = async (url, params = {}) => {
//   try {
//     const response = await fetch(`fullstack-ecommerce-website-frontend-4t5xytw5p.vercel.app${url}`, {
//       ...params,
//       credentials: "include", // 🔥 VERY IMPORTANT (cookie send karega)
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.log("Error fetching data:", error);
//     throw error;
//   }
// };



// apiService.js

// Yahan apne Backend ka URL likhein (e.g., https://your-backend-api.vercel.app)
const BACKEND_URL = "https://aapka-backend-url.vercel.app"; 

export const apiRequest = async (url, params = {}) => {
  try {
    // 1. Check karein ke URL "https://" se start ho raha ho
    // 2. "/api" prefix zaroori hai kyunke aapke server mein app.use('/api', ...) hai
    const response = await fetch(`/api${url}`, {
      ...params,
      headers: {
        "Content-Type": "application/json",x
        ...params.headers,
      },
      credentials: "include", 
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error;
  }
};