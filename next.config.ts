/** @type {import('next').NextConfig} */

const allowedDomains = [
  "encrypted-tbn0.gstatic.com", // 🔥 Добавили кэш картинок Google
  "sonxeber.az",
  "apa.az",
  "report.az",
  "oxu.az",
  "trend.az",
  "azvision.az",
  "aznews.az",
  "azxeber.com",
  "i0.wp.com",
  "aznews24.az",
  "qafqazinfo.az",
  "images.oxu.az",
  "via.placeholder.com",
  "images.unsplash.com"
];

const nextConfig = {
  images: {
    remotePatterns: allowedDomains.map((domain) => ({
      protocol: 'https',
      hostname: domain,
      pathname: '/**',
    })),
  },
};

module.exports = nextConfig;