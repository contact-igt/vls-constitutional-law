const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

export function apiBaseUrl(): string {
  const server = process.env.NEXT_PUBLIC_API_SERVER;
  const url =
    server === "production"
      ? process.env.NEXT_PUBLIC_PRODUCTION_API_URL
      : server === "stage"
        ? process.env.NEXT_PUBLIC_STAGE_API_URL
        : process.env.NEXT_PUBLIC_LOCALHOST_API_URL;

  return url?.trim() ? trimTrailingSlash(url.trim()) : "";
}

export function constitutionalRegistrationUrl(): string {
  const baseUrl = apiBaseUrl();
  return baseUrl ? `${baseUrl}/vls-constitutional-bootcamp/register` : "";
}
