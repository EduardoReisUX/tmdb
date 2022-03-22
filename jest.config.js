module.exports = {
  testPathIgnorePatterns: ["/node_modules/", "/.next"],
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$": `<rootDir>/__mocks__/fileMock.js`,
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.tsx",
    "!src/**/*.spec.tsx",
    "!src/**/*_app.tsx",
    "!src/**/*_document.tsx",
    "!src/pages/api",
  ],
};
