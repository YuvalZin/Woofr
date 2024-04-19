export const uploadImageURL = async (email, imageURL) => {
    try {
        console.log(email);
        const formData = new FormData();
        formData.append('email', email);
        formData.append('imageURL', imageURL);

        const apiUrl = 'http://192.168.1.16:7207/api/Users/UploadProfileImage'; 
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data; charset=UTF-8', // Use multipart/form-data for FormData
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload image');
        }
        const responseData = await response.json();
        console.log(responseData);
        return responseData;


    } catch (error) {
        console.error('Error:', error);
    }
};
