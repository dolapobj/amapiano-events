/** @type {import('next').NextConfig} */
// next.config.mjs
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/events',
          permanent: true, // Set to true for a permanent redirect
        },
      ];
    },
    async rewrites() {
      return [
        {
          source: '/events',
          destination: '/app/events/page', // Make sure this matches your intended file structure
        },
      ];
    },
  };
  
  export default nextConfig;
  