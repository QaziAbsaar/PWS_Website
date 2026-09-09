import type { NextConfig } from "next";

const securityHeaders = [
  // Don't advertise the framework.
  { key: "X-Powered-By", value: "" },
  // Clickjacking: refuse to be framed.
  { key: "X-Frame-Options", value: "DENY" },
  // MIME sniffing: browsers must respect declared content types.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Only send origin to same-site + Supabase.
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Deny browser features the site never uses.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  // Force HTTPS for two years on all subdomains.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
];

const nextConfig: NextConfig = {
  // No framework fingerprint, no browser source maps in production.
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
