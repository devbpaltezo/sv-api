import { httpRequest } from "./httpClient.js";

const BASE_URL = "https://api.buildium.com/v1";

/**
 * 
 * Communicates with Buildium API for property, tenant, and payment operations.
 * 
 * Example: fetch tenants from Buildium
 */
export async function getTenants() {
  const url = `${BASE_URL}/tenants`;
  const headers = {
    Authorization: `Bearer ${process.env.BUILDIUM_API_KEY}`,
    Accept: "application/json",
  };

  return httpRequest(url, { method: "GET", headers });
}

/**
 * Example: create tenant in Buildium
 */
export async function createTenant(data) {
  const url = `${BASE_URL}/tenants`;
  const headers = {
    Authorization: `Bearer ${process.env.BUILDIUM_API_KEY}`,
    "Content-Type": "application/json",
  };

  return httpRequest(url, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
}

/**
 * Example: post payment for tenant
 */
export async function createPayment(tenantId, paymentData) {
  const url = `${BASE_URL}/tenants/${tenantId}/payments`;
  const headers = {
    Authorization: `Bearer ${process.env.BUILDIUM_API_KEY}`,
    "Content-Type": "application/json",
  };

  return httpRequest(url, {
    method: "POST",
    headers,
    body: JSON.stringify(paymentData),
  });
}
