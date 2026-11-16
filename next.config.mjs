/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // v3: a página inicial é o site estático em public/index.html
  // (leão de código + motor de rolagem). "beforeFiles" faz a rota "/"
  // servir esse arquivo antes da página do app/.
  async rewrites() {
    return {
      beforeFiles: [{ source: "/", destination: "/index.html" }],
    }
  },
}

export default nextConfig
