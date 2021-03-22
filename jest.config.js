module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  transform: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
  },
  moduleNameMapper: {
    "^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,vue}', '!src/main.js']
};
