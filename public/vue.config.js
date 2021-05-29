module.exports = {
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== "production",
  },
  rules: [
    // Recommend config, transformAssetUrls
    {
      test: /\.vue$/,
      use: [
        {
          loader: "vue-loader",
          options: {
            transformAssetUrls: {
              icon: "data",
            },
          },
        },
      ],
    },
  ],
};
