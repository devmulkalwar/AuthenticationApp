import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	WELCOME_EMAIL_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
  } from "./emailTemplates.js";
import transporter from "./nodemailer.config.js";  // Assuming you have a nodemailer config setup
  
import dotenv from 'dotenv';

dotenv.config();
  
  // Send Verification Email
  export const sendVerificationEmail = async (email, verificationToken) => {
	try {
	  const response = await transporter.sendMail({
		from: `"BrightScholars" <${process.env.GMAIL_USER}>`,  // Sender's email address
		to: email,  // Recipient's email
		subject: "Verify your email",  // Email subject
		html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),  // HTML email body
	  });
  
	  console.log("Verification email sent successfully", response);
	} catch (error) {
	  console.error('Error sending verification email:', error);
	  throw new Error("Error sending verification email");
	}
  };
  
  // Send Welcome Email
  export const sendWelcomeEmail = async (email, name) => {
	try {
	  const response = await transporter.sendMail({
		from: `"BrightScholars" <${process.env.GMAIL_USER}>`,  // Sender's email address
		to: email,  // Recipient's email
		subject: "Welcome to BrightScholars!",  // Email subject
		html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),  // HTML email body
	  });
  
	  console.log("Welcome email sent successfully", response);
	} catch (error) {
	  console.error('Error sending welcome email:', error);
	  throw new Error(`Error sending welcome email: ${error}`);
	}
  };
  
  // Send Password Reset Email
  export const sendPasswordResetEmail = async (email, resetURL) => {
	try {
	  const response = await transporter.sendMail({
		from: `"BrightScholars" <${process.env.GMAIL_USER}>`,  // Sender's email address
		to: email,  // Recipient's email
		subject: "Reset your password",  // Email subject
		html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),  // HTML email body
	  });
  
	  console.log("Password reset email sent successfully", response);
	} catch (error) {
	  console.error('Error sending password reset email:', error);
	  throw new Error("Error sending password reset email");
	}
  };
  
  // Send Password Reset Success Email
  export const sendResetSuccessEmail = async (email) => {
	try {
	  const response = await transporter.sendMail({
		from: `"BrightScholars" <${process.env.GMAIL_USER}>`,  // Sender's email address
		to: email,  // Recipient's email
		subject: "Password Reset Successful",  // Email subject
		html: PASSWORD_RESET_SUCCESS_TEMPLATE,  // HTML email body
	  });
  
	  console.log("Password reset success email sent successfully", response);
	} catch (error) {
	  console.error('Error sending password reset success email:', error);
	  throw new Error("Error sending password reset success email");
	}
  };