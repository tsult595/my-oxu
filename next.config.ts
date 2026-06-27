import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const allowedDomains = [
  "encrypted-tbn0.gstatic.com", "sonxeber.az", "apa.az", "report.az",
  "oxu.az", "trend.az", "azvision.az", "aznews.az", "azxeber.com",
  "i0.wp.com", "aznews24.az", "qafqazinfo.az", "images.oxu.az",
  "via.placeholder.com", "images.unsplash.com"
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: allowedDomains.map((domain) => ({
      protocol: 'https',
      hostname: domain,
      pathname: '/**',
    })),
  },
};

export default withNextIntl(nextConfig);