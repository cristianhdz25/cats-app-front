import axios from "axios";

// Function to submit an image to Cloudinary
export const submitImage = async (file) => {
    const presetKey = "catsAppAPIImages"; // Use the preset key you created in Cloudinary
    const cloudName = "dergrc8nv"; // Use your Cloudinary cloud name

    console.log("file", file);
    
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", presetKey);
    formData.append("cloud_name", cloudName);

    try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
        if (response.data.secure_url) {
            return response.data.secure_url;
        }
    } catch (error) {
        console.error(error);
    }
};