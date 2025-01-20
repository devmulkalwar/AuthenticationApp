import jwt from "jsonwebtoken";

export const generateTokenSetCookie = (res, userId) => {
	if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRATION) {
		throw new Error("JWT_SECRET or JWT_EXPIRATION environment variables are not set");
	}

	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRATION,
	});

	res.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});

	return token;
};