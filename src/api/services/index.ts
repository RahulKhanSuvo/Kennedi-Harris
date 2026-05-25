// Export client setup & variables
export { api, API_BASE_URL, AUTH_TOKEN_KEY } from "@/api/api-client";

// Export type interfaces
export * from "@/api/types";

// Export individual unified service domains
export { authService } from "@/api/services/auth.service";
export { homeService } from "@/api/services/home.service";
export { highlightsService } from "@/api/services/highlights.service";
