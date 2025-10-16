import { httpRequest } from "./httpClient.js";

const BASE_URL = "https://rest-api.telesign.com";

/**
 * 
 * Handles SMS sending and phone verification using Telesign API.
 * 
 * Send SMS message using Telesign Messaging API
 */
export async function sendSMS(phoneNumber, message) {
  const url = `${BASE_URL}/v1/messaging`;
  const headers = {
    Authorization:
      "Basic " +
      Buffer.from(
        `${process.env.TELESIGN_CUSTOMER_ID}:${process.env.TELESIGN_API_KEY}`
      ).toString("base64"),
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const body = new URLSearchParams({
    phone_number: phoneNumber,
    message,
    message_type: "OTP",
  });

  return httpRequest(url, { method: "POST", headers, body });
}

/**
 * Start phone verification via Telesign Verify API
 */
export async function startVerification(phoneNumber, verifyCode) {
  const url = `${BASE_URL}/v1/verify/sms`;
  const headers = {
    Authorization:
      "Basic " +
      Buffer.from(
        `${process.env.TELESIGN_CUSTOMER_ID}:${process.env.TELESIGN_API_KEY}`
      ).toString("base64"),
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const body = new URLSearchParams({
    phone_number: phoneNumber,
    verify_code: verifyCode,
  });

  return httpRequest(url, { method: "POST", headers, body });
}

/**
 * Check verification code
 */
export async function checkVerification(verifyId, code) {
  const url = `${BASE_URL}/v1/verify/${verifyId}?verify_code=${code}`;
  const headers = {
    Authorization:
      "Basic " +
      Buffer.from(
        `${process.env.TELESIGN_CUSTOMER_ID}:${process.env.TELESIGN_API_KEY}`
      ).toString("base64"),
  };

  return httpRequest(url, { method: "GET", headers });
}
