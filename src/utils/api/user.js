const baseUrl = "http://192.168.1.16:7207/api/Users";

//get following / followers count for user by its token
export const getFollowData = async (token) => {
  try {
    // Make API request to register user
    const apiUrl = `${baseUrl}/GetFollowCountByToken/${token}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    console.log(response);
    if (!response.ok) {
      throw new Error("error while fetching user data");
    }
    const responseData = await response.text();
    console.log("User deatils updated successfully:", responseData);

    // Navigate to next screen or perform other actions
    return responseData;
  } catch (error) {
    // Handle any errors that occur during the API request
    console.error("Error:", error);
  }
};

export const GetUserData = async (token) => {
  try {
    const apiUrl = `${baseUrl}/GetUserData/${token}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("Failed get user data");
    }
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};

//register user
export const loginUser = async (loginData) => {
  try {
    // Make API request to register user
    const apiUrl = `${baseUrl}/UserLogIn/${loginData.email}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(loginData.password), // Pass user password as JSON
    });
    console.log(response);
    if (!response.ok) {
      throw new Error("Incorrect Email or Password");
    }
    const token = await response.text();
    console.log("User logged in successfully:", token);
    console.log(token.toString());
    // Navigate to next screen or perform other actions
    return token.toString();
  } catch (error) {
    // Handle any errors that occur during the API request
    console.error("Error:", error);
  }
};

export const uploadImageURL = async (id, imageURL) => {
  try {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("imageURL", imageURL);
    console.log(formData);

    const apiUrl = `${baseUrl}/UploadProfileImage`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data; charset=UTF-8",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};

//register user
export const saveUser = async (userData) => {
  try {
    console.log(userData);
    userData.profilePictureUrl = "none";
    userData.token = "string";
    userData.userId = 0;
    console.log(userData);
    // Make API request to register user
    const apiUrl = baseUrl;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(userData), // Pass user data as JSON
    });

    if (!response.ok) {
      throw new Error("Failed to register user");
    }
    console.log("heyy");
    const token = await response.text();
    console.log("User registered successfully:", token);

    // Navigate to next screen or perform other actions
    return token;
  } catch (error) {
    // Handle any errors that occur during the API request
    console.error("Error:", error);
    // Optionally, show an error message to the user
  }
};
