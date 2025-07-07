require("regenerator-runtime/runtime");

const buildFunctions = require("./build");

Object.keys(buildFunctions).forEach((functionName) => {
  exports[functionName] = buildFunctions[functionName];
});
