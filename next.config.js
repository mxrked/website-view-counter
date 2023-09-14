const isProd = process.env.NODE_ENV === "production";
const fs = require("fs-extra");

module.exports = {
  reactStrictMode: true,
  webpack5: true,

  // Fixes fs issue
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },

  //! This added clean urls and eliminates the .html extension aswell as linking
  //! CSS and JS with the trailingSlash
  assetPrefix: isProd ? "https://melodious-bunny-897f80.netlify.app/" : "",
  // assetPrefix: () => {
  //   if (isProd) {
  //     if (process.env.DOMAIN === "codingthefront.com") {
  //       return "https://codingthefront.com/";
  //     } else {
  //       return "https://glittering-cupcake-b97603.netlify.app/";
  //     }
  //   } else {
  //     return "";
  //   }
  // },

  trailingSlash: true,

  async afterBuild({ utils }) {
    await fs.copy("_headers", ".next/_headers");
  },
};
