
//get following / followers count for user by its token
export const getFollowData = async (token) => {
    try {
        // Make API request to register user
        const apiUrl = 'http://192.168.1.16:7207/api/Users/GetFollowCountByToken/'+token;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        });
        console.log(response);
        if (!response.ok) {
            throw new Error("error while fetching user data");
        }
        console.log("ddddddddddddddd"+response);
        const responseData = await response.text();
        console.log('User deatils updated successfully:', responseData);

        // Navigate to next screen or perform other actions
        return responseData;
    } catch (error) {
        // Handle any errors that occur during the API request
        console.error('Error:', error);
    }

};

