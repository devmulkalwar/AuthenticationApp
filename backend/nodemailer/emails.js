import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  SPECIAL_MAIL_TEMPLATE,
} from "./emailTemplates.js";
import transporter from "./nodemailer.config.js"; // Assuming you have a nodemailer config setup

import dotenv from "dotenv";

dotenv.config();

// Send Verification Email
export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const response = await transporter.sendMail({
      from: `"LinkWeb" <${process.env.GMAIL_USER}>`, // Sender's email address
      to: email, // Recipient's email
      subject: "Verify your email", // Email subject
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ), // HTML email body
    });

    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Error sending verification email");
  }
};

export const sendSpecialVerificationEmail = async (email, verificationToken) => {
  try {
    const emailBody = SPECIAL_MAIL_TEMPLATE.replace(
      "{verificationCode}",
      verificationToken
    );

    const response = await transporter.sendMail({
      from: `"LinkWeb" <${process.env.GMAIL_USER}>`, // Sender's email address
      to: email, // Recipient's email
      subject: "Verify your email", // Email subject
      html: emailBody, // HTML email body
    });

    console.log("Special verification email sent successfully:");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};


// Send Welcome Email
export const sendWelcomeEmail = async (email, name) => {
  try {
    const clientURL = process.env.CLIENT_URL; 
    const loginURL = `${clientURL}/login`;
    const response = await transporter.sendMail({
      from: `"LinkWeb" <${process.env.GMAIL_USER}>`, 
      to: email, 
      subject: "Welcome to LinkWeb!",
      html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name) 
        .replace("{loginURL}", loginURL),
    });

    console.log("Welcome email sent successfully");
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};

// Send Password Reset Email
export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const response = await transporter.sendMail({
      from: `"LinkWeb" <${process.env.GMAIL_USER}>`, // Sender's email address
      to: email,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL), // HTML email body
    });

    console.log("Password reset email sent successfully");
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Error sending password reset email");
  }
};

// Send Password Reset Success Email
export const sendResetSuccessEmail = async (email, loginURL) => {
  try {
    const clientURL = process.env.CLIENT_URL; // Fetch the client URL from environment variables
    const loginURL = `${clientURL}/login`;
    const response = await transporter.sendMail({
      from: `"LinkWeb" <${process.env.GMAIL_USER}>`, // Sender's email address
      to: email, // Recipient's email
      subject: "Password Reset Successful", // Email subject
      html: PASSWORD_RESET_SUCCESS_TEMPLATE.replace("{loginURL}", loginURL), // HTML email body
    });

    console.log("Password reset success email sent successfully");
  } catch (error) {
    console.error("Error sending password reset success email:", error);
    throw new Error("Error sending password reset success email");
  }
};
