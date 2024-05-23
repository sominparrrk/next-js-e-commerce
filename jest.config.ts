import nextJest from 'next/jest.js';
import { compilerOptions } from './tsconfig.json';
import { pathsToModuleNameMapper } from 'ts-jest';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

const customJestConfig = {
  rootDir: '.',
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/*.steps.ts',
    '**/*.steps.tsx',
    '**/*.tests.ts',
    '**/*.tests.tsx',
    '**/*.test.ts',
    '**/*.test.tsx',
  ],
  modulePaths: ['<rootDir>'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  modulePathIgnorePatterns: ['dist', './build', '.next'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testPathIgnorePatterns: ['./.next/', './node_modules/'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig);
