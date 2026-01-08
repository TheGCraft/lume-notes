import rateLimit from "../config/upstash.js";
const rateLimiter = async (req, res, next) => {

    try {
        const { success } = await rateLimit.limit("my-rate-limiter"); //since we don't have a user id, we use a random string
        if (!success) return res.status(429).json({ message: "Too many requests" })
        next();

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
        next(error);

    }

}

export default rateLimiter;