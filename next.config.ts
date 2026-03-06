// it is for browser

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;




// it for git hub pages 

const repo = "todo-manager"

const nextConfig = {
  output: "export",
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
  images: {
    unoptimized: true
  }
}

export default nextConfig