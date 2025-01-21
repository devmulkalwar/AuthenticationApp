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

    console.log("Verification email sent successfully", response);
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

    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};


// Send Welcome Email
export const sendWelcomeEmail = async (email, name) => {
  try {
    const clientURL = process.env.CLIENT_URL; // Fetch the client URL from environment variables
    const loginURL = `${clientURL}/login`; // Construct the login URL
    const response = await transporter.sendMail({
      from: `"LinkWeb" <${process.env.GMAIL_USER}>`, // Sender's email address
      to: email, // Recipient's email
      subject: "Welcome to LinkWeb!", // Email subject
      html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name) // Replace {name} with the user's name
        .replace("{loginURL}", loginURL), // Replace {loginURL} with the actual login URL
    });

    console.log("Welcome email sent successfully", response);
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

    console.log("Password reset email sent successfully", response);
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

    console.log("Password reset success email sent successfully", response);
  } catch (error) {
    console.error("Error sending password reset success email:", error);
    throw new Error("Error sending password reset success email");
  }
};
