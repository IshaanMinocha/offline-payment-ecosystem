// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add .bin to asset extensions
config.resolver.assetExts.push('bin');

module.exports = config;
