module.exports = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-prettier',
  ],
  plugins: [
    'stylelint-prettier',
  ],
  rules: {},
  overrides: [
    {
      files: ['*.sass', '**/*.sass'],
      customSyntax: 'postcss-sass',
    },
    {
      files: ['*.scss', '**/*.scss'],
      customSyntax: 'postcss-scss',
    },
    {
      files: ['*.less', '**/*.less'],
      customSyntax: 'postcss-less',
    },
    {
      files: ['*.html', '**/*.html'],
      customSyntax: 'postcss-html',
    },
    {
      files: ['*.styl', '**/*.styl', '*.stylus', '**/*.stylus'],
      customSyntax: 'postcss-styl',
    },
  ],
}
