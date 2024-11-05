const API_URL = "http://localhost/mobile-backend/public/api/banners";

export const fetchBanners = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; 
  }
};