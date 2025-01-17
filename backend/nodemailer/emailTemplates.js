export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #007BFF, #0056b3); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for signing up for AuthApp! To complete your registration and start using our platform, please verify your email.</p>
    <p>Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #007BFF;">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to confirm your email and gain access to all the features AuthApp has to offer.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't sign up for AuthApp, please disregard this email.</p>
    <p>Best regards,<br>The AuthApp Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to AuthApp</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #007BFF, #0056b3); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Welcome to AuthApp!</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
    <p>Hello {name},</p>
    <p>Welcome to AuthApp! We’re excited to have you on board.</p>
    <p>AuthApp is your go-to platform for secure and seamless authentication. Whether you're signing in, resetting your password, or managing your profile, we've got you covered.</p>
    <p>Here's what you can do next:</p>
    <ul>
      <li>Explore your profile and update your information.</li>
      <li>Enable two-factor authentication for added security.</li>
      <li>Stay updated with the latest features and updates.</li>
    </ul>
    <p>To get started, log in and explore our platform:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{loginURL}" style="background-color: #007BFF; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
        Get Started
      </a>
    </div>
    <p>If you have any questions, feel free to contact our support team at any time. We're here to help you!</p>
    <p>Best regards,<br>The AuthApp Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #007BFF, #0056b3); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password for your AuthApp account. If you didn’t request a password reset, please disregard this email and your account will remain secure.</p>
    <p>If you do need to reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #007BFF; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>For security reasons, this link will expire in 1 hour.</p>
    <p>Best regards,<br>The AuthApp Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message. Please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #007BFF, #0056b3); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset for your AuthApp account.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #007BFF; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact AuthApp’s support team immediately.</p>
    <p>For your security, we recommend the following:</p>
    <ul>
      <li>Choose a strong, unique password that you haven't used before</li>
      <li>Consider enabling two-factor authentication on your account</li>
      <li>Avoid using the same password across multiple websites</li>
    </ul>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{loginURL}" style="background-color: #007BFF; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
        Log In
      </a>
    </div>
    <p>Thank you for being a part of the AuthApp community!</p>
    <p>Best regards,<br>The AuthApp Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message. Please do not reply to this email.</p>
  </div>
</body>
</html>
`;