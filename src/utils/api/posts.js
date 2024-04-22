const baseUrl = "http://192.168.1.16:7207/api/Woofs";

export const getUserPosts = async (id) => {
    try {
      const apiUrl = `${baseUrl}/GetUserPosts/${id}`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed get user posts");
      }
      const responseData = await response.json();
      console.log("posts:");
      console.log(responseData);
      return responseData;
    } catch (error) {
      console.error("Error:", error);
    }
  };
  