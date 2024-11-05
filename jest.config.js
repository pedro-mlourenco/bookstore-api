module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    // If you're using ES modules, you might need to specify this:
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  };
  