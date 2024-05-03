import { baseUrl } from "./baseUrl";
const proUrl = `${baseUrl}/api/Professionals`;

export const insertProfessional = async (proData) => {
  try {
    const apiUrl = `${proUrl}/RegisterProfessional`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(proData),
    });

    if (!response.ok) {
      throw new Error("Failed to register profile");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const updateProfessional = async (proData) => {
  try {
    const apiUrl = `${proUrl}/UpdateProfessional`;
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(proData),
    });

    if (!response.ok) {
      throw new Error("Failed to update professional profile");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error occurred while updating professional profile:", error);
  }
};

export const getPros = async (filters) => {
  try {
    const apiUrl = `${proUrl}/GetVerifiedProfessionals`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(filters),
    });

    if (!response.ok) {
      throw new Error("Failed get professionals");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};
export const getProById = async (id) => {
  try {
    const apiUrl = `${proUrl}/${id}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("Failed get pro by id");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getProsForHomePage = async () => {
  try {
    const apiUrl = `${proUrl}/GetProffesionalsForHomePage`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("Failed get pro by id");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};
