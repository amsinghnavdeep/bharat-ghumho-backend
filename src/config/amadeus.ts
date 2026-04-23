import Amadeus from "amadeus";

/**
 * Amadeus SDK client for flights and hotels APIs.
 */
export const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID ?? "",
  clientSecret: process.env.AMADEUS_CLIENT_SECRET ?? "",
  hostname: (process.env.AMADEUS_HOSTNAME as "test" | "production") ?? "test"
});
