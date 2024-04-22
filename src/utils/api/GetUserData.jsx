export const GetUserData = async (token) => {
    try {

        const apiUrl = 'http://192.168.1.16:7207/api/Users/GetUserData/' + token;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        });

        if (!response.ok) {
            throw new Error('Failed get user data');
        }
        const responseData = await response.json();
        console.log(responseData);
        return responseData;

    } catch (error) {
        console.error('Error:', error);
    }
};
