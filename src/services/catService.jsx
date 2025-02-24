import axios from "axios";
import apiService from "./apiService";

const baseURL =
  "https://catapi20250222210437-h5fgabezf9feb7bp.eastus-01.azurewebsites.net/api/Cat/";

// This function will get all the cat breeds from the API
export const getAllCats = async (page) => {
  try {
    const response = await axios.get(`${baseURL}getAll/`, {
      params: {
        page: page,
        pageSize: 10,
      },
    });

    console.log(response.data);

    return {
      data: response.data.data,
      totalItems: response.data.pagination?.totalItems || 0,
      totalPages: response.data.pagination?.totalPages || 0,
    };
  } catch (error) {
    console.error("Error fetching cats:", error);
    return { data: [], totalItems: 0 };
  }
};

export const getCatById = async (id) => {
  try {
    const response = await axios.get(`${baseURL}search/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
};

export const registerCat = async (cat) => {
  const response = await apiService.post("register", cat);
  console.log(response.data);
  return response.data;
};

export const updateCat = async (cat) => {
    const response = await apiService.put("update", cat);
    console.log(response.data);
    return response.data;
};

export const deleteCat = async (id) => {
    const response = await apiService.delete(`delete/${id}`);
    console.log(response.data);
    return response.data;
};
