const { getDefaultConfig } = require("expo/metro-config");

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  },
  resolver: {
    assetExts: [
      "bin",
      "txt",
      "jpg",
      "png",
      "ttf",
      "gif",
      "otf",
      "mp4",
      "webm",
      "wav",
      "mp3",
      "m4a",
      "aac",
      "oga",
      "xml",
    ],
    sourceExts: ["js", "json", "ts", "tsx", "jsx", "svg"],
  },
  ...getDefaultConfig(__dirname, {
    isCSSEnabled: true,
  }),
};
