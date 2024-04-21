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
      return responseData;
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
export const getHomePagePosts = async (id) => {
    try {
      const apiUrl = `${baseUrl}/GetHomePagePosts/${id}`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed get home-page posts");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error:", error);
    }
  };
export const getPostLikes = async (id) => {
    try {
      const apiUrl = `${baseUrl}/GetLikesByPostId/${id}`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed get home-page posts");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error:", error);
    }
  };

export const likePost = async (post_id,user_id) => {
    try {
      const apiUrl = `${baseUrl}/LikePost/${post_id}/${user_id}`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed Like post");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  export const deletePost = async (post_id) => {
    try {
      const apiUrl = `${baseUrl}/${post_id}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
  
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  