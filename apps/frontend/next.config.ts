/** Next.js configuration; strict mode surfaces unsafe component patterns early. */
import type { NextConfig } from 'next';
const nextConfig: NextConfig = { reactStrictMode: true, output: 'standalone' };
export default nextConfig;
