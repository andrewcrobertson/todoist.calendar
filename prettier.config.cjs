module.exports = {
  plugins: [
    require.resolve('@trivago/prettier-plugin-sort-imports'),
    require.resolve('prettier-plugin-tailwindcss'),
    require.resolve('prettier-plugin-svelte'),
    require.resolve('prettier-plugin-packagejson'),
  ],
  printWidth: 160,
  singleQuote: true,
  trailingComma: 'all',
  svelteSortOrder: "options-scripts-styles-markup",
};
