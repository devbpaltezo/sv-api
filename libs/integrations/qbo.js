import { httpRequest } from "./httpClient.js";

const QBO_BASE = "https://sandbox-quickbooks.api.intuit.com/v3/company";
const QBO_TOKEN_URL =
  "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer";

/**
 * 
 * Manages QuickBooks Online OAuth2 and accounting operations (Invoices, Payments).
 * 
 * Refresh QBO access token
 */
export async function refreshAccessToken(refreshToken) {
  const headers = {
    Authorization:
      "Basic " +
      Buffer.from(
        `${process.env.QBO_CLIENT_ID}:${process.env.QBO_CLIENT_SECRET}`
      ).toString("base64"),
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  return httpRequest(QBO_TOKEN_URL, { method: "POST", headers, body });
}

/**
 * Create an invoice in QuickBooks
 */
export async function createInvoice(realmId, accessToken, invoiceData) {
  const url = `${QBO_BASE}/${realmId}/invoice?minorversion=65`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  return httpRequest(url, {
    method: "POST",
    headers,
    body: JSON.stringify(invoiceData),
  });
}

/**
 * Record a payment
 */
export async function recordPayment(realmId, accessToken, paymentData) {
  const url = `${QBO_BASE}/${realmId}/payment?minorversion=65`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  return httpRequest(url, {
    method: "POST",
    headers,
    body: JSON.stringify(paymentData),
  });
}
