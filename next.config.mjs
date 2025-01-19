import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig = {
  /* config options here */
  experimental: {
    reactCompiler: false
  }
};

export default withPayload(nextConfig) 
