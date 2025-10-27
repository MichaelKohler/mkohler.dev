module.exports = {
  apps: [{
    name: "api",
    script: "./index.js",
    env: {
      NODE_ENV: "production",
    },
    watch: ["lib", "index.js"],
    ignore_watch: ["node_modules"],
  }],
};
