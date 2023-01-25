module.exports = {
  coveragePathIgnorePatterns: [
    '<rootDir>.*/src/app/assets/*',
    '<rootDir>.*src/app/services/api_services/*',
  ],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
    '^.+\\.svg$': '<rootDir>/jest/svgTransformer.js',
    '.+\\.(png|jpg|gif|ttf|woff|woff2|mp4|otf)$': '<rootDir>/jest/stub.js',
    '^.+\\.(css|less|scss|sass)$': '<rootDir>/jest/stub.js',
  },
  testPathIgnorePatterns: [
    'node_modules',
    '\\.cache',
    '<rootDir>.*/public',
    'cypress',
  ],
}
