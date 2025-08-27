import type { UserConfig } from '@commitlint/types';

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Type enum
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation changes
        'style', // Code style changes (formatting, etc)
        'refactor', // Code refactoring
        'perf', // Performance improvements
        'test', // Test changes
        'build', // Build system changes
        'ci', // CI/CD changes
        'chore', // Other changes
        'revert', // Revert commits
      ],
    ],
    // Subject and body rules
    'subject-case': [2, 'never', ['pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-max-length': [2, 'always', 72],
    'body-leading-blank': [2, 'always'],
    'body-max-line-length': [2, 'always', 100],
    // Header rules
    'header-max-length': [2, 'always', 100],
    'type-empty': [2, 'never'],
    'type-case': [2, 'always', 'lower-case'],
  },
};

export default config;
