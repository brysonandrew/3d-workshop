// @nrwl/react + SVG
const webpackConfig = require("@nrwl/react/plugins/webpack");

module.exports = (config) => {
  config.module.rules.push(
    {
      test: /\.svg$/,
      use: ["@svgr/webpack", "url-loader"],
    },
    {
      test: /\.mp4$/,
      use: "file-loader?name=videos/[name].[ext]",
    },
    {
      test: /\.glsl$/,
      use: 'webpack-glsl-loader'
    }
  );
  return webpackConfig(config);
};
