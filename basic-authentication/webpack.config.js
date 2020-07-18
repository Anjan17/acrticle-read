const path = require("path");

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules.push(
    {
      test: /\.less$/,
      loaders: "less-loader",
      include: path.resolve(__dirname, "node_modules"),
    },
    {
      test: /\.less$/,
      loaders: "less-loader",
      include: path.resolve(__dirname, "src"),
    }
  );
  defaultConfig.resolve.extensions.push(".less");

  return defaultConfig;
};
