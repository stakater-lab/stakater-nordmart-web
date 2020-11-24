module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"],
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(.\\.spec).(ts|tsx)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
  },
  globals: {
    PRODUCTION: false,
    "ts-jest": {
      isolatedModules: true,
      tsConfig: "tsconfig.spec.json",
    },
  },
  coverageReporters: ["text", "cobertura"],
  setupFilesAfterEnv: ["./jest.setupTest.ts"],
};
