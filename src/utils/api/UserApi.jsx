
//register user
export const saveUser = async (userData) => {
    try {
        console.log(userData);
        userData.profilePictureUrl = "none";
        userData.token = "string";
        userData.userId = 0;
        console.log(userData);
        // Make API request to register user
        const apiUrl = 'http://192.168.1.16:7207/api/Users';
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(userData), // Pass user data as JSON
        });

        if (!response.ok) {
            throw new Error('Failed to register user');
        }
        console.log("heyy");
        const token = await response.text();
        console.log(token);
        console.log('User registered successfully:', token);

        // Navigate to next screen or perform other actions
        return token;

    } catch (error) {
        // Handle any errors that occur during the API request
        console.error('Error:', error);
        // Optionally, show an error message to the user
    }

};

