module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
