import { baseUrl } from "./baseUrl";
const vetUrl = `${baseUrl}/api/Vets`;

export const insertVet = async (vetData) => {
  try {
    const apiUrl = `${vetUrl}/RegisterVet`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(vetData),
    });

    if (!response.ok) {
      throw new Error("Failed to register vet");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getVets = async (vetFilters) => {
  try {
    const apiUrl = `${vetUrl}/GetVerifiedVets`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(vetFilters),
    });

    if (!response.ok) {
      throw new Error("Failed get vets");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};
export const getVetById = async (id) => {
  try {
    const apiUrl = `${vetUrl}/${id}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("Failed get vet by id");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};
