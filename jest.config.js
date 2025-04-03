export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setup.ts"],
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { jsx: "react-jsx", useESM: true }],
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
};

// /** @type {import('ts-jest').JestConfigWithTsJest} */
// export default {
//     preset: "ts-jest",
//     testEnvironment: "jsdom",
//     setupFilesAfterEnv: ["<rootDir>/src/setup.ts"],
//     moduleNameMapper: {
//       "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
//       "^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
//       "^.+\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
//     },
//     transform: {
//       "^.+\\.(ts|tsx)$": [
//         "ts-jest",
//         {
//           tsconfig: "tsconfig.json",
//           jsx: "react-jsx", // This enables the new transform
//           useESM: true, // Add this for ESM support
//         },
//       ],
//       "^.+\\.(js|jsx)$": [
//         "babel-jest",
//         {
//           presets: [["@babel/preset-react", { runtime: "automatic" }]],
//         },
//       ],
//     },
//     testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
//     extensionsToTreatAsEsm: [".ts", ".tsx"], // Add this line
//   };
