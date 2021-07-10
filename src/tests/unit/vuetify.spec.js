import vuetify from "../../plugins/vuetify.js";

let themeVuetify = vuetify;

const dark = {
  primary: "#0b132b",
  secondary: "#1c2541",
  accent: "#82B1FF",
  error: "#FF5252",
  info: "#2196F3",
  success: "#4CAF50",
  warning: "#FFC107",
  background: "#0b132b",
};
const light = {
  primary: '#ffffff',
  secondary: '#ffffff',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107',
  background: '#536162'
};

describe("/plugins/vuetify.js", () => {
  
  it("1. initialisation theme dark", () => {
    expect(themeVuetify.framework.theme.themes.dark).toStrictEqual(dark);
  });
  it("2. initialisation theme light", () => {
    expect(themeVuetify.framework.theme.themes.light).toStrictEqual(light);
  });
  it("3. first connect theme is light", () => {
    expect(themeVuetify.framework.theme.isDark).toBe(false);
  });
  it("4. icons are 'mdi'", () => {
    expect(themeVuetify.preset.icons.iconfont).toStrictEqual('mdi');
  });
});
