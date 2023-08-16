export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "^.+\\.svg$": "jest-svg-transformer",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/mocks/fileMock.ts",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@images/(.*)$': '<rootDir>/src/assets/images/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@state/(.*)$': '<rootDir>/src/state/$1',
    '^@typess/(.*)$': '<rootDir>/src/types/$1'
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};