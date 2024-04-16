
//register user
export const loginUser = async (loginData) => {
    try {
        // Make API request to register user
        const apiUrl = 'http://192.168.1.16:7207/api/Users/UserLogIn/'+loginData.email;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(loginData.password), // Pass user password as JSON
        });
        console.log(response);
        if (!response.ok) {
            throw new Error("Incorrect Email or Password");
        }
        const token = await response.text();
        console.log('User logged in successfully:', token);

        // Navigate to next screen or perform other actions
        return token.j;
    } catch (error) {
        // Handle any errors that occur during the API request
        console.error('Error:', error);
    }

};

