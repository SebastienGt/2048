module.exports = {
    preset: 'react-native',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    testMatch: ['**/__tests__/**/*.(ts|tsx|js)', '**/*.(test|spec).(ts|tsx|js)'],
    collectCoverageFrom: [
        'app/**/*.{ts,tsx}',
        '!app/**/*.d.ts',
    ],
}; 