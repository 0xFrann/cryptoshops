module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  publicRuntimeConfig: {
    SUPPORT_MAIL: process.env.SUPPORT_MAIL,
    MAPBOX_GL_TOKEN: process.env.MAPBOX_GL_TOKEN,
  }
};