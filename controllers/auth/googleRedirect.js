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

        console.log(userData.data);

        const userRegistrationData = {
            email: userData.data.email,
            name: userData.data.name,
        };

        console.log(userRegistrationData);

        // await axios.post('http://localhost:4000/api/auth/register', userRegistrationData);

        return res.redirect(
            `${process.env.FRONTEND_URL}?email=${userData.data.email}`
        );
    } catch (error) {
        console.error("An error occurred:", error);
        return res.status(500).send("An error occurred");
    }
}