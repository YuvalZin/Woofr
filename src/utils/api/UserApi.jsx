const apiUrl = 'http://192.168.1.16:7207/api/Users';


export const saveUser = async (userData) => {
    try {
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

        const data = await response.json();
        console.log('User registered successfully:', data);
        // Navigate to next screen or perform other actions
        return data;
    } catch (error) {
        // Handle any errors that occur during the API request
        console.error('Error:', error);
        // Optionally, show an error message to the user
    }

};