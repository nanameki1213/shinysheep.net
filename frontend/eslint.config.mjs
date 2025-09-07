import tseslint from '@typescript-eslint/eslint-plugin';
import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import tsParser from '@typescript-eslint/parser';

export default  [
  {
    files: ['**/*.ts', '**/*.tsx'], // 読み込むファイル
  },
  {
    ignores: ['**/.next/**/*'], // 無視するファイル
  },
  eslint.configs.recommended,
  pluginReactConfig,
  {
    "settings": {
      "react": {
        "createClass": "createReactClass", // Regex for Component Factory to use,
                                           // default to "createReactClass"
        "pragma": "React",  // Pragma to use, default to "React"
        "fragment": "Fragment",  // Fragment to use (may be a property of <pragma>), default to "Fragment"
        "version": "detect", // React version. "detect" automatically picks the version you have installed.
                             // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
                             // Defaults to the "defaultVersion" setting and warns if missing, and to "detect" in the future
        "defaultVersion": "", // Default React version to use when the version you have installed cannot be detected.
                              // If not provided, defaults to the latest React version.
        "flowVersion": "0.53" // Flow version
      },
    },
  },
  {
    languageOptions: {
      parser: tsParser,
      globals: {
        React: "readonly",
      },
    },
  },
  {
    // eslint-plugin-importに関する設定
    plugins: {
      import: importPlugin,
      '@typescript-eslint': tseslint,
    },
    rules: {
      'import/order': [
        'error',
        {
          alphabetize: { order: 'asc'},
        },
      ],
    },
  },
  {
    // eslint-plugin-unused-importsに関する設定
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      'unused-imports/no-unused-imports': 'error',
    },
  },
  {
    // その他設定
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
    rules: {
      "react/jsx-boolean-value": "error", // JSXの中でのbooleanの使用
      "react/jsx-curly-brace-presence": "error", // JSXの中での余分な{}の使用
    },
  },
  eslintConfigPrettier, // Prettierとの競合防止
];
