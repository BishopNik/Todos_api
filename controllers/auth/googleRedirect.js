import axios from "axios";
import queryString from "query-string";

export const googleRedirect = async (req, res) => { 
    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;

    const urlObj = new URL(fullUrl);
    const urlParams = queryString.parse(urlObj.search);
    const code = urlParams.code;
    try {
        const tokenData = await axios({
            url: 'https://oauth2.googleapis.com/token',
            method: "post",
            data: {
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: `${process.env.BASE_URL}/api/auth/google-redirect`,
                grant_type: "authorization_code",
                code: code,
            },
        });

        const userData = await axios({
            url: "https://www.googleapis.com/oauth2/v2/userinfo",
            method: "get",
            headers: {
                Authorization: `Bearer ${tokenData.data.access_token}`,
            },
        });

        const userRegistrationData = {
            email: userData.data.email,
            name: userData.data.name,
        };

        const registerGoogle = await axios({
            url: `${process.env.BASE_URL}/api/auth/register/google`,
            method: "post",
            data: userRegistrationData,
        });

        return res.json(registerGoogle.data)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}