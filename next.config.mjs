/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { remotePatterns: [{ protocol: "https", hostname: "avatars.githubusercontent.com" }] },
  // Permite abrir o `npm run dev` pelo celular na mesma rede (IPs locais)
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.16.*.*"],
};
export default nextConfig;
