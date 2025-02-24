import axios from "axios";

export const submitImage = async (file) => {
    const presetKey = "catsAppAPIImages";
    const cloudName = "dergrc8nv";

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