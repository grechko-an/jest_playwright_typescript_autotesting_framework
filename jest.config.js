module.exports = {
    verbose: true,
    preset: 'jest-playwright-preset',
    testMatch: ['**/tests/**/*.spec.ts'],
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    setupFilesAfterEnv: ["expect-playwright"]
  }