const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { Admin } = require("../db");

const authorizeUser = async (req, res, next) => {
    try {
        const auth = req.header("Authorization");
        const prefix = "Bearer ";

        if (!auth || (auth && !auth.startsWith(prefix))) {
            throw new Error("Authorization header malformed");
        }

        const user = jwt.verify(auth.slice(prefix.length), JWT_SECRET);
        req.user = user;

        const isAdmin = await Admin.checkAdmin(user.id);
        req.user.isAdmin = isAdmin;

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = authorizeUser;
