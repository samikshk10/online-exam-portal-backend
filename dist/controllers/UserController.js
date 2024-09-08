"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const boom_1 = require("@hapi/boom");
const jsonwebtoken_1 = require("jsonwebtoken");
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
class UserController {
    constructor() { }
    static async getUsers(req, res, next) {
        try {
            const users = await user_1.default.findAll({
                where: { role: "USER" },
                order: [["createdAt", "DESC"]],
            });
            console.log("Queried users:", users); // Debugging output
            if (users.length === 0) {
                res.status(200).json({ message: "No Users found" });
            }
            else {
                res.status(200).json({ data: users, message: "Users fetched successfully" });
            }
        }
        catch (error) {
            next(error);
        }
    }
    static async addAdmin(req, res, next) {
        try {
            const { email, password } = req.body;
            const isUserExisted = await user_1.default.findOne({ where: { email } });
            if (isUserExisted) {
                throw (0, boom_1.conflict)("Email already exists!");
            }
            const userData = {
                email,
                password,
                role: "ADMIN",
            };
            const createdUser = await user_1.default.create(userData);
            if (createdUser)
                res.status(200).json({ data: createdUser, message: "Admin added successfully" });
        }
        catch (error) {
            next(error);
        }
    }
    static async LoginAdmin(req, res, next) {
        try {
            const { email, password } = req.body;
            let firstLoginAdmin = false;
            // Check if there's an admin in the database
            const userAdmin = await user_1.default.findOne({ where: { role: "ADMIN" } });
            if (!userAdmin) {
                if (email === config_1.AdminCredentials.email && password === config_1.AdminCredentials.password) {
                    firstLoginAdmin = true;
                }
                else {
                    throw (0, boom_1.conflict)("Invalid Credentials");
                }
            }
            // Check if the user exists in the database
            const user = await user_1.default.findOne({ where: { email } });
            if (!firstLoginAdmin) {
                if (!user) {
                    throw (0, boom_1.notFound)("User not found");
                }
                const decrypted = crypto_js_1.default.AES.decrypt(password, config_1.CryptoSecretKey.secret).toString(crypto_js_1.default.enc.Utf8);
                if (!decrypted) {
                    throw (0, boom_1.conflict)("Password Decryption failed");
                }
                const passwordMatches = await bcrypt_1.default.compare(decrypted, user.password);
                if (!passwordMatches) {
                    throw (0, boom_1.conflict)("Invalid Credentials");
                }
                if (user.role !== "ADMIN") {
                    throw (0, boom_1.conflict)("The user is not authorized");
                }
                if (user.status !== "ACTIVE") {
                    throw (0, boom_1.conflict)("Admin is not active");
                }
            }
            // Create payload for JWT
            let payload;
            if (firstLoginAdmin) {
                payload = {
                    email: config_1.AdminCredentials.email,
                    role: "ADMIN",
                    fullName: "Admin",
                };
            }
            else {
                payload = {
                    email: user?.email,
                    role: user?.role,
                    fullName: user?.fullName,
                };
            }
            // Sign JWT with payload
            const token = await (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
            console.log(token);
            // Send response
            res.status(200).json({ data: { token, payload }, message: "Admin logged in successfully" });
        }
        catch (error) {
            console.log(error, "error>>>>>>>>>>>>>>>");
            next(error);
        }
    }
    static async createAdmin(req, res, next) {
        try {
            const { email, password, fullName } = req.body;
            const isUserExisted = await user_1.default.findOne({ where: { email } });
            if (isUserExisted) {
                throw (0, boom_1.conflict)("Email already exists!");
            }
            await bcrypt_1.default.hash(password, 10, async (err, hashedPassword) => {
                if (err) {
                    throw err;
                }
                const userData = {
                    fullName,
                    email,
                    password: hashedPassword,
                    role: "ADMIN",
                };
                const createdUser = await user_1.default.create(userData);
                if (createdUser) {
                    res.status(200).json({ data: createdUser, message: "Admin added successfully" });
                }
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async verifyUser(req, res, next) {
        try {
            const userData = req.user;
            console.log("asdfadfasdfasdfasdfhere>>>");
            res.status(200).json({ data: userData, message: "User verified successfully" });
        }
        catch (error) {
            next(error);
        }
    }
    static async toggleUserStatus(req, res, next) {
        const { id } = req.body;
        try {
            const userData = await user_1.default.findOne({ where: { id } });
            if (!userData) {
                throw (0, boom_1.conflict)("User not found");
            }
            const userUpdated = await userData?.update({ status: userData.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" });
            if (userUpdated) {
                res.status(200).json({
                    data: userUpdated,
                    message: "User status updated successfully",
                });
            }
            else {
                throw (0, boom_1.conflict)("User updated failed");
            }
        }
        catch (error) {
            next(error);
        }
    }
    static async addUsers(req, res, next) {
        try {
            const { fullName, email } = req.body;
            console.log(fullName, email);
            const isUserExisted = await user_1.default.findOne({ where: { email } });
            if (isUserExisted) {
                throw (0, boom_1.conflict)("User already exists!");
            }
            const userData = {
                fullName,
                email,
            };
            const createdUser = await user_1.default.create(userData);
            if (createdUser)
                res.status(200).json({ data: createdUser, message: "User added successfull" });
        }
        catch (error) {
            console.log(error, "user error add >>>>>>>");
            next(error);
        }
    }
    static async searchUsers(req, res, next) {
        try {
            const { searchText, status } = req.body;
            console.log("this is search text", searchText);
            const isUserExisted = await user_1.default.findAll({
                where: {
                    [sequelize_1.Op.or]: [{ fullName: { [sequelize_1.Op.like]: `%${searchText}%` } }, { email: { [sequelize_1.Op.like]: `%${searchText}%` } }],
                    role: "USER",
                },
            });
            console.log("this is user", isUserExisted);
            if (isUserExisted.length === 0) {
                res.status(200).json({ message: "No Users found" });
            }
            else {
                res.status(200).json({ data: isUserExisted, message: "Users fetched successfully" });
            }
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map