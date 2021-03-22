// This file isn't transpiles, so you must use CommonJS and ES5

// Register babel to transpile before our tests run.
require("@babel/register")();

// Disable webpack features that Mocha won't understand
require.extensions[".css"] = function () {};
