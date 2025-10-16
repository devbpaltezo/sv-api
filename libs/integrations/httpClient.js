import fetch from "node-fetch";

/**
 * Common fetch wrapper with logging, retries, and error handling.
 * 
 * Generic HTTP client wrapper for API integrations
 */
export async function httpRequest(url, options = {}, retries = 2) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errText}`);
    }
    return await res.json();
  } catch (err) {
    console.error(`[httpRequest] Error: ${err.message}`);
    if (retries > 0) {
      console.log(`[httpRequest] Retrying... (${retries})`);
      await new Promise((r) => setTimeout(r, 1000));
      return httpRequest(url, options, retries - 1);
    }
    throw err;
  }
}
