
import jwt from 'jsonwebtoken'
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const auth = async (req, res, next) => {
    try {

        const token = req.headers.authorization.split(' ')[1]
        // console.log(token)
        const googleToken = token.length > 1000
        if (googleToken) {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            const payload = ticket.getPayload()
            req.user = { id: payload.sub, name: payload.name, photoUrl: payload.picture }
        } else {
            // to do: verify our customer jwt taken

            // const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
            // const { id, name, photoUrl } = decodedToken;
            // req.user = { id, name, photoUrl };
        }
        next()
    } catch (err) {
        console.log(err);
        res.status(401).json({ success: false, message: 'Something is wrong with your authorization!' })
    }
}

export default auth;