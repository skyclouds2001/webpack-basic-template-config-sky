module.exports = {
  '*.{js,jsx,ts,tsx,vue}': ['npx eslint --fix'],
  '*.{js,jsx,ts,tsx,vue,md,html,css,sass,scss,less,styl,stylus}': ['npx prettier --write'],
  '*.{css,sass,scss,less,styl,stylus,vue}': ['stylelint'],
}
