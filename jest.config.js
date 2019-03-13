module.exports = {
  preset: "ts-jest",
  testEnvironment: 'node',
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**"
  ]
};
